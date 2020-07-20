const { LinearGauge } = require("canvas-gauges");
const parametros =document.getElementById('parametroRandom');
const pmayor =document.getElementById('mayor');
const pmenor =document.getElementById('menor');
const database= require('../config/database');
const sensorDiv=document.getElementById('sensorDiv');
const calentadorDiv=document.getElementById('calentadorDiv');
const ventiladorDiv=document.getElementById('ventiladorDiv');
const btnPlay =document.getElementById('play');
const btnStop = document.getElementById('stop');
var menor =0;
var parametro=0;
parametros.addEventListener('submit',(e)=>{
    e.preventDefault();
   const mayor1=parseInt(pmayor.value);
   const menor1=parseInt(pmenor.value);
    if(menor1>=mayor1){
        alert("Parametros no admitidos")
    }else{
        mayor=parseInt(pmayor.value);
        menor=parseInt(pmenor.value);
    }
   // console.log(mayor)
    //console.log("///////////////////////////////////////")
    //console.log(menor)
})


var gauge = new LinearGauge({
    renderTo: 'canvas-id',
    width: 120,
    height: 400,
    units: "°C",
    minValue: 19,
    maxValue: 45,
    majorTicks: [
        "0",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45"
        
    ],
    minorTicks: 1,
    
    strokeTicks: true,
    highlights: [
        {
            "from": 40,
            "to": 45,
            "color": "rgba(200, 50, 50, .75)"
        }
    ],
    colorPlate: "#fff",
    borderShadowWidth: 0,
    borders: false,
    needleType: "arrow",
    needleWidth: 2,
    animationDuration: 1500,
    animationRule: "linear",
    tickSide: "left",
    numberSide: "left",
    needleSide: "left",
    barStrokeWidth: 7,
    barBeginCircle: false,
    value: 3
}).draw();

setInterval(function() {
   
    // update the above chart...
    let value = Math.round(Math.random() * (45 - 20)+20);
    //console.log(value)
    gauge.value = value;
    parametro=value;
  
}, 3000);

async function init(){
    await renderSensor();
    await renderCalentador();
    await renderVentilador();
}
var id=null;
btnPlay.addEventListener("click",function(){
    
     id=setInterval(() => {

        let inicio=performance.now();
        if(menor!=0){
        
        
        if (parametro<menor) {
            
            console.warn("encender calentador");
            console.log('temperatura '+parametro)
            encenderCalentador();
            
            
            apagarVentilador();
        }else{
            if (parametro>mayor) {
                console.warn("encender ventilador")
                console.log('temperatura '+parametro)
                encenderVentilador();
    
                apagarCalentador();
                
            }else{
                let res2=document.getElementById('res');
                let cal2=document.getElementById('calentador');
                if(res2.value!=0|| cal2.value!=0){
                    if(parametro>menor && parametro<mayor){
                       // console.log('apagando todo')
                        console.log(parametro + " cada 5 segundos");
                        apagarVentilador();
                        apagarCalentador();
                        
                    }
                    
                }
            
                }
               
            } 
            
        }
        let final=performance.now();
        let tiempoSensor=final-inicio;
        let fecha=new Date();
        var alerta=false;
        if(parametro>mayor || parametro<menor){
            alerta=true;
        }
        /*
        console.log("///////////////////////////////");
        console.log(fecha.toLocaleDateString());
        console.log(fecha.toLocaleTimeString());
        console.log('tiempo de ejecucion = '+tiempoSensor);
        console.log('diferencia de tiempo = '+(10-tiempoSensor));
        console.log('temperatura = '+parametro);
        console.log(alerta);
        console.log("///////////////////////////////");*/
        database.sensor.create({
            Nombre:"termometro1 ",
            Fecha:fecha.toLocaleDateString(),
            Hora:fecha.toLocaleTimeString(),
            Tiempo_Ejecucion:tiempoSensor,
            Diferencia_de_Tiempo:10-tiempoSensor,
            Lectura:parametro,
            Alerta:alerta,
    
        });
        
        init();
    
        }, 5000);
 

    
})

btnStop.addEventListener('click',function(){
    clearInterval(id);
})







var fecha=new Date();
 function apagarCalentador(){
    var cal2=document.getElementById('calentador');
    let res2=document.getElementById('res');
     
    if(cal2.value==1){
        let calen=performance.now();
    
        cal2.value=2;
        let calen2=performance.now();
        var tiempo=calen2-calen;
        alerta=false;
        if(10-tiempo<0){
            var alerta=true;
        }
        setTimeout(()=>{
            var tcalentador = document.getElementById('tcalentador') ;
                let vent=parseFloat(tcalentador.value);
                console.error(tcalentador.value)
                database.calentador.create({
                    Nombre:'calentador1 ',
                    Fecha:fecha.toLocaleDateString(),
                    Hora:fecha.toLocaleTimeString(),
                    Tiempo_Ejecucion:tiempo,
                    Diferencia_de_Tiempo:10-tiempo,
                    Tiempo_activo:vent,
                    Estado:'apagado',
                    Alerta:alerta
                })
        },1);
        
        
        
        
        //console.log('funcion calentador '+calenRES);  
    }else if (res2.value==1){
            cal2.value=2;
    }
    
}

function apagarVentilador(){
    var cal2=document.getElementById('calentador');
    let res2=document.getElementById('res');
    if(res2.value==1){
        let calen=performance.now();
    
        res2.value=2;
        let calen2=performance.now();
        var tiempo=calen2-calen;
        alerta=false;
        if(10-tiempo<0){
            var alerta=true;
        }
        setTimeout(()=>{
            let tventilador=document.getElementById('tventilador') ;
            let vent=parseFloat(tventilador.value);
        
        database.ventilador.create({
            Nombre:'ventilador1 ',
            Fecha:fecha.toLocaleDateString(),
            Hora:fecha.toLocaleTimeString(),
            Tiempo_Ejecucion:tiempo,
            Diferencia_de_Tiempo:10-tiempo,
            Tiempo_activo:vent,
            Estado:'apagado',
            Alerta:alerta
        })
        },1);
        
        //console.log('funcion ventilador '+calenRES);  
    }else if (cal2.value==1){
            res2.value=2;
    }
}

function encenderCalentador(){
    let cal2=document.getElementById('calentador');
        
    if(cal2.value!=1){
        let inicio=performance.now();
        let cal=document.getElementById('calentador');
        cal.value=1;
        let fin=performance.now();
        let tiempo=fin-inicio;
        alerta=false;
        if(10-tiempo<0){
            var alerta=true;
        }
    database.calentador.create({
        Nombre:'calentador1 ',
        Fecha:fecha.toLocaleDateString(),
        Hora:fecha.toLocaleTimeString(),
        Tiempo_Ejecucion:tiempo,
        Diferencia_de_Tiempo:10-tiempo,
        Tiempo_activo:null,
        Estado:'encendido',
        Alerta:alerta
    })
    }
    

}

function encenderVentilador(){
    let res2=document.getElementById('res');
    if(res2.value!=1){
        let inicio=performance.now();
        let res=document.getElementById('res');
        res.value=1;
        let fin=performance.now();
        let tiempo=fin-inicio;
        alerta=false;
        if(10-tiempo<0){
            var alerta=true;
        }
    database.ventilador.create({
        Nombre:'ventilador1 ',
        Fecha:fecha.toLocaleDateString(),
        Hora:fecha.toLocaleTimeString(),
        Tiempo_Ejecucion:tiempo,
        Diferencia_de_Tiempo:10-tiempo,
        Tiempo_activo:null,
        Estado:'encendido',
        Alerta:alerta
    })  
    }

    
}
function renderSensor(){

    database.sensor.findAll().then((sensor)=>{
        sensorDiv.innerHTML='';
        sensor.forEach(sen => {
            sensorDiv.innerHTML +=`
            <tr class="table-active">
                    <th scope="row"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.id}</font></font></th>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Nombre}</font></font></td>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Fecha}</font></font></td>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Hora}</font></font></td>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Tiempo_Ejecucion}</font></font></td>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Diferencia_de_Tiempo}</font></font></td>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Lectura}</font></font></td>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Alerta}</font></font></td>
                    
            </tr>
            `;
        });
    })
}

function renderCalentador(){

    database.calentador.findAll().then((calentador)=>{
        calentadorDiv.innerHTML='';
        calentador.forEach(sen => {
            calentadorDiv.innerHTML +=`
            <tr class="table-active">
                    <th scope="row"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.id}</font></font></th>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Nombre}</font></font></td>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Fecha}</font></font></td>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Hora}</font></font></td>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Tiempo_Ejecucion}</font></font></td>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Diferencia_de_Tiempo}</font></font></td>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Tiempo_activo}</font></font></td>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Estado}</font></font></td>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Alerta}</font></font></td>
                    
            </tr>
            `;
        });
    })
}

function renderVentilador(){

    database.ventilador.findAll().then((ventilador)=>{
        ventiladorDiv.innerHTML='';
        ventilador.forEach(sen => {
            ventiladorDiv.innerHTML +=`
            <tr class="table-active">
                    <th scope="row"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.id}</font></font></th>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Nombre}</font></font></td>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Fecha}</font></font></td>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Hora}</font></font></td>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Tiempo_Ejecucion}</font></font></td>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Diferencia_de_Tiempo}</font></font></td>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Tiempo_activo}</font></font></td>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Estado}</font></font></td>
                    <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${sen.Alerta}</font></font></td>
                    
            </tr>
            `;
        });
    })
}
