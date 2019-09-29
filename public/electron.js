/* eslint-disable @typescript-eslint/no-var-requires */
const { app, BrowserWindow, globalShortcut } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

const { SIZES } = require('../src/constants')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 650,
    height: SIZES.INPUT.height,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  })
  const [positionX] = mainWindow.getPosition()
  mainWindow.setPosition(positionX, 200)

  globalShortcut.register('Alt+Space', () => {
    const isVisible = mainWindow.isVisible()

    if (isVisible) {
      mainWindow.hide()
    } else {
      mainWindow.show()
    }
  })

  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
    } = require('electron-devtools-installer')

    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err))
  }

  mainWindow.setAlwaysOnTop(true, 'modal-panel')

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  )

  if (isDev) {
    // Open the DevTools.
    // BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools({ mode: 'detach' })
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
