const _=require('../config/config')
const query=require('../quries/banking')
const Validator=require('validatorjs');
const generateToken=require('../utils/jwt_token')
const bcrypt = require('bcrypt');
const saltRounds = 10;

class BankController {
    async createUser(req, res) {
     
        // console.log(authValidation)
          try {
          let rules={
            name:'string|required',
            email:'required|email',
            password:'min:4|max:10',
            role_id:'required'
          }
          let validation = new Validator(req.body, rules);
          if(validation.passes()){
           
            _.pool.query(query.usercheck,[req.body.email],async (err,result)=>{
            
              if(result.length==0){
               const hashpassword= await bcrypt.hash(req.body.password, saltRounds)
               var body={
                        name:req.body.name,
                        email:req.body.email,
                        password:hashpassword,
                        role_id:req.body.role_id
                }
                _.pool.query(query.register,body,(err,result)=>{
        
                  if(!err){
  
                    res.status(200).json({ message: "User added successfully",token:generateToken(req.body.name,req.body.email) });
                  }else{
                    res.status(202).json({ message: err.message })
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


      async applyloan(req, res, next) {
        
        try {
         var managersid=[];
        
          _.pool.query(query.lastID,(err,result)=>{
            
            
            if(result.length==0){
              _.pool.query(query.managersID,(err,result)=>{
                result.map((x)=>{
                  managersid.push(x['id']);
                })
                var body={
                  user_id:req.body.user_id,
                  loan_amount:req.body.loan_amount,
                  loan_desc:req.body.loan_desc,
                  status:req.body.status,
                   manager_id:managersid[0]
  
                }
                _.pool.query(query.insertloan,body,(err,result)=>{
  if(!err){
    res.status(200).json({ message:  'Loan applied successfully!! wait for the approval!!' });
  }else{
    res.status(400).json({
      message:err.message
    })
  }
              })
            
        
              })

            //  res.status(200).json({ message:  result });
            }else{
              _.pool.query(query.managersID,(err,result)=>{
  result.map((x)=>{
                  managersid.push(x['id']);
                })
               
                _.pool.query(query.lastID,(err,result)=>{
                  var managerindex=managersid.indexOf(result[0]['manager_id']);

                  var nextmanager=managersid.length-1==managerindex?managersid[0]: managersid[managerindex]+1;
                  console.log(nextmanager)
                  var body={
                    user_id:req.body.user_id,
                    loan_amount:req.body.loan_amount,
                    loan_desc:req.body.loan_desc,
                    status:req.body.status,
                     manager_id:nextmanager
    
                  }
                  _.pool.query(query.insertloan,body,(err,result)=>{
    if(!err){
      res.status(200).json({ message:  'Loan applied successfully!! wait for the approval!!' });
    }else{
      res.status(400).json({
        message:err.message
      })
    }
                })
                  // res.status(200).json({ message:  result });
                })
                
              })
            

            }
          })
         
    
        }
        catch (e) {
            res.status(500).json({ msg: e.message });
        }
    }

    async getmanagerloans(req, res, next) {
        
      try {

        _.pool.query(query.managersLoans,[req.body.manager_id],(err,result)=>{
       if(!err){
        res.status(200).json({ message:  result });
       }else{
        res.status(400).json({ message:  err.message });
       }
          
        })
  
      
      }
      catch (e) {
          res.status(500).json({ msg: e.message });
      }
  }

  async myloans(req, res, next) {
        
    try {

      _.pool.query(query.myloans,[req.body.user_id],(err,result)=>{
     if(!err){
      res.status(200).json({ message:  result });
     }else{
      res.status(400).json({ message:  err.message });
     }
        
      })

    
    }
    catch (e) {
        res.status(500).json({ msg: e.message });
    }
}
async statusUpdate(req, res, next) {
        
  try {
    const {id,status}=req.body;
    _.pool.query(query.statusupdate,[status,id],(err,result)=>{
   if(!err){
    res.status(200).json({ message:  'Status updated!!' });
   }else{
    res.status(400).json({ message:  err.message });
   }
      
    })

  
  }
  catch (e) {
      res.status(500).json({ msg: e.message });
  }
}

async adminLoans(req, res, next) {
        
  try {

    _.pool.query(query.adminloans,[req.body.user_id],(err,result)=>{
   if(!err){
    res.status(200).json({ message:  result });
   }else{
    res.status(400).json({ message:  err.message });
   }
      
    })

  
  }
  catch (e) {
      res.status(500).json({ msg: e.message });
  }
}
  
}

module.exports = new BankController();