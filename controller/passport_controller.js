const _=require('../config/config')
const query=require('../quries/user')
const Validator=require('validatorjs');
const convert=require('json_encode')
class PassportController {

    async createPassport(req, res) {
     
        // console.log(authValidation)
          try {
          let rules={
            username:'string|required',
            email:'required|email',  
            passport_no: 'string',
            passport_exp_date:'string',
           
          }
       
          let validation = new Validator(req.body, rules);
          if(validation.passes()){
           
            _.pool.query(query.passportCheck,[req.body.email],(err,result)=>{
            //  res.status(200).json({ message: result });
            
              if(result.length==0){
             
             
                var body={
                  username:req.body.username,
                  email:req.body.email,
                  passport_no:req.body.passport_no,
                  passport_exp_date:req.body.passport_exp_date,
                  array:convert(req.body.array)
                }
                _.pool.query(query.insertPassport,body,(err,result)=>{
        
                  if(!err){
                    res.status(200).json({ message: "Passport added successfully" });
                  }else{
                      
                    res.status(202).json({ message: err.message })
                  }
              })
              }else{
               res.status(400).json({ message: "Passport already register" });
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
      async getallPassport(req, res, next) {
        
        try {

          _.pool.query(query.getallPassport,(err,result)=>{
          for (var i=0;i<result.length ;i++){
             result[i]['array']=JSON.parse(result[i]['array'])
          }
            res.status(200).json({ message:  result });
          })
    
        
        }
        catch (e) {
            res.status(500).json({ msg: e.message });
        }
    }
    async getparticularID(req, res, next) {
        
      try {

        _.pool.query(query.getparticularID,[req.params.id],(err,result)=>{
          result[0]['array']=JSON.parse(result[0]['array'])
          res.status(200).json({ message:  result });
        })
  
      
      }
      catch (e) {
          res.status(500).json({ msg: e.message });
      }
  }
}

module.exports = new PassportController();