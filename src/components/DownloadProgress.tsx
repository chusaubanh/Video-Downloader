interface DownloadProgressData {
    percent: number
    speed: string
    eta: string
    downloaded: string
    total: string
}

interface DownloadProgressProps {
    progress: DownloadProgressData
    videoTitle: string
    onCancel: () => void
    darkMode: boolean
    t: any
}

function DownloadProgress({ progress, videoTitle, onCancel, darkMode, t }: DownloadProgressProps) {
    return (
        <div className={`glass-card p-6 slide-in ${darkMode ? 'bg-white/5' : ''}`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                        <svg className="w-5 h-5 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </div>
                    <div>
                        <h3 className={`font-medium line-clamp-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{videoTitle}</h3>
                        <p className={`text-sm ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>{t.downloading}</p>
                    </div>
                </div>

                <button
                    onClick={onCancel}
                    className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400' : 'bg-red-50 hover:bg-red-100 text-red-500'}`}
                    title="Cancel"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Progress bar */}
            <div className={`relative h-3 rounded-full overflow-hidden mb-4 ${darkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
                <div
                    className="absolute inset-y-0 left-0 bg-gradient-primary rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress.percent}%` }}
                >
                    <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                </div>
            </div>

            {/* Progress details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{progress.percent.toFixed(0)}%</p>
                    <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>{t.progress}</p>
                </div>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <p className={`text-lg font-semibold ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>{progress.speed}</p>
                    <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>{t.speed}</p>
                </div>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <p className={`text-lg font-semibold ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>{progress.downloaded}</p>
                    <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>{t.downloaded}</p>
                </div>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <p className={`text-lg font-semibold ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>{progress.eta}</p>
                    <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>{t.remaining}</p>
                </div>
            </div>
        </div>
    )
}

export default DownloadProgress
