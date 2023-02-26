const sql = require("../config/dbconn.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.insertUserData = async(userData) => {
 
const encryptedPassword = await bcrypt.hash(userData.password, saltRounds);
delete userData.password;
userData.encryptedPassword = encryptedPassword;
    return new Promise((resolve, reject) => {
          var qry = `INSERT INTO user_registration SET ?`;
        const values = userData;
        sql.query(qry, values, (err, res) => {
          if (err) {
            console.log("error: ", err);
            reject(err);
          } else {
           const msg = "user Registration successfully";
            resolve({ message: msg, statuscode : 1});
          }  
        });
    });
  };

exports.check_user = (req) => {
    return new Promise((resolve, reject) => {
        var qry = `SELECT * FROM  user_registration WHERE name = '${req.body.name}'`;
        sql.query(qry, async(err, res) => {
          if (err) {
            console.log("error: ", err);
            reject(err);
            return;
      } else {
            if(res.length >0){          
              let password = req.body.password;
              const comparison = await bcrypt.compare(password, res[0].encryptedPassword);
                if(comparison){ 
                  resolve({ status : true, message: "User login Successful.", statuscode : 1, userData : res});
                } else {
                  resolve({ status : false, message: "password is incorrect.", statuscode : 0});
                }
            } else {
                resolve({ status : false, message: "No Record Found.", statuscode : 0});
            }
      }  
        });
    });
  };

  

  exports.updatePassword = (req) => {
    return new Promise((resolve, reject) => {
      var qry = `SELECT * FROM  user_registration WHERE name = '${req.body.name}' AND contact_no = '${req.body.contact_no}'`;
      sql.query(qry, async(err, res) => {
          if (err) {
            console.log("error: ", err);
            reject(err);
            return;
          } else {
            if(res.length > 0){   
              
              const updateData = req.body;
              const encryptedPassword = await bcrypt.hash(updateData.newPassword, saltRounds);
              delete updateData.newPassword;
              updateData.encryptedPassword = encryptedPassword;

              const qry = 'UPDATE `user_registration` ' + 'SET `encryptedPassword` = ? '  + 'WHERE `contact_no` = ?';
            
              const values = [updateData.encryptedPassword, updateData.contact_no];

              sql.query(qry, values, (err, res2) => { 

                if (err) {
                  console.log("error: ", err);
                  reject(err);
                } else {
                  const msg = "User Password updated.";
                  resolve({ message: msg, statuscode : 1, data:res[0]});
                }
              });
             
            } else {
                resolve({ status : false, message: "userName or contact number is incorrect.", statuscode : 0});
            }
          }  
      });
    });
  };