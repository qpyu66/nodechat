var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var moment = require('moment')

var pool = mysql.createPool({
    connectionLimit:5,
    host : 'localhost',
    port : '3306',
    user : 'testuser',
    password : '1111',
    database : 'nodepage'
})


router.get('/',function(req,res,next){
    console.log('board1')
    res.redirect('board1/list')
})

router.get('/list',function(req,res,next){
    pool.getConnection(function(err,connection){
        var selectsql = "SELECT * "+"from tbl_board "
        connection.query(selectsql, function(err, rows){
            console.log('board1 connection')
            if(err) console.log('err : ',err)
            console.log('board1 rows : ',rows)
            res.render('board1/list',{rows: rows?rows:{}, moment:moment })
            connection.release()
        })
    })
})



module.exports = router
