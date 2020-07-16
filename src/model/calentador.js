const DataType =require('sequelize')

module.exports=(sequelize)=>{
    return sequelize.define('calentador',{
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
        Tiempo_Ejecucion:DataType.FLOAT,
        Diferencia_de_Tiempo:DataType.FLOAT,
        Tiempo_activo:DataType.FLOAT,
        Estado:DataType.STRING,
        Alerta:DataType.BOOLEAN
        
    })
}