---
name: astro-portfolio-netlify
description: >
  Complete setup guide for a filmmaker/creative portfolio using Astro (framework), GitHub (version control),
  Netlify (hosting + Identity), and Decap CMS (content management). Use this skill whenever the user wants to:
  set up a portfolio site with CMS, deploy Astro to Netlify, configure Decap CMS with Netlify Identity,
  manage films/projects/writings via browser UI, or connect any part of the Astro + GitHub + Netlify + Decap stack.
  This is the recommended stack because Netlify has built-in OAuth — no proxy server needed.
---

# Astro Portfolio — Netlify + Decap CMS

**Stack:** VS Code → Astro → GitHub → Netlify (host + Identity) → Decap CMS  
**Ưu điểm so với Cloudflare:** Netlify có built-in Identity → **không cần OAuth proxy**, setup đơn giản hơn nhiều  
**Cost:** Free tier (Netlify Starter free, GitHub free, Decap CMS open-source)

---

## PHASE 1 — Khởi tạo dự án Astro

```bash
npm create astro@latest portfolio
cd portfolio
```

Chọn:
- Template: **"A blog"** (có sẵn cấu trúc content collections)
- TypeScript: **Yes, strict**
- Install dependencies: **Yes**
- Init git repo: **Yes**

### Cấu trúc thư mục chuẩn

```
portfolio/
├── public/
│   └── admin/
│       ├── index.html      ← Decap CMS UI entry point
│       └── config.yml      ← Cấu hình CMS collections
├── src/
│   ├── content/
│   │   ├── config.ts       ← Astro content schema
│   │   ├── films/          ← .md files mỗi phim
│   │   └── writings/       ← .md files bài viết
│   ├── pages/
│   │   ├── index.astro
│   │   ├── films/[slug].astro
│   │   └── writings/[slug].astro
│   └── layouts/
│       └── BaseLayout.astro
├── astro.config.mjs
└── package.json
```

---

## PHASE 2 — Cài Decap CMS vào project

### File `public/admin/index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
    <title>Content Manager</title>
  </head>
  <body>
    <script src="https://unpkg.com/decap-cms@^3.1.2/dist/decap-cms.js"></script>
  </body>
</html>
```

### File `public/admin/config.yml` (Portfolio phim)

```yaml
backend:
  name: git-gateway        # Netlify Git Gateway — không cần cấu hình thêm
  branch: main

media_folder: "public/images/uploads"
public_folder: "/images/uploads"

collections:
  - name: "films"
    label: "Phim"
    folder: "src/content/films"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Tiêu đề", name: "title", widget: "string" }
      - { label: "Năm", name: "year", widget: "number" }
      - { label: "Thể loại", name: "genre", widget: "select",
          options: ["Short Film", "Documentary", "Experimental", "Music Video", "Commercial"] }
      - { label: "Vai trò", name: "role", widget: "string" }
      - { label: "Thời lượng", name: "duration", widget: "string", required: false }
      - { label: "Thumbnail", name: "thumbnail", widget: "image", required: false }
      - { label: "Link video", name: "videoUrl", widget: "string", required: false }
      - { label: "Mô tả ngắn", name: "description", widget: "text" }
      - { label: "Nội dung", name: "body", widget: "markdown" }
      - { label: "Featured", name: "featured", widget: "boolean", default: false }
      - { label: "Ngày", name: "pubDate", widget: "datetime" }

  - name: "writings"
    label: "Bài viết"
    folder: "src/content/writings"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { label: "Tiêu đề", name: "title", widget: "string" }
      - { label: "Ngày đăng", name: "pubDate", widget: "datetime" }
      - { label: "Tags", name: "tags", widget: "list", required: false }
      - { label: "Mô tả", name: "description", widget: "text", required: false }
      - { label: "Nội dung", name: "body", widget: "markdown" }

  - name: "about"
    label: "Giới thiệu"
    files:
      - label: "Trang About"
        name: "about"
        file: "src/content/about/index.md"
        fields:
          - { label: "Tên", name: "name", widget: "string" }
          - { label: "Bio", name: "bio", widget: "markdown" }
          - { label: "Ảnh đại diện", name: "avatar", widget: "image", required: false }
          - { label: "Email", name: "email", widget: "string", required: false }
          - { label: "Instagram", name: "instagram", widget: "string", required: false }
          - { label: "Vimeo", name: "vimeo", widget: "string", required: false }
```

### Thêm Netlify Identity widget vào layout

Trong `src/layouts/BaseLayout.astro`, thêm trước `</body>`:

```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
```

---

## PHASE 3 — Đẩy lên GitHub

```bash
# Tạo repo mới tại github.com/new (để trống, không init)
git remote add origin https://github.com/USERNAME/portfolio.git
git add .
git commit -m "feat: initial portfolio + decap cms"
git push -u origin main
```

---

## PHASE 4 — Deploy lên Netlify

1. Vào [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**
2. Chọn **GitHub** → chọn repo
3. Build settings:
   ```
   Build command:     npm run build
   Publish directory: dist
   ```
4. **Deploy site** — xong trong ~2 phút

---

## PHASE 5 — Bật Netlify Identity + Git Gateway ⭐

Đây là bước quan trọng nhất — cho phép Decap đăng nhập và ghi vào GitHub.

1. Netlify dashboard → **Site configuration → Identity → Enable Identity**
2. **Identity → Settings → Registration** → chọn **Invite only**
3. **Identity → Services → Git Gateway → Enable Git Gateway**
4. **Identity → Invite users** → nhập email → **Send invite**
5. Kiểm tra email → click link → đặt mật khẩu

✅ Không cần GitHub OAuth App, không cần proxy server.

---

## PHASE 6 — Sử dụng CMS

Truy cập `https://yoursite.netlify.app/admin` → đăng nhập → thêm phim/bài viết.

Mỗi lần save, Decap tự commit lên GitHub → Netlify tự build lại.

---

## Dev local (test CMS không cần push)

```bash
# Terminal 1: Astro
npm run dev

# Terminal 2: Decap local server
npx decap-server
```

Thêm vào `public/admin/config.yml` khi dev:
```yaml
local_backend: true
```

> ⚠️ Xóa `local_backend: true` trước khi `git push`!

---

## Astro Content Schema (`src/content/config.ts`)

```typescript
import { defineCollection, z } from 'astro:content';

const films = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    year: z.number(),
    genre: z.string(),
    role: z.string(),
    duration: z.string().optional(),
    thumbnail: z.string().optional(),
    videoUrl: z.string().optional(),
    description: z.string(),
    featured: z.boolean().default(false),
    pubDate: z.coerce.date(),
  }),
});

const writings = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
  }),
});

export const collections = { films, writings };
```

---

## Workflow tổng quan

```
Code (VS Code + Claude)
  → git push → Netlify auto-build → live

Nội dung (chỉ cần browser)
  → /admin → đăng nhập
  → thêm phim / viết bài
  → Decap commit GitHub → Netlify build
```