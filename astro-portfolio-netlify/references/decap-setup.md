# Decap CMS — Chi tiết cấu hình cho Astro Portfolio

## File 1: `public/admin/index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <link href="/admin/config.yml" type="text/yaml" rel="cms-config-url" />
    <title>Content Manager</title>
  </head>
  <body>
    <script src="https://unpkg.com/decap-cms@^3.1.2/dist/decap-cms.js"></script>
  </body>
</html>
```

---

## File 2: `public/admin/config.yml` (Portfolio phim)

```yaml
backend:
  name: github
  repo: USERNAME/portfolio      # ← thay bằng GitHub username/repo của bạn
  branch: main
  base_url: https://yourdomain.com   # ← URL site đã deploy
  auth_endpoint: api/auth            # ← endpoint OAuth proxy

media_folder: "public/images/uploads"
public_folder: "/images/uploads"

collections:
  # === FILMS ===
  - name: "films"
    label: "Phim"
    folder: "src/content/films"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Tiêu đề", name: "title", widget: "string" }
      - { label: "Năm sản xuất", name: "year", widget: "number" }
      - { label: "Thể loại", name: "genre", widget: "select",
          options: ["Short Film", "Documentary", "Experimental", "Music Video", "Commercial"] }
      - { label: "Vai trò", name: "role", widget: "string",
          hint: "VD: Director, DOP, Editor" }
      - { label: "Thời lượng", name: "duration", widget: "string",
          hint: "VD: 39 phút" }
      - { label: "Thumbnail", name: "thumbnail", widget: "image", required: false }
      - { label: "Link video", name: "videoUrl", widget: "string", required: false,
          hint: "YouTube, Vimeo, hoặc link trực tiếp" }
      - { label: "Mô tả ngắn", name: "description", widget: "text" }
      - { label: "Nội dung đầy đủ", name: "body", widget: "markdown" }
      - { label: "Featured", name: "featured", widget: "boolean", default: false }
      - { label: "Ngày tạo", name: "pubDate", widget: "datetime" }

  # === WRITINGS ===
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

  # === ABOUT (single file) ===
  - name: "about"
    label: "Giới thiệu bản thân"
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

---

## Lưu ý quan trọng về `base_url` và `auth_endpoint`

- `base_url`: URL đầy đủ của site (không có slash cuối)  
- `auth_endpoint`: route tương đối đến OAuth handler — `api/auth` tương ứng với `pages/api/auth.js`  
- Khi test local: thêm `local_backend: true` vào config.yml và chạy `npx decap-server` song song

---

## Test local với `local_backend`

Thêm vào đầu `config.yml` khi dev:

```yaml
local_backend: true
backend:
  name: git-gateway    # dùng git-gateway cho local
  ...
```

Rồi chạy hai terminal:
```bash
# Terminal 1: Astro dev server
npm run dev

# Terminal 2: Decap proxy server
npx decap-server
```

Truy cập `http://localhost:4321/admin` để test CMS mà không cần OAuth thật.

> ⚠️ Nhớ xóa `local_backend: true` trước khi push lên production!