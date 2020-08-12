var socket = io()
/**chart_index.js 에 있는 on send 랑  */
socket.on('connect', function(){
    var name = prompt('채팅에서 사용하실 이름을 적어주세요.','')

    /**이름 빈칸인경우 */
    if(!name){
        name='익명'
    }

    socket.emit('newUser',name)    
})

/**본인 메시지 전송 */
socket.on('update',function(data){
    //console.log(`${data.name} : ${data.message}`)
    console.log('update : ',data)  
    
    if(data.type !=null){
        console.log('data.type : ',data.type) 
        console.log('data.message : ',data.message)      
        var msgLine = $('<div class="msgLineIO">')
        var msgBox = $('<div class="msgBoxIO">')
        msgBox.append(data.message)   
        msgLine.append(msgBox)
        $('#chatView').append(msgLine)
    }
})


var chatView = document.getElementById('chatView')
var chatForm = document.getElementById('chatForm')

/**본인 메시지 */
chatForm.addEventListener('submit',function(){
    var msg = $('#msg')
    if(msg.val() == ''){
        return;
    }else{
        socket.emit('SEND',msg.val())
        var msgLine = $('<div class="msgLine">')
        var msgBox = $('<div class="msgBox">')

        msgBox.append(msg.val())
        msgBox.css('display','inline-block')
        msgLine.css('text-align', 'right')
        msgLine.append(msgBox)

        $('#chatView').append(msgLine)

        msg.val('')
        chatView.scrollTop = chatView.scrollHeight
    }
})

/**상대방 메시지 */
socket.on('SEND',function(msg){
    var msgLine = $('<div class="msgLine">')
    var msgBox = $('<div class="msgBox">')

    msgBox.append(msg)
    msgBox.css('display', ' inline-block')
    msgBox.css('background', 'gray')

    msgLine.css('text-align', 'left')    
    msgLine.css('color', 'white')
    msgLine.append(msgBox)
    $('#chatView').append(msgLine)

    chatView.scrollTop = chatView.scrollHeight
})