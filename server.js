
const express = require('express')
const app = express()
const router = require('./router/main')(app)
const chatRouter = require('./chatting0805')
const db_config = require('./database')
const mysql = require('mysql')
const { connect } = require('./database')


const port = 8089
const conn = db_config.init()
require('dotenv').config()

/**html 위치 정의 */
app.set('views',__dirname + '/views')
/**서버가 HTML 렌더링을 할 때 EJS엔진을 사용하도록 설정 */
app.set('view engine','ejs')
//db_config.connect()
app.engine('html',require('ejs').renderFile)
/**css */
//app.use(express.static('public'))
app.use(express.static(__dirname+'/public'))

//app.use(express.static('chat_index0805'))
/**db */
db_config.connect(conn)




// const session = require('express-session')
// const cookieParser = require('cookie-parser')
//const { propfind } = require('./router/main')
// app.use(express.json())
// app.use(express.urlencoded({extended : false }))
// app.use(cookieParser(process.env.COOKIE_SECRET))
// app.use(session({
//     resave : false,
//     saveUninitialized : false,
//     secret : process.env.COOKIE_SECRET,
//     cookie : {
//         httpnly:true,
//         secure : false,
//     },
// }))





app.post('/',function(req, res){
    var query = connect.query('select STADIUM_NAME from stadium',function(err,rows){
        if(err) throw err
        if(rows[0]){
            console.log('데이터 조회 : '+rows[0])
        }
    })
})



var server = app.listen(port,function(){
    console.log('port ',port)
})

