

const _=require('../config/config')
const query=require('../quries/user')
const Validator=require('validatorjs')
const generateToken=require('../utils/jwt_token')
const jwt=require('jsonwebtoken')

class UserController {

    async createUser(req, res) {
     
      // console.log(authValidation)
        try {
        let rules={
          name:'string|required',
          email:'required|email',
          password:'min:4|max:10'
        }
        let validation = new Validator(req.body, rules);
        if(validation.passes()){
         
          _.pool.query(query.userCheck,[req.body.email],(err,result)=>{
          //  res.status(200).json({ message: result });
            if(result.length==0){
              _.pool.query(query.register,req.body,(err,result)=>{
      
                if(!err){

                  res.status(200).json({ message: "User added successfully",token:generateToken(req.body.name,req.body.email) });
                }else{
                  res.status(202).json({ message: "Please try again" })
                }
            })
            }else{
             res.status(400).json({ message: "User already register" });
            }
            
          })
        }else{
          res.status(400).json({ message: "Check input values" });
        }
        

         
        }
        catch (e) {
            res.status(500).json({ message: e.message });
        }
    }

    async login(req, res, next) {
       
        try {
          _.pool.query(query.userCheck,[req.body.email],(err,result)=>{
            if(result.length!=0){
             
              _.pool.query(query.passwordCheck,[req.body.email],(err,result)=>{
      
                if(!err){
                  var name='';
                  if(result[0]['password']==req.body.password){
                    _.pool.query(query.nameGet,[req.body.email],(err,result)=>{
                      name=result[0]['name'];
                      
                    })
                    res.status(200).json({ message: "Login successfully" ,token:generateToken(name,req.body.email) });
                  }else{
                    res.status(422).json({ message: "Incorrect password" });
                  }
                  
                }else{
                  res.status(202).json({ message: "Please try again" })
                }
            })
            }else{
              res.status(422).json({ message: "Please register!!!" });
            }
          })
          
        }
        catch (e) {
            res.status(500).json({ message: "Server Error" });
        }
    }


    async profile(req, res, next) {
      let token
      try {
       token=req.headers.authorization;
       const decoded = jwt.verify(token, process.env.JWT_SECRET,)
     res.status(200).json({ message:decoded });
       
      }
      catch (e) {
          res.status(500).json({ msg: e.message });
      }
  }
}

module.exports = new UserController();