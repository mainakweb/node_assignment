const dotenv = require('dotenv');
// Set path to .env file
dotenv.config({ path: './.env' });

const axios = require('axios');

// const getBreeds = async () => {
//   try {
//     return await axios.get('https://coderbyte.com/api/challenges/json/json-cleaning')
//   } catch (error) {
//     console.error(error)
//   }
// }

const router = require('express').Router();
const { check } = require('express-validator');
const {JWT_validation} = require('../middleware/JWT_validation.middleware');
const validation = require('../validation/validate.validation');
const userController = require('../controllers/userController.controller');
const fileUpload = require('../controllers/fileUpload/userfileUpload.controller');



router.get('/',(req, res) => {
  const name = process.env.APP_NAME;
  res.send(name);});

router.post('/userRegistration', validation.validate_user_registration, userController.user_registration);

   router.post('/login', userController.user_login);

   router.post('/forgotPassword', userController.forgotPassword);

   router.post('/fileUpload', JWT_validation, fileUpload.userfileUpload);

// clean the object
   router.get('/cleanObject',async (req, res) => {
   try {
      const namea =  await axios.get('https://coderbyte.com/api/challenges/json/json-cleaning');
   
      const myjsonobj = namea.data;
      console.log(myjsonobj);
      if(myjsonobj) {
        Object.keys(myjsonobj).forEach(function(key){
          if (myjsonobj[key] === '' || myjsonobj[key] === '-' || myjsonobj[key] === 'N/A') {
            delete myjsonobj[key];
          }
        });
        Object.keys(myjsonobj.name).forEach(function(key){
          if (myjsonobj.name[key] === '' || myjsonobj.name[key] === '-' || myjsonobj.name[key] === 'N/A') {
            delete myjsonobj.name[key];
          }
        });
        Object.keys(myjsonobj.education).forEach(function(key){
          if (myjsonobj.education[key] === '' || myjsonobj.education[key] === '-' || myjsonobj.education[key] === 'N/A') {
            delete myjsonobj.name[key];
          }
        });
        console.log(myjsonobj.hobbies.length);
        for( var i = 0; i < myjsonobj.hobbies.length; i++){ 
      
          if ( myjsonobj.hobbies[i] === '' ||  myjsonobj.hobbies[i] === '-' ||  myjsonobj.hobbies[i] === 'N/A') { 
      
              myjsonobj.hobbies.splice(i, 1); 
          }
      
        }
  
        console.log(myjsonobj);
        return res.send(myjsonobj);

      } else {
        return res.send("something went wrong.");
      }
    } catch (err) {
      console.error(err);
      return res.send(err);
    }
    


});

module.exports = router;
