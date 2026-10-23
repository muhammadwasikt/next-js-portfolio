# Admin CMS

The admin area uses Supabase Auth through server-side route handlers. Access and refresh tokens are stored in HttpOnly cookies; Row Level Security is the final enforcement layer for data reads and writes.

Routes:
- /admin/login — admin sign in
- /admin — content dashboard
- /admin/projects, /admin/case-studies, /admin/skills, /admin/experience, /admin/testimonials, /admin/media, /admin/site-content — CRUD modules

Before use, apply the SQL migration in supabase/migrations, create the intended Supabase Auth user, and insert its UUID into public.admin_users. Set the environment variables documented in .env.example.

The site-content module stores flexible JSON values by key. No demo content is inserted into the database.
