# Video-Get-Downloader

A modern video downloader application built with React, Tailwind CSS, and Electron. Download videos from popular social media platforms without watermarks.

## Features

- 🎬 Download videos from TikTok, Instagram, Facebook, YouTube, Twitter/X
- 🚫 No watermark on downloaded videos
- 📦 Standalone app - no additional installation required (yt-dlp bundled)
- 🌍 Multi-language support (English & Vietnamese)
- 🌙 Dark/Light mode with custom background
- 📁 Custom download folder settings
- 📜 Download history tracking
- 🔔 Desktop notifications when download completes
- 🔒 Single instance lock - prevents multiple instances

## Screenshots

Light Mode | Dark Mode
:---:|:---:
![Light Mode](screenshots/light.png) | ![Dark Mode](screenshots/dark.png)

## Installation

### Download Pre-built App

Download the latest `.exe` file from the [Releases](https://github.com/chusaubanh/Video-Downloader/releases) page.

### Build from Source

```bash
# Clone the repository
git clone https://github.com/chusaubanh/Video-Downloader.git
cd Video-Downloader

# Install dependencies
npm install

# Download yt-dlp (Windows)
curl -L -o electron/yt-dlp.exe https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe

# Run in development mode
npm run dev          # Web version
npm run electron:dev # Electron version

# Build for production
npm run electron:build
```

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Desktop**: Electron 28
- **Video Processing**: yt-dlp
- **Build Tool**: Vite
- **Packaging**: electron-builder

## Project Structure

```
Video-Get-Downloader/
├── electron/           # Electron main process files
│   ├── main.cjs        # Main process entry
│   ├── preload.cjs     # Preload script (IPC bridge)
│   └── ytdlp.cjs       # yt-dlp wrapper
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   ├── i18n/           # Translations
│   ├── services/       # API services
│   └── styles/         # CSS files
├── package.json
└── README.md
```

## Development

```bash
# Start development server
npm run dev

# Start Electron development
npm run electron:dev

# Build web app
npm run build

# Build Electron app
npm run electron:build
```

## License

MIT © ChuSauBanh

## Credits

- **Powered by**: [yt-dlp](https://github.com/yt-dlp/yt-dlp)
- **Built with**: React, Electron, Tailwind CSS
- **Author**: ChuSauBanh
