const {Sequelize} = require('sequelize') 

var db_config ={
    host: 'localhost',
    user: 'root',
    password:'',
    port:3306,
    database:'bd_simulacion'
}

//modelos

const sensorModel =require('../model/sensor');
const ventiladorModel = require('../model/ventilador');
const calentadorModel =require('../model/calentador')

/*
 var sequelize =new Sequelize('mysql://'+db_config.user+':'+db_config.password+
'@'+db_config.host +':'+db_config.port+'/'+db_config.database+'');
 */
const sequelize = new Sequelize(db_config.database, db_config.user, '', {
    host: 'localhost',
    dialect: 'mysql'
  });


const sensor =sensorModel(sequelize);
const ventilador =ventiladorModel(sequelize);
const calentador =calentadorModel(sequelize);

sequelize.sync({force:false}).then(()=>{
  console.log('tablas migradas');
})

module.exports={
  sensor,
  ventilador,
  calentador
}