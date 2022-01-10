const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
//file system for node JS
const fs = require('fs')


//generate a txt file for storage the data.
ipcMain.on('msg', (event, data) => {

  //destructuring data
  const { nameInputValue, DNInputValue, adressValueFirstInput, numberValueFirstInput, phoneArea, phoneNumber, counterId } = data;

    fs.mkdir(path.join(__dirname, `records/${nameInputValue}`), (err) => {
      if (err) {
        return console.error(err);
      }
      console.log('Directory created successfully!');
    });

  
  fs.appendFile(`./records/${nameInputValue}/${nameInputValue}-${DNInputValue}-datos.txt`,
    `
  apellido: ${nameInputValue}
  DNI: ${DNInputValue}
  Calle: ${adressValueFirstInput}
  Numero de casa: ${numberValueFirstInput}

  --------Celular---------

  Cod de area: ${phoneArea}
  Numero: ${phoneNumber} 
  `,
    //callback function  
    function (err) {
      if (err) throw err;
      console.log('success saved');
    });

})

//window
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      //this is for usage require in ES6
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})





//hot reload for electron JS(like live server for VS code)
try {
  require('electron-reloader')(module)
  console.log("Hot reload is available")
} catch (_) { }


