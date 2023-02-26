
exports.validate_user_registration = async (req,res,next) => {
    
    try{
          if (!req.body.name) {
            res.status(400).send({status : false, message: "Please enter user name!", statuscode : 0});
            return;
          }

          if (!req.body.password) {
            res.status(400).send({status : false, message: "Please enter password!", statuscode : 0});
            return;
          }

        if (!req.body.contact_no) {
            res.status(400).send({status : false, message: "Please enter contact no!", statuscode : 0});
            return;
          }
          
          if(!req.body.gender) {
           
              res.status(400).send({status : false, message: "Please enter gender!", statuscode : 0});
              return;
           
          } 
            if (!req.body.address) {
              res.status(400).send({status : false, message: "Please enter address!", statuscode : 0});
              return;
            }
           
            next();
        
    }
    catch(err) {
        return res.send({ error: true, statuscode: 0, data: err });
    }
}