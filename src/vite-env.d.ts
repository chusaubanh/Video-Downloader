/// <reference types="vite/client" />

interface DownloadProgress {
    percent: number
    speed: string
    eta: string
    downloaded: string
    total: string
}

interface VideoInfo {
    id: string
    title: string
    thumbnail: string
    duration: string
    author: string
    platform: 'tiktok' | 'instagram' | 'facebook' | 'youtube' | 'twitter'
    formats: VideoFormat[]
    originalUrl: string
}

interface VideoFormat {
    formatId: string
    quality: string
    ext: string
    filesize?: number
    downloadUrl?: string
}

interface ElectronAPI {
    // Window controls
    minimizeWindow: () => Promise<void>
    closeWindow: () => Promise<void>

    // Video operations
    getVideoInfo: (url: string) => Promise<VideoInfo>
    downloadVideo: (videoId: string, formatId: string, savePath: string) => Promise<void>
    cancelDownload: () => Promise<void>

    // File operations
    selectFolder: () => Promise<string | null>
    openFolder: (path: string) => Promise<void>
    showItemInFolder: (path: string) => Promise<void>

    // Events
    onDownloadProgress: (callback: (progress: DownloadProgress) => void) => void
    removeDownloadProgressListener: () => void
}

declare global {
    interface Window {
        electronAPI?: ElectronAPI
    }
}

export { }
