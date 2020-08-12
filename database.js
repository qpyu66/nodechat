var mysql = require('mysql')
var db_info = {
    host : 'localhost',
    port : '3306',
    user : 'testuser',
    password : '1111',
    database : 'sqld test'
    // host : '106.244.179.213',
    // port : '33006',
    // user : 'testuser',
    // password : '!QAZ2wsx',
    // database : 'testdb'
}
//console.log('info : ',db_info)
//var connection = mysql.createConnection(db_info)
//connection.connect()

module.exports = {    
    init : function () {
        console.log('mysql is init ! ')
        return mysql.createConnection(db_info)       
    },
    connect : function(conn){
        conn.connect(function(err){
            if(err) console.log('mysql connection error : '+ err)
            else console.log('mysql is connected successfully! ')
        })
    }
}

