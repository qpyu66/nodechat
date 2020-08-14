
const fs = require('fs')
module.exports = function(app){
    app.get('/', function(req, res){
        console.log('/index page')
        res.render('index.html')       
    })
    app.get('/about', function(req,res){
        console.log('/about page')
        res.render('about.html')
    })
    app.get('/login', function(req,res){
        console.log('/login page')
        //res.json({message:'welcom to out upload module apis'})
        res.render('login.html')
    })   
    app.get('/signup', function(req,res){
        console.log('/signup page')
        res.render('signup.html')
    })   

    app.get('/chatting', function(req, res){
        // console.log('유저가 / 으로 접속했다!')
       // res.render('chatting0805.html')   
       fs.readFile('/chatting0805.html', function(err, data){
        if(err){
            res.send('ERROR!')            
        }else{
            res.writeHead(200,{'Content-Type' : 'text/html'})
            res.write(data)
            res.end() /**write를 통해 응답할 경우 end사용해야함 */
        }
    })    
    })
    

    //app.post('signup',router.signup)
    //app.post('login',router.login)

}//module


// exports.signup = function(req,res){
//     var today = new Date()
//     var users = {
//         "id" : req.body.id,
//         "password" : req.body.password,
//         "created" : today
//     }
//     connection.query('INSERT INTO users SET ?', users, function(error, results, fields){
//         if(error){
//             console.log('error ocurred',error)
//             res.send({
//                 'code' : 400,
//                 'failed' : 'error ocurred'
//             })
//         }else{
//             console.log('the solution is : ',results)
//             res.send({
//                 'code' : 200,
//                 'failed' : 'user signup sucessfully'
//             })
//         }
//     })
// }

