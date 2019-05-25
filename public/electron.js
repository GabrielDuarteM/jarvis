const { app, BrowserWindow } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 650,
    height: 65,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  mainWindow.setAlwaysOnTop(true, 'modal-panel')

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  )

  if (isDev) {
    // Open the DevTools.
    // BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
