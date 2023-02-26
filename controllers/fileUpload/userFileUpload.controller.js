const model = require("../../models/userModel.model.js");
const multer = require("multer");
const path = require("path");


exports.userfileUpload =  async(req,res)=>{ 

    //var multer  =   require('multer');
    var storage =   multer.diskStorage({
      destination: function (req, file, callback) {
   
    if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg'){
                        res.send("Supported image files are jpeg, jpg, and png");
                        return false;
                    }
    callback(null, 'public/uploads');
    
      },
      filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() +'.png');
      },
    
    });
   
    var upload = multer({ storage : storage}).single('file');
        upload(req,res,function(err) {
    
            if(err) {
                return res.end("Error uploading file.");
            }
    
    console.log(req.files);
    console.log(req.file);
    return res.end("File is uploaded");
        });

  }