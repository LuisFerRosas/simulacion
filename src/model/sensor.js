const DataType =require('sequelize')

module.exports=(sequelize)=>{
    return sequelize.define('sensor',{
        
        id:{
            type:DataType.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },

        Nombre:DataType.STRING,
        Fecha:{
            type:DataType.STRING
        },
        Hora:DataType.STRING,
        Tiempo_Ejecucion:DataType.FLOAT(11,10),
        Diferencia_de_Tiempo:DataType.FLOAT(11,10),
        Lectura:DataType.INTEGER,
        Alerta:DataType.BOOLEAN,
        
    })
}

/*
console.log(Users === sequelize.models.User); 
Users.sync()
Users.create({
    nombre:'luis Fernando',
    apellido:'duran Rosas'
})

Users.findAll().then((user)=>{
    Users.forEach(user => {
        console.log('Nombre :'+user.nombre);
        console.log("apellido : "+user.apellido);
    });
})*/