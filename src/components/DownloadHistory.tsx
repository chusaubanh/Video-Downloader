import PlatformBadge from './PlatformBadge'

interface HistoryItem {
    id: string
    title: string
    thumbnail: string
    platform: string
    downloadedAt: string
    filePath: string
}

interface DownloadHistoryProps {
    items: HistoryItem[]
    onOpenFolder: (path: string) => void
    onClear: () => void
    darkMode: boolean
    t: any
}

function formatDate(dateString: string, t: any): string {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return t.justNow
    if (minutes < 60) return `${minutes} ${t.minutesAgo}`
    if (hours < 24) return `${hours} ${t.hoursAgo}`
    if (days < 7) return `${days} ${t.daysAgo}`

    return date.toLocaleDateString('vi-VN')
}

function DownloadHistory({ items, onOpenFolder, onClear, darkMode, t }: DownloadHistoryProps) {
    return (
        <div className={`glass-card p-6 ${darkMode ? 'bg-white/5' : ''}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t.downloadHistory}
                </h3>
                <button
                    onClick={onClear}
                    className={`text-sm transition-colors flex items-center gap-1 ${darkMode ? 'text-white/50 hover:text-red-400' : 'text-gray-500 hover:text-red-500'}`}
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {t.clearHistory}
                </button>
            </div>

            <div className="space-y-3">
                {items.map((item, index) => (
                    <div
                        key={item.id + index}
                        className={`flex items-center gap-4 p-3 rounded-xl transition-colors group ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                    >
                        {/* Thumbnail */}
                        <div className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-gray-200'}`}>
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none'
                                }}
                            />
                            <div className="absolute top-1 left-1">
                                <PlatformBadge
                                    platform={item.platform as 'tiktok' | 'instagram' | 'facebook' | 'youtube' | 'twitter'}
                                    size="sm"
                                />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <h4 className={`text-sm font-medium line-clamp-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                {item.title}
                            </h4>
                            <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                {formatDate(item.downloadedAt, t)}
                            </p>
                        </div>

                        {/* Actions */}
                        <button
                            onClick={() => onOpenFolder(item.filePath)}
                            className={`flex-shrink-0 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 ${darkMode
                                    ? 'bg-white/10 hover:bg-primary-500/20 text-white/50 hover:text-primary-400'
                                    : 'bg-gray-100 hover:bg-primary-100 text-gray-500 hover:text-primary-600'
                                }`}
                            title="Open folder"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DownloadHistory
