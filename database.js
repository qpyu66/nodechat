var mysql = require('mysql')
var db_info = {
    host : 'localhost',
    port : '3306',
    user : 'testuser',
    password : '1111',
    database : 'nodepage'
    // host : '106.244.179.213',
    // port : '33006',
    // user : 'testuser',
    // password : '!QAZ2wsx',
    // database : 'testdb'
}

//var insertsql = "INSERT INTO tbl_board(bno,btitle,bwriter,bdate) values(?,?,?,?)"

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
        conn.query('SELECT * FROM tbl_board',function(err,rows,fields){
            if(err){
                console.log(err)
            }else{
                //console.log('rows : ',rows)
                //console.log('fields : ',fields)
            }
        })
    }
}

