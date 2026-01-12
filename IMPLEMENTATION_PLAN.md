# Video Downloader App - Implementation Plan

## Overview
Xây dựng ứng dụng desktop cho phép tải video từ các mạng xã hội phổ biến (TikTok, Instagram, Facebook, YouTube, Twitter/X) **không có watermark**. Ứng dụng sử dụng **ReactJS + TailwindCSS** cho frontend và được đóng gói thành ứng dụng desktop với **Electron**.

## Lưu ý quan trọng

> **Phương pháp tải video**: Sử dụng thư viện **yt-dlp** (open-source, miễn phí) thông qua Electron để tải video. Đây là giải pháp phổ biến và đáng tin cậy nhất.

> **Lưu ý pháp lý**: Người dùng chịu trách nhiệm tuân thủ điều khoản sử dụng của từng nền tảng và luật bản quyền.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Electron App                         │
│  ┌──────────────┐    ┌──────────────┐                  │
│  │   React UI   │───▶│ Electron IPC │                  │
│  │ (TailwindCSS)│    │              │                  │
│  └──────────────┘    └──────┬───────┘                  │
│                             │                          │
│                      ┌──────▼───────┐                  │
│                      │ Main Process │                  │
│                      └──────┬───────┘                  │
│                             │                          │
│  ┌──────────────┐    ┌──────▼───────┐                  │
│  │    Local     │◀───│  yt-dlp      │                  │
│  │   Storage    │    │   Engine     │                  │
│  └──────────────┘    └──────────────┘                  │
└─────────────────────────────────────────────────────────┘
```

---

## File Structure

```
Video-Get-Downloader/
├── IMPLEMENTATION_PLAN.md    # File này
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── index.html
├── public/
│   └── icon.png
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── vite-env.d.ts
│   ├── styles/
│   │   └── index.css
│   └── components/
│       ├── Header.tsx
│       ├── URLInput.tsx
│       ├── VideoPreview.tsx
│       ├── DownloadProgress.tsx
│       ├── DownloadHistory.tsx
│       └── PlatformBadge.tsx
└── electron/
    ├── main.js
    └── preload.js
```

---

## UI Components

| Component | Chức năng |
|-----------|-----------|
| `Header` | Logo, title, window controls |
| `URLInput` | Input URL với platform detection |
| `VideoPreview` | Thumbnail, info, quality selector |
| `DownloadProgress` | Progress bar, speed, ETA |
| `DownloadHistory` | Lịch sử tải |
| `PlatformBadge` | Badge icon cho từng platform |

---

## Color Palette (Dark Luxury Theme)

```css
--bg-primary: #0a0a0f
--bg-secondary: #1a1a2e
--bg-glass: rgba(255, 255, 255, 0.05)
--accent-primary: #6366f1 (Indigo)
--accent-secondary: #8b5cf6 (Purple)
--text-primary: #ffffff
--text-secondary: #94a3b8
```

---

## Platforms Supported

- ✅ TikTok (không watermark)
- ✅ Instagram (Reels, Posts, Stories)
- ✅ Facebook (Videos, Reels)
- ✅ YouTube
- ✅ Twitter/X

---

## Commands

```bash
# Install dependencies
npm install

# Run development
npm run dev

# Run with Electron
npm run electron:dev

# Build for production
npm run electron:build
```

---

## Dependencies

**Production:**
- react, react-dom

**Development:**
- vite, @vitejs/plugin-react
- tailwindcss, autoprefixer, postcss
- typescript
- electron, electron-builder
- concurrently, wait-on
