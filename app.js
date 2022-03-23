const express=require('express')
const bodyParser=require('body-parser')
// const mysql=require('mysql')
const _=require('./config/config')
const app=express()
const routerv1 = require('./routes/routerv1');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//PORT Listen
app.listen(_.port)
console.log(`Listen on port ${_.port}`)

app.use('/api/v1', routerv1);
















// app.post('/register',(req,res)=>{
//     const   {username,email,password}=req.body;
       
//       _.pool.query(query.register,req.body,(err,result)=>{
          
//           if(!err){
//               res.send('user added')
//           }else{
//               console.log(err)
             
//           }
//       })
//    })