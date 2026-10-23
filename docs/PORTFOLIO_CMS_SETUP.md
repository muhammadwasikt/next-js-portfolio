# Portfolio CMS setup (initial foundation)

## Architecture
The CMS uses Supabase Postgres, Supabase Auth and Supabase Storage. Content tables are designed for projects, case studies, skills, experiences, testimonials, media assets and editable site content. Published records are public-read; draft records are not public-readable. Admin writes are guarded by the admin_users allow-list and RLS.

## Apply the schema and existing-content import
1. Create/open the Supabase project.
2. Open SQL Editor.
3. Run `supabase/migrations/202610230001_portfolio_cms.sql`.
4. Then run `supabase/migrations/202610230002_import_existing_portfolio_content.sql`.
5. In Supabase Authentication, create the admin user using an email you control.
6. Copy that user's UUID from Authentication > Users.
7. Run the following SQL with your real UUID:

```sql
insert into public.admin_users (user_id)
values ('YOUR_AUTH_USER_UUID')
on conflict (user_id) do nothing;
```

The second migration imports the repository's existing project, skill, service and site copy into database records. It does not invent case studies, employment history or testimonials. Its inserts use ON CONFLICT DO NOTHING so rerunning it will not overwrite later admin edits.

## Environment variables
Copy `.env.example` to `.env.local` for local development and enter the project URL and anon/publishable key. Set the same variables in the deployment provider. The contact form additionally needs EMAIL_USER, EMAIL_PASS and CONTACT_EMAIL if email delivery is required.

Do not add an unauthenticated public sign-up route to the portfolio admin. The Supabase service-role key is not needed by the CMS code and must never be exposed to the browser.
