# Portfolio content model

All values below are examples of the shape to enter through Admin → Site Content. They are documentation only; no demo content is inserted into the database.

Recommended keys:
- hero: headline, intro, eyebrow, primary_label, primary_url, secondary_label, secondary_url, image_url, art_alt, art_label, art_caption
- profile: headline, bio, secondary_bio, image_url, image_alt, image_caption, stats (array), cta_label, cta_url, seo_title
- site_settings: brand_name, location, availability, seo_title, seo_description, og_image
- navigation: items (array of objects with label and href)
- footer: eyebrow, headline, description, social_links (array of label/url objects), copyright
- section_copy: projects_eyebrow, projects_title, projects_description, all_projects_label, case_studies_eyebrow, case_studies_title, case_studies_description, skills_eyebrow, skills_title, experience_eyebrow, experience_title, testimonials_eyebrow, testimonials_title
- contact: eyebrow, headline, description, email, phone, location, map_url, cta_label, social_url, social_label, seo_title
- projects_page: eyebrow, title, description, seo_title
- services_page: eyebrow, title, description, seo_title
- services: array of title/description objects
- empty_state: optional user-authored messages for empty public sections

For every row in site_content, set content_key to the key above and value to a valid JSON object/array. Edit the row later to change the website content without a code change.

Projects, case studies, skills, experience and testimonials should be managed in their dedicated CMS modules, not copied into site_content. Media uploads create records in media_assets; copy the media UUID into a project/case-study cover field to associate it.
