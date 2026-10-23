"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Contact({ contact = {} }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const handleChange = event => setFormData(current => ({ ...current, [event.target.name]: event.target.value }));
  async function handleSubmit(event) {
    event.preventDefault(); setLoading(true); setSuccess(false); setError("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send message.");
      setSuccess(true); setFormData({ name: "", email: "", message: "" });
    } catch (err) { setError(err.message || "An error occurred. Please try again."); }
    finally { setLoading(false); }
  }
  const details = [
    contact.email ? { label: contact.email, href: "mailto:" + contact.email, Icon: Mail } : null,
    contact.phone ? { label: contact.phone, href: "tel:" + contact.phone.replace(/[^+\d]/g, ""), Icon: Phone } : null,
    contact.location ? { label: contact.location, href: contact.map_url || "", Icon: MapPin } : null
  ].filter(Boolean);
  return <section className="portfolio-contact-page">
    <div className="portfolio-contact-page-heading"><p className="portfolio-eyebrow">{contact.eyebrow || ""}</p><h1>{contact.headline || ""}</h1><p>{contact.description || ""}</p></div>
    <div className="portfolio-contact-details">{details.map(item=><Card key={item.label} className="portfolio-contact-detail-card"><CardContent className="p-5 flex items-center gap-3"><item.Icon className="text-primary" size={21}/>{item.href ? <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{item.label}<ArrowUpRight size={13}/></a> : <span>{item.label}</span>}</CardContent></Card>)}</div>
    <motion.form className="portfolio-contact-form" onSubmit={handleSubmit} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}}>
      <Input name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required/>
      <Input type="email" name="email" placeholder="Your email" value={formData.email} onChange={handleChange} required/>
      <Textarea name="message" placeholder="Tell me a little about what you have in mind…" rows={5} value={formData.message} onChange={handleChange} required/>
      <Button type="submit" disabled={loading}>{loading ? "Sending…" : contact.cta_label || "Send message"}</Button>
      {success ? <p className="cms-success" role="status">Message sent successfully.</p> : null}{error ? <p className="cms-error" role="alert">{error}</p> : null}
    </motion.form>
  </section>;
}
