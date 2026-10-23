"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, FileImage, LoaderCircle, Pencil, Plus, RefreshCw, Search, Trash2, X } from "lucide-react";

const emptyFor = field => field.type === "boolean" ? false : field.type === "json" ? (field.name === "value" ? "{}" : "[]") : field.type === "number" ? (field.name === "sort_order" ? "0" : "") : "";
function valueForForm(record, field) {
  const value = record?.[field.name];
  if (field.type === "boolean") return Boolean(value);
  if (field.type === "tags") return Array.isArray(value) ? value.join(", ") : "";
  if (field.type === "json") return JSON.stringify(value ?? (field.name === "value" ? {} : []), null, 2);
  return value === null || value === undefined ? "" : String(value);
}

export default function AdminResourceClient({ resource, config }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [values, setValues] = useState({});
  const [uploadFile, setUploadFile] = useState(null);

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/admin/" + resource, { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not load content.");
      setRecords(result.data || []);
    } catch (err) { setError(err.message || "Could not load content."); }
    finally { setLoading(false); }
  }, [resource]);
  useEffect(() => { load(); }, [load]);

  function openEditor(record = null) {
    setEditing(record || {});
    setValues(Object.fromEntries(config.fields.map(field => [field.name, valueForForm(record, field) || emptyFor(field)])));
    setUploadFile(null); setNotice(""); setError("");
  }
  function closeEditor() { setEditing(null); setUploadFile(null); }

  async function save(event) {
    event.preventDefault(); setSaving(true); setNotice(""); setError("");
    try {
      if (resource === "media" && !editing.id) {
        if (!uploadFile) throw new Error("Choose an image file first.");
        const form = new FormData(); form.append("file", uploadFile);
        Object.entries(values).forEach(([key, value]) => form.append(key, String(value ?? "")));
        const response = await fetch("/api/admin/media", { method: "POST", body: form });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Upload failed.");
      } else {
        const payload = { ...values };
        for (const field of config.fields) {
          if (field.type === "boolean") payload[field.name] = Boolean(values[field.name]);
          if (field.type === "number") payload[field.name] = values[field.name] === "" ? null : Number(values[field.name]);
          if (field.type === "tags") payload[field.name] = String(values[field.name] || "").split(",").map(item => item.trim()).filter(Boolean);
          if (field.type === "json") {
            try { payload[field.name] = JSON.parse(values[field.name] || (field.name === "value" ? "{}" : "[]")); }
            catch { throw new Error("The " + field.label + " field must contain valid JSON."); }
          }
        }
        const url = editing.id ? "/api/admin/" + resource + "/" + editing.id : "/api/admin/" + resource;
        const response = await fetch(url, { method: editing.id ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Could not save record.");
      }
      const wasEditing = Boolean(editing.id); closeEditor();
      setNotice(wasEditing ? "Changes saved to the database." : "New record saved to the database.");
      await load();
    } catch (err) { setError(err.message || "Save failed."); }
    finally { setSaving(false); }
  }

  async function remove(record) {
    const label = record.title || record.name || record.person_name || record.company || record.content_key || record.id;
    if (!window.confirm("Delete “" + label + "”? This action cannot be undone.")) return;
    setError(""); setNotice("");
    try {
      const response = await fetch("/api/admin/" + resource + "/" + record.id, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Delete failed.");
      setNotice("Record deleted."); await load();
    } catch (err) { setError(err.message || "Delete failed."); }
  }

  const filtered = records.filter(record => [record.title, record.name, record.person_name, record.company, record.role, record.content_key, record.slug, record.category, record.quote].filter(Boolean).join(" ").toLowerCase().includes(query.toLowerCase()));

  return <section className="cms-manager">
    <div className="cms-manager-toolbar">
      <label className="cms-search"><Search size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder={"Search " + config.label.toLowerCase() + "…"} /></label>
      <button className="cms-quiet-button" onClick={load} type="button" aria-label="Refresh records"><RefreshCw size={15} /> Refresh</button>
      <button className="cms-primary-button cms-add-button" onClick={() => openEditor()} type="button"><Plus size={17} /> Add new</button>
    </div>
    {notice && <div className="cms-success" role="status"><Check size={16} /> {notice}</div>}
    {error && <div className="cms-error cms-alert" role="alert">{error}</div>}
    {loading ? <div className="cms-loading"><LoaderCircle className="cms-spin" size={23} /> Loading saved content…</div> :
      filtered.length === 0 ? <div className="cms-empty"><div className="cms-empty-icon"><FileImage size={25} /></div><h3>{query ? "No matching records" : "A blank canvas."}</h3><p>{query ? "Try a different search." : "Add your first record. It will be saved to your connected database."}</p>{!query && <button className="cms-primary-button" onClick={() => openEditor()}><Plus size={16} /> Create first record</button>}</div> :
      <div className="cms-record-list">{filtered.map(record => {
        const title = record.title || record.name || record.person_name || record.company || record.content_key || record.id;
        const subtitle = record.summary || record.excerpt || record.role || record.category || record.alt_text || record.slug || record.storage_path || "";
        return <article key={record.id || record.content_key} className="cms-record">
          <div className="cms-record-main">
            {resource === "media" && record.public_url && <img className="cms-record-thumb" src={record.public_url} alt={record.alt_text || ""} />}
            <div><h3>{title}</h3><p>{subtitle}</p><div className="cms-record-meta">{record.status && <span className={record.status === "published" ? "cms-status cms-status-published" : "cms-status"}>{record.status}</span>}{record.featured && <span className="cms-featured-tag">Featured</span>}{resource === "testimonials" && record.approved === false && <span className="cms-status">Awaiting approval</span>}</div></div>
          </div>
          <div className="cms-record-actions"><button type="button" onClick={() => openEditor(record)} className="cms-icon-button" aria-label={"Edit " + title}><Pencil size={16} /></button>{record.id && <button type="button" onClick={() => remove(record)} className="cms-icon-button cms-delete-button" aria-label={"Delete " + title}><Trash2 size={16} /></button>}</div>
        </article>;
      })}</div>
    }
    {editing !== null && <div className="cms-modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget && !saving) closeEditor(); }}>
      <section className="cms-editor-modal" role="dialog" aria-modal="true" aria-labelledby="cms-editor-title">
        <header className="cms-editor-header"><div><p className="cms-eyebrow">{editing.id ? "EDIT RECORD" : "NEW RECORD"}</p><h2 id="cms-editor-title">{editing.id ? "Make it better." : "Create something."}</h2></div><button className="cms-icon-button" type="button" onClick={closeEditor} disabled={saving} aria-label="Close editor"><X size={19} /></button></header>
        <form className="cms-form cms-editor-form" onSubmit={save}>
          {resource === "media" && !editing.id && <label className="cms-field-wide">Image file<input type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" onChange={event => setUploadFile(event.target.files?.[0] || null)} required /></label>}
          {config.fields.map(field => <label key={field.name} className={field.type === "textarea" || field.type === "json" ? "cms-field-wide" : ""}>
            {field.label}{field.type === "boolean" ? <span className="cms-toggle-row"><input type="checkbox" checked={Boolean(values[field.name])} onChange={event => setValues(current => ({ ...current, [field.name]: event.target.checked }))} /> Enabled</span> :
            field.type === "status" ? <select value={values[field.name] || "draft"} onChange={event => setValues(current => ({ ...current, [field.name]: event.target.value }))}><option value="draft">Draft</option><option value="published">Published</option></select> :
            field.type === "textarea" || field.type === "json" ? <textarea rows={field.type === "json" ? 6 : 3} value={values[field.name] ?? ""} required={field.required} spellCheck={field.type !== "json"} onChange={event => setValues(current => ({ ...current, [field.name]: event.target.value }))} placeholder={field.type === "json" ? "Enter valid JSON…" : ""} /> :
            <input type={field.type === "number" ? "number" : field.type === "date" ? "date" : field.type === "url" ? "url" : "text"} value={values[field.name] ?? ""} required={field.required} onChange={event => setValues(current => ({ ...current, [field.name]: event.target.value }))} />}
          </label>)}
          {error && <p className="cms-error cms-field-wide" role="alert">{error}</p>}
          <div className="cms-editor-actions cms-field-wide"><button type="button" className="cms-quiet-button" onClick={closeEditor} disabled={saving}>Cancel</button><button type="submit" className="cms-primary-button" disabled={saving}>{saving ? <><LoaderCircle className="cms-spin" size={16} /> Saving…</> : <><Check size={16} /> {editing.id ? "Save changes" : resource === "media" ? "Upload & save" : "Create record"}</>}</button></div>
        </form>
      </section>
    </div>}
  </section>;
}
