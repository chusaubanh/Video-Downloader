const { contextBridge, ipcRenderer } = require('electron')

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
    // Window controls
    minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
    closeWindow: () => ipcRenderer.invoke('close-window'),

    // Video operations
    getVideoInfo: (url) => ipcRenderer.invoke('get-video-info', url),
    downloadVideo: (videoId, formatId, savePath) =>
        ipcRenderer.invoke('download-video', videoId, formatId, savePath),
    cancelDownload: () => ipcRenderer.invoke('cancel-download'),

    // File operations
    selectFolder: () => ipcRenderer.invoke('select-folder'),
    openFolder: (path) => ipcRenderer.invoke('open-folder', path),
    showItemInFolder: (path) => ipcRenderer.invoke('show-item-in-folder', path),

    // Event listeners
    onDownloadProgress: (callback) => {
        ipcRenderer.on('download-progress', (event, progress) => callback(progress))
    },

    removeDownloadProgressListener: () => {
        ipcRenderer.removeAllListeners('download-progress')
    }
})
