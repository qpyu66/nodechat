console.log("Hello Node js!")
/**설치한 express 모듈 불러오기*/
const express = require('express')
/**설치한 socket 모듈 불러오기*/
const socket = require('socket.io')
/**node.js 기본 내장 모듈 불러오기*/
const http = require('http')
/** express 객체 생성 */
const app = express()
/** express http 서버 생성 */
const server = http.createServer(app)
/**get 방식으로 / 경로에 접속하면 실행 됨 */
const io = socket(server)
/**node.js 기본 내장 모듈 불러오기 */
const fs = require('fs')
const { DH_UNABLE_TO_CHECK_GENERATOR } = require('constants')

var socketList=[]

app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))


// app.use('/', function(req, resq){
//     resq.sendFile(__dirname+'/static/chatting2.html')
// })

/**Get 방식으로 / 경로에 접속하면 실행 됨 */
app.get('/', function(request, response){
    // console.log('유저가 / 으로 접속했다!')
    // response.send('Hello Express Server !')
    fs.readFile('./static/chatting0805.html', function(err, data){
        if(err){
            response.send('ERROR!')            
        }else{
            response.writeHead(200,{'Content-Type' : 'text/html'})
            response.write(data)
            response.end() /**write를 통해 응답할 경우 end사용해야함 */
        }
    })
})



io.on('connection',function(socket){
    socketList.push(socket)
    //console.log('User Join')   

    socket.on('newUser',function(name){
        console.log(name+' 님이 접속하였습니다.')
        /**소켓에 이름 저장해두기 */
        socket.name = name
        /**모든 소켓에게 전송 */
        io.sockets.emit('update', {type:'connect', name:'SERVER', message:name+' 님이 접속하였습니다.'})
    })

    socket.on('SEND',function(msg){
        console.log(msg)
        socketList.forEach(function(item,i){
            //console.log('item >',item.id)
            if(item != socket){
                item.emit('SEND',msg)
            }
        })
        //data.name = socket.name
        //console.log('message : ',data)
        /**보낸사람을 제외한 나머지 유저에게 메시지 전송 */
        socket.broadcast.emit('update',msg)
    })

   /**disconnect 는 socket.io 기본 이벤트 */
   socket.on('disconnect',function(){
    console.log(socket.name+'님이 나가셨습니다.')
     /**나가는 사람을 제외한 나머지 유저에게 메시지 전송 */
    socketList.splice(socketList.indexOf(socket), 1)
    socket.broadcast.emit('update',{type:'disconnect', name:'SERVER', message : socket.name + '님이 나가셨습니다.'})
})


})



/**server 8088 port listen */
server.listen(8088,function(){
    console.log("서버 실행 중... ")
})
