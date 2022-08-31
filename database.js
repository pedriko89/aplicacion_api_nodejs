const mysql =require('mysql');
const { promisify }= require('util');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has to many connections');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('la conexion con la base de datos fue rechazada');
    }
  }

  if (connection) connection.release();
  console.log('base de datos conectada');

  return;
});

// ahora puedo utilizar promesas en todos los pool que empiecen por query, importando promisify de util
pool.query = promisify(pool.query);

module.exports = pool;
