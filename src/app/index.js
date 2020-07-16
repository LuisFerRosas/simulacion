const {createWindow} = require ('./main')
const {app} = require('electron')

require("../config/database")
require ('electron-reload')('../view/index.html')


app.allowRendererProcessReuse=false;
app.whenReady().then(createWindow); // carga la app y cuando esta listo ejecuta createWindow
