const model = require("../models/userModel.model.js");
const jwt = require('jsonwebtoken');


exports.user_registration =  async(req,res)=>{ 
  let userData = req.body;

    model.insertUserData(userData)
    .then( async(patient_res) => {
        res.status(200).send(patient_res);
    }).catch((err)=> {
        console.log(err);
        res.status(200).send({ status: false, message: "user not Registrated.", statuscode: 0, data: err });
    });
}

exports.user_login =  async(req,res)=>{ 
    // Validate request
  
   if (!req.body.name) {
       res.status(400).send({message : "name can not be empty!"});
       return;
   }
   if (!req.body.password) {
    res.status(400).send({message : "password can not be empty!"});
    return;
  } 
//let insertData = req.body;
   model.check_user(req)
   .then(async(user_status) => {
    if(user_status.statuscode === 0) {
        res.status(400).send(user_status);
      } else{
        console.log(user_status.message);
        let vall = {user_id:user_status.userData[0].id};
        let token = jwt.sign(vall,'the-super-strong-secrect',{ expiresIn: '1h' });
        res.status(200).send({status : true, message : user_status.message, statuscode : user_status.statuscode, token : token, userData : user_status.userData[0]});
        } 
   })
   .catch((err) => {
     console.log(err);
     res.status(400).send(err);
   });
};


exports.forgotPassword =  async(req,res)=>{ 
  // Validate request
 if (!req.body.name) {
     res.status(400).send({message : "name can not be empty!"});
     return;
 }
 if (!req.body.contact_no) {
    res.status(400).send({message : "contact_no can not be empty!"});
    return;
  } 
  if (!req.body.newPassword) {
    res.status(400).send({message : "newPassword can not be empty!"});
    return;
  } 

  model.updatePassword(req)
  .then(async(user_status) => {
    let vall = {user_id:user_status.data.id};
    let token = jwt.sign(vall,'the-super-strong-secrect',{ expiresIn: '1h' });
    res.status(200).send({status : true, message : user_status.message, token : token, userData : user_status.data});
  })
  .catch((err) => {
   console.log(err);
   res.status(400).send(err);
 });
 
};