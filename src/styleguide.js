const { app, BrowserWindow } = require('electron')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  })

  mainWindow.loadURL('http://localhost:3000')

  // Open the DevTools.
  // BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
  mainWindow.webContents.openDevTools({ mode: 'detach' })

  mainWindow.on('closed', () => (mainWindow = null))
  mainWindow.maximize()
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
