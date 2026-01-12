import PlatformBadge from './PlatformBadge'

interface VideoFormat {
    formatId: string
    quality: string
    ext: string
    filesize?: number
    downloadUrl?: string
}

interface VideoInfo {
    id: string
    title: string
    thumbnail: string
    duration: string
    author: string
    platform: 'tiktok' | 'instagram' | 'facebook' | 'youtube' | 'twitter'
    formats: VideoFormat[]
    originalUrl?: string
}

interface VideoPreviewProps {
    videoInfo: VideoInfo
    onDownload: (format: VideoFormat) => void
    darkMode: boolean
    t: any
}

function formatFileSize(bytes?: number): string {
    if (!bytes) return '~'
    const units = ['B', 'KB', 'MB', 'GB']
    let unitIndex = 0
    let size = bytes
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024
        unitIndex++
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`
}

function VideoPreview({ videoInfo, onDownload, darkMode, t }: VideoPreviewProps) {
    return (
        <div className={`glass-card p-6 slide-in ${darkMode ? 'bg-white/5' : ''}`}>
            <div className="flex flex-col md:flex-row gap-6">
                {/* Thumbnail */}
                <div className="relative flex-shrink-0 md:w-72">
                    <div className={`aspect-video rounded-xl overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
                        <img
                            src={videoInfo.thumbnail}
                            alt={videoInfo.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2394a3b8"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>'
                            }}
                        />
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/70 text-xs text-white font-medium">
                        {videoInfo.duration}
                    </div>

                    {/* Platform badge */}
                    <div className="absolute top-2 left-2">
                        <PlatformBadge platform={videoInfo.platform} size="md" />
                    </div>
                </div>

                {/* Video info */}
                <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-semibold mb-2 line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {videoInfo.title}
                    </h3>

                    <p className={`text-sm mb-4 flex items-center gap-2 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {videoInfo.author}
                    </p>

                    {/* Quality buttons */}
                    <div className="mb-2">
                        <label className={`block text-sm mb-3 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                            {t.selectQuality}
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {videoInfo.formats.map((format, index) => (
                                <button
                                    key={format.formatId}
                                    onClick={() => onDownload(format)}
                                    className={`
                                        group relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                                        hover:scale-105 hover:shadow-lg
                                        ${index === 0
                                            ? 'bg-gradient-primary text-white shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30'
                                            : darkMode
                                                ? 'bg-white/10 text-white/80 hover:bg-white/20'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }
                                    `}
                                >
                                    {/* Download icon on hover */}
                                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-mint-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        <div className="text-left">
                                            <span className="block font-bold">{format.quality}</span>
                                            <span className={`block text-xs ${index === 0 ? 'opacity-70' : darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                                MP4 • {formatFileSize(format.filesize)}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Helper text */}
                    <p className={`text-xs mt-3 flex items-center gap-1 ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {t.clickToDownload}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default VideoPreview
