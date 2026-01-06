const mysql = require('mysql2')

let DB = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE 
})
DB.connect((err) => {
    if (err) { console.log(`error: Conecting Database ${err.message}`); return }
    console.log("Database Connected!")
})
module.exports = DB;

// import mysql from 'mysql2'
// // const connectToDatabase = () => {
//     let conection = mysql.createConnection({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         database: process.env.DB_DATEBASE,
//         password: process.env.DB_PASSWORD
//     });

//     conection.connect(function (err) {
//         if(err) {console.log(err); return }
//         console.log("Connected!");
//     });

// export default conection;