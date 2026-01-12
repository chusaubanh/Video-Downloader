const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron')
const path = require('path')
const { downloadVideo, getVideoInfo, cancelDownload } = require('./ytdlp.cjs')

let mainWindow = null
let isDev = process.env.NODE_ENV === 'development' || !app.isPackaged

// Single instance lock - only allow one instance of the app
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
    // Another instance is already running, quit this one
    app.quit()
} else {
    // Someone tried to run a second instance, focus our window
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        minWidth: 800,
        minHeight: 600,
        frame: false, // Frameless window for custom titlebar
        transparent: false,
        backgroundColor: '#0a0a0f',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.cjs')
        },
        icon: path.join(__dirname, '../public/icon.png'),
        show: false // Don't show until ready
    })

    // Load the app
    if (isDev) {
        mainWindow.loadURL('http://localhost:5173')
        mainWindow.webContents.openDevTools()
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
    }

    // Show window when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.on('closed', () => {
        // Cancel any running downloads
        cancelDownload()
        mainWindow = null
    })

    // Handle close button to cleanup
    mainWindow.on('close', () => {
        cancelDownload()
    })
}

// App lifecycle
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    // Cancel any running downloads before quitting
    cancelDownload()
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// Force quit on before-quit
app.on('before-quit', () => {
    cancelDownload()
})

// IPC Handlers

// Window controls
ipcMain.handle('minimize-window', () => {
    mainWindow?.minimize()
})

ipcMain.handle('close-window', () => {
    mainWindow?.close()
})

// Get video info
ipcMain.handle('get-video-info', async (event, url) => {
    try {
        const info = await getVideoInfo(url)
        return info
    } catch (error) {
        throw new Error(error.message || 'Không thể lấy thông tin video')
    }
})

// Download video
ipcMain.handle('download-video', async (event, videoId, formatId, savePath) => {
    try {
        await downloadVideo(videoId, formatId, savePath, (progress) => {
            mainWindow?.webContents.send('download-progress', progress)
        })
        return { success: true }
    } catch (error) {
        throw new Error(error.message || 'Không thể tải video')
    }
})

// Cancel download
ipcMain.handle('cancel-download', () => {
    cancelDownload()
})

// Select folder
ipcMain.handle('select-folder', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory'],
        title: 'Chọn thư mục lưu video'
    })

    if (result.canceled) {
        return null
    }
    return result.filePaths[0]
})

// Open folder in file explorer
ipcMain.handle('open-folder', async (event, folderPath) => {
    await shell.openPath(folderPath)
})

// Open file location
ipcMain.handle('show-item-in-folder', async (event, filePath) => {
    shell.showItemInFolder(filePath)
})
