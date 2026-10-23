export const CMS_RESOURCES = {
  projects: { label: "Projects", table: "projects", order: "sort_order.asc", fields: [
    { name: "title", label: "Title", type: "text", required: true }, { name: "slug", label: "URL slug", type: "text", required: true },
    { name: "summary", label: "Short summary", type: "textarea" }, { name: "description", label: "Description", type: "textarea" },
    { name: "category", label: "Category", type: "text" }, { name: "tech_stack", label: "Tech stack (comma separated)", type: "tags" },
    { name: "cover_media_id", label: "Cover media UUID", type: "text" }, { name: "live_url", label: "Live URL", type: "url" },
    { name: "source_url", label: "Source/GitHub URL", type: "url" }, { name: "featured", label: "Featured", type: "boolean" },
    { name: "sort_order", label: "Display order", type: "number" }, { name: "status", label: "Status", type: "status" },
    { name: "seo_title", label: "SEO title", type: "text" }, { name: "seo_description", label: "SEO description", type: "textarea" }
  ]},
  "case-studies": { label: "Case Studies", table: "case_studies", order: "sort_order.asc", fields: [
    { name: "title", label: "Title", type: "text", required: true }, { name: "slug", label: "URL slug", type: "text", required: true },
    { name: "project_id", label: "Linked project UUID", type: "text" }, { name: "excerpt", label: "Excerpt", type: "textarea" },
    { name: "problem", label: "Problem", type: "textarea" }, { name: "goals", label: "Goals (comma separated)", type: "tags" },
    { name: "approach", label: "Approach", type: "textarea" }, { name: "solution", label: "Solution", type: "textarea" },
    { name: "content", label: "Content blocks (JSON)", type: "json" }, { name: "outcomes", label: "Outcomes (JSON)", type: "json" },
    { name: "cover_media_id", label: "Cover media UUID", type: "text" }, { name: "featured", label: "Featured", type: "boolean" },
    { name: "sort_order", label: "Display order", type: "number" }, { name: "status", label: "Status", type: "status" },
    { name: "seo_title", label: "SEO title", type: "text" }, { name: "seo_description", label: "SEO description", type: "textarea" }
  ]},
  skills: { label: "Skills", table: "skills", order: "sort_order.asc", fields: [
    { name: "name", label: "Skill name", type: "text", required: true }, { name: "category", label: "Category", type: "text" },
    { name: "icon", label: "Icon name or URL", type: "text" }, { name: "media_id", label: "Media UUID", type: "text" },
    { name: "level_label", label: "Level label (optional)", type: "text" }, { name: "featured", label: "Featured", type: "boolean" },
    { name: "sort_order", label: "Display order", type: "number" }, { name: "status", label: "Status", type: "status" }
  ]},
  experience: { label: "Experience", table: "experiences", order: "sort_order.asc", fields: [
    { name: "company", label: "Company", type: "text", required: true }, { name: "role", label: "Role", type: "text", required: true },
    { name: "employment_type", label: "Employment type", type: "text" }, { name: "location", label: "Location", type: "text" },
    { name: "start_date", label: "Start date", type: "date" }, { name: "end_date", label: "End date", type: "date" },
    { name: "is_current", label: "Current role", type: "boolean" }, { name: "summary", label: "Summary", type: "textarea" },
    { name: "achievements", label: "Achievements (JSON array)", type: "json" }, { name: "logo_media_id", label: "Logo media UUID", type: "text" },
    { name: "sort_order", label: "Display order", type: "number" }, { name: "status", label: "Status", type: "status" }
  ]},
  testimonials: { label: "Testimonials", table: "testimonials", order: "sort_order.asc", fields: [
    { name: "person_name", label: "Person name", type: "text", required: true }, { name: "role", label: "Role", type: "text" },
    { name: "company", label: "Company", type: "text" }, { name: "quote", label: "Testimonial", type: "textarea", required: true },
    { name: "avatar_media_id", label: "Avatar media UUID", type: "text" }, { name: "rating", label: "Rating (1–5)", type: "number" },
    { name: "approved", label: "Approved", type: "boolean" }, { name: "featured", label: "Featured", type: "boolean" },
    { name: "sort_order", label: "Display order", type: "number" }, { name: "status", label: "Status", type: "status" }
  ]},
  media: { label: "Media Library", table: "media_assets", order: "created_at.desc", fields: [
    { name: "title", label: "Title", type: "text", required: true }, { name: "alt_text", label: "Alt text", type: "text" },
    { name: "caption", label: "Caption", type: "textarea" }, { name: "tags", label: "Tags (comma separated)", type: "tags" }
  ]},
  "site-content": { label: "Site Content", table: "site_content", order: "content_key.asc", fields: [
    { name: "content_key", label: "Content key (unique)", type: "text", required: true },
    { name: "value", label: "Value (JSON)", type: "json", required: true }
  ]}
};
export const CMS_NAV = Object.entries(CMS_RESOURCES).map(([key, value]) => ({ key, label: value.label }));
