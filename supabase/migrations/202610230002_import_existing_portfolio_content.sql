-- One-time import of the portfolio's existing, user-authored content into the CMS.
-- These are real existing entries, not demo testimonials, invented experience or fabricated case studies.
-- ON CONFLICT DO NOTHING ensures rerunning this migration never overwrites later admin edits.

insert into public.media_assets (title, storage_path, public_url, alt_text, mime_type, tags)
values
  ('Eduhustle', 'legacy/eduhustle.jpg', '/assets/images/eduhustle.jpg', 'Eduhustle project preview', 'image/jpeg', array['legacy','project']),
  ('Postoria', 'legacy/postoria.jpg', '/assets/images/postoria.jpg', 'Postoria project preview', 'image/jpeg', array['legacy','project']),
  ('BlogBusters', 'legacy/blog-busters.jpg', '/assets/images/blog-busters.jpg', 'BlogBusters project preview', 'image/jpeg', array['legacy','project']),
  ('Shopping Cart', 'legacy/shopping-carts.webp', '/assets/images/shopping-carts.webp', 'Shopping Cart project preview', 'image/webp', array['legacy','project']),
  ('Mock Storage', 'legacy/mock-storage.jpg', '/assets/images/mock-storage.jpg', 'Mock Storage project preview', 'image/jpeg', array['legacy','project']),
  ('Next.js Dashboard', 'legacy/next-dashboard-2.jpg', '/assets/images/next-dashboard-2.jpg', 'Next.js Dashboard project preview', 'image/jpeg', array['legacy','project']),
  ('Morent Rental', 'legacy/morrent-rental.jpg', '/assets/images/morrent-rental.jpg', 'Morent rental project preview', 'image/jpeg', array['legacy','project']),
  ('Hackathon Project', 'legacy/next-dashboard.jpg', '/assets/images/next-dashboard.jpg', 'Hackathon project preview', 'image/jpeg', array['legacy','project']),
  ('Chawk Bazaar', 'legacy/chawk-bazaar.jpg', '/assets/images/chawk-bazaar.jpg', 'Chawk Bazaar project preview', 'image/jpeg', array['legacy','project']),
  ('Profile Image', 'legacy/hero-image.jpg', '/assets/images/hero-image.jpg', 'Portfolio profile image', 'image/jpeg', array['legacy','profile'])
on conflict (storage_path) do nothing;

insert into public.projects
  (title, slug, summary, description, category, tech_stack, cover_media_id, source_url, featured, sort_order, status, published_at)
values
  ('Eduhustle - Blogging Platform', 'eduhustle',
   'A learning and career growth platform that helps users develop digital skills through practical blogs, tutorials, and productivity guides.',
   'A learning and career growth platform that helps users develop digital skills through practical blogs, tutorials, and productivity guides.',
   'Blogging Platform', array[]::text[],
   (select id from public.media_assets where storage_path = 'legacy/eduhustle.jpg'),
   'https://github.com/muhammadwasikt/eduhustle', false, 1, 'published', now()),
  ('Postoria - Guest Posting Platform', 'postoria',
   'A modern guest-posting and blogging platform where users can publish SEO-optimized articles, explore trending topics, and share knowledge with a global audience.',
   'A modern guest-posting and blogging platform where users can publish SEO-optimized articles, explore trending topics, and share knowledge with a global audience.',
   'Guest Posting Platform', array[]::text[],
   (select id from public.media_assets where storage_path = 'legacy/postoria.jpg'),
   'https://github.com/muhammadwasikt/postoria', false, 2, 'published', now()),
  ('BlogBusters - MERN Stack Blog App', 'blog-busters',
   'A full-stack blog application built with the MERN stack, featuring authentication, CRUD operations, and a sleek UI.',
   'A full-stack blog application built with the MERN stack, featuring authentication, CRUD operations, and a sleek UI.',
   'MERN Stack Application', array['MongoDB','Express.js','React','Node.js'],
   (select id from public.media_assets where storage_path = 'legacy/blog-busters.jpg'),
   'https://github.com/muhammadwasikt/mern-stack-blog-app', false, 3, 'published', now()),
  ('Shopping Cart', 'shopping-cart',
   'A simple yet functional shopping cart built with React, providing add-to-cart functionality and real-time updates.',
   'A simple yet functional shopping cart built with React, providing add-to-cart functionality and real-time updates.',
   'E-commerce', array['React'],
   (select id from public.media_assets where storage_path = 'legacy/shopping-carts.webp'),
   'https://github.com/muhammadwasikt/shopping-cart', false, 4, 'published', now()),
  ('Mock Storage', 'mock-storage',
   'A storage management system built with React and Node.js, allowing users to store and manage their files efficiently.',
   'A storage management system built with React and Node.js, allowing users to store and manage their files efficiently.',
   'Storage Management', array['React','Node.js'],
   (select id from public.media_assets where storage_path = 'legacy/mock-storage.jpg'),
   'https://github.com/muhammadwasikt/Mock-storage', false, 5, 'published', now()),
  ('Next.js Dashboard', 'next-dashboard',
   'A modern and responsive admin dashboard built with Next.js, Tailwind CSS, and ShadCN UI.',
   'A modern and responsive admin dashboard built with Next.js, Tailwind CSS, and ShadCN UI.',
   'Admin Dashboard', array['Next.js','Tailwind CSS','Shadcn UI'],
   (select id from public.media_assets where storage_path = 'legacy/next-dashboard-2.jpg'),
   'https://github.com/muhammadwasikt/dashboard-next.js', false, 6, 'published', now()),
  ('Morent - Car Rental Service', 'morent-rental',
   'A car rental website featuring booking functionalities and a sleek user interface, built with HTML 5, CSS 3 and JavaScript.',
   'A car rental website featuring booking functionalities and a sleek user interface, built with HTML 5, CSS 3 and JavaScript.',
   'Car Rental', array['HTML','CSS','JavaScript'],
   (select id from public.media_assets where storage_path = 'legacy/morrent-rental.jpg'),
   'https://github.com/muhammadwasikt/Morent-rental', false, 7, 'published', now()),
  ('Final Hackathon Project (SMIT)', 'smit-hackathon',
   'A collaborative project developed for a hackathon, showcasing innovative solutions using modern web technologies.',
   'A collaborative project developed for a hackathon, showcasing innovative solutions using modern web technologies.',
   'Hackathon Project', array[]::text[],
   (select id from public.media_assets where storage_path = 'legacy/next-dashboard.jpg'),
   'https://github.com/muhammadwasikt/final-hackhathon-smit', false, 8, 'published', now()),
  ('Chawk Bazaar', 'chawk-bazaar',
   'A mini-project built for a hackathon challenge, demonstrating problem-solving and development skills.',
   'A mini-project built for a hackathon challenge, demonstrating problem-solving and development skills.',
   'Hackathon Project', array[]::text[],
   (select id from public.media_assets where storage_path = 'legacy/chawk-bazaar.jpg'),
   'https://github.com/muhammadwasikt/mini-hackthon-react', false, 9, 'published', now())
on conflict (slug) do nothing;

insert into public.skills (name, level_label, status, sort_order)
select seed.name, seed.level_label, 'published', seed.sort_order
from (values
  ('HTML', '', 1), ('CSS', '', 2), ('JavaScript', '', 3), ('React', '', 4),
  ('Firebase', '', 5), ('Tailwind CSS', '', 6), ('Shadcn', '', 7), ('Daisyui', '', 8),
  ('GitHub', '', 9), ('Bootstrap', '', 10), ('Material UI', '', 11),
  ('Next.js', 'Basic', 12), ('Node.js', 'Basic', 13), ('Express.js', 'Basic', 14), ('MongoDB', 'Basic', 15)
) as seed(name, level_label, sort_order)
where not exists (select 1 from public.skills existing where lower(existing.name) = lower(seed.name));

insert into public.site_content (content_key, value)
values
  ('hero', jsonb_build_object(
    'headline', 'Muhammad Wasi',
    'intro', 'Passionate MERN stack developer focused on building modern, responsive, and high-performance web applications.',
    'image_url', '/assets/images/hero-image.jpg',
    'art_alt', 'Portfolio profile image'
  )),
  ('profile', jsonb_build_object(
    'eyebrow', 'ABOUT ME',
    'headline', 'About Me',
    'bio', 'I am a passionate full-stack developer dedicated to crafting modern, responsive, and high-performance web applications. With a strong foundation in frontend technologies, I strive to create seamless and engaging user experiences.',
    'image_url', '/assets/images/hero-image.jpg',
    'image_alt', 'Portfolio profile image'
  )),
  ('site_settings', jsonb_build_object(
    'brand_name', 'WASI',
    'location', 'Karachi, Pakistan',
    'seo_title', 'Muhammad Wasi | MERN Stack Developer',
    'seo_description', 'Passionate MERN stack developer focused on building modern, responsive, and high-performance web applications.'
  )),
  ('navigation', jsonb_build_object('items', jsonb_build_array(
    jsonb_build_object('label','Home','href','/'),
    jsonb_build_object('label','About','href','/about'),
    jsonb_build_object('label','Services','href','/services'),
    jsonb_build_object('label','Projects','href','/projects'),
    jsonb_build_object('label','Contact','href','/contact')
  ))),
  ('footer', jsonb_build_object(
    'headline', 'Stay Connected',
    'social_links', jsonb_build_array(
      jsonb_build_object('label','Facebook','url','https://www.facebook.com/people/M-Wasi-Imran-khatri/pfbid0kNNb22faBXSzXSuUij5sgMsJUuq2btKeXQ5KaPGJnNA2pbKyKrpvJ2ZK2SBp24HUl/'),
      jsonb_build_object('label','Medium','url','https://medium.com/@wasikhatri11'),
      jsonb_build_object('label','LinkedIn','url','https://www.linkedin.com/in/muhammad-wasi-imran-khatri')
    )
  )),
  ('contact', jsonb_build_object(
    'headline', 'Contact Me',
    'description', 'Feel free to reach out for collaborations or inquiries!',
    'email', 'wasikhatri11@gmail.com',
    'phone', '+92 327 8455637',
    'location', 'Karachi, Pakistan',
    'map_url', 'https://maps.app.goo.gl/PQu91Gd16zsuWhmU7',
    'cta_label', 'Send message'
  )),
  ('projects_page', jsonb_build_object('title','PROJECTS')),
  ('services_page', jsonb_build_object('title','My Services')),
  ('section_copy', jsonb_build_object('projects_title','PROJECTS'))
on conflict (content_key) do nothing;

insert into public.site_content (content_key, value)
values ('services', jsonb_build_array(
  jsonb_build_object('title','Web Design','description','Creating visually appealing and user-friendly web designs.'),
  jsonb_build_object('title','Frontend Development','description','Building responsive and interactive user interfaces using React and Next.js.'),
  jsonb_build_object('title','Full-Stack Development','description','Developing scalable web applications using the MERN stack (MongoDB, Express, React, Node.js).'),
  jsonb_build_object('title','Admin Dashboard Development','description','Creating powerful admin dashboards using React, Next.js, and ShadCN UI.'),
  jsonb_build_object('title','E-commerce Website Development','description','Building multi-vendor e-commerce platforms with secure payment integrations.'),
  jsonb_build_object('title','Authentication & Security','description','Implementing secure authentication with JWT, Firebase, and role-based access control.'),
  jsonb_build_object('title','API Development & Integration','description','Developing RESTful APIs with Node.js and integrating third-party services.')
))
on conflict (content_key) do nothing;
