const{BrowserWindow}= require('electron')

let window
function createWindow(){
   window= new BrowserWindow({
        width:1500,
        height:900,
        webPreferences:{
            nodeIntegration:true //para importar o utilizar modulos de node en la ventana
        }
    })
    window.loadFile('src/view/index.html');
}




module.exports={
    createWindow
}