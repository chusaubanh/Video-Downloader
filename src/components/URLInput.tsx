import { useState, useEffect } from 'react'
import PlatformBadge from './PlatformBadge'

interface URLInputProps {
    onSubmit: (url: string) => void
    isLoading: boolean
    disabled: boolean
    darkMode: boolean
    t: any
}

type Platform = 'tiktok' | 'instagram' | 'facebook' | 'youtube' | 'twitter' | null

function URLInput({ onSubmit, isLoading, disabled, darkMode, t }: URLInputProps) {
    const [url, setUrl] = useState('')
    const [platform, setPlatform] = useState<Platform>(null)
    const [isValid, setIsValid] = useState(false)

    const detectPlatform = (inputUrl: string): Platform => {
        if (inputUrl.includes('tiktok.com')) return 'tiktok'
        if (inputUrl.includes('instagram.com')) return 'instagram'
        if (inputUrl.includes('facebook.com') || inputUrl.includes('fb.watch')) return 'facebook'
        if (inputUrl.includes('youtube.com') || inputUrl.includes('youtu.be')) return 'youtube'
        if (inputUrl.includes('twitter.com') || inputUrl.includes('x.com')) return 'twitter'
        return null
    }

    const validateUrl = (inputUrl: string): boolean => {
        try {
            new URL(inputUrl)
            return detectPlatform(inputUrl) !== null
        } catch {
            return false
        }
    }

    useEffect(() => {
        const detectedPlatform = detectPlatform(url)
        setPlatform(detectedPlatform)
        setIsValid(validateUrl(url))
    }, [url])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (isValid && !isLoading && !disabled) {
            onSubmit(url)
        }
    }

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText()
            setUrl(text)
        } catch (err) {
            console.error('Failed to read clipboard:', err)
        }
    }

    return (
        <div className={`glass-card p-6 ${darkMode ? 'bg-white/5' : ''}`}>
            <div className="mb-4">
                <h2 className={`text-xl font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {t.downloadFromSocial}
                </h2>
                <p className={`text-sm ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                    {t.pasteLink}
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="relative">
                    {/* Platform icon indicator */}
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                        {platform ? (
                            <PlatformBadge platform={platform} size="sm" />
                        ) : (
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${darkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
                                <svg className={`w-4 h-4 ${darkMode ? 'text-white/40' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* URL Input */}
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder={t.pasteLinkPlaceholder}
                        disabled={disabled || isLoading}
                        className={`
                            w-full h-14 pl-14 pr-32 rounded-xl
                            border-2 transition-all duration-200
                            focus:outline-none
                            disabled:opacity-50 disabled:cursor-not-allowed
                            ${darkMode
                                ? `bg-white/10 text-white placeholder-white/40 ${isValid ? 'border-primary-400' : url ? 'border-red-400/50' : 'border-white/20'} focus:border-primary-500`
                                : `bg-white text-gray-800 placeholder-gray-400 ${isValid ? 'border-primary-400 shadow-sm shadow-primary-100' : url ? 'border-red-300' : 'border-gray-200'} focus:border-gray-300`
                            }
                        `}
                    />

                    {/* Action buttons */}
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                        {/* Paste button */}
                        <button
                            type="button"
                            onClick={handlePaste}
                            disabled={disabled || isLoading}
                            className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${darkMode
                                    ? 'bg-white/10 hover:bg-white/20 text-white/50 hover:text-white'
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700'
                                }`}
                            title="Paste"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </button>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={!isValid || isLoading || disabled}
                            className={`
                                h-10 px-4 rounded-lg font-medium transition-all duration-200
                                flex items-center gap-2
                                ${isValid && !isLoading && !disabled
                                    ? 'bg-gradient-primary text-white shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 hover:scale-105'
                                    : darkMode
                                        ? 'bg-white/10 text-white/40 cursor-not-allowed'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }
                            `}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>{t.loading}</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <span>{t.getVideo}</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Validation message */}
                {url && !isValid && (
                    <p className={`mt-2 text-sm flex items-center gap-1 ${darkMode ? 'text-red-400' : 'text-red-500'}`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {t.invalidLink}
                    </p>
                )}
            </form>
        </div>
    )
}

export default URLInput
