const dotenv = require('dotenv');
// Set path to .env file
dotenv.config({ path: './.env' });

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


//   const fetch_data = require('../controllers/fetch_data.controller');
//   router.get('/fetch_data_from_table/:table_name', JWT_validation, fetch_data.fetch_data_from_table);
  
//   ////////// http://localhost:2001/auth/fetch_data_from_table/company_master ////////
//  // router.get('/fetch_data_from_table/:table_name/:field_name/:unique_id', fetch_data.table_name_field_name_unique_id);
//   //////// http://localhost:2000/api/fetch_data_from_table/hospital_master/company_id/5 //////////

//   //http://localhost:2001/auth/add_company

//   const company_hospital = require('../controllers/company_hospital.controller');
//   router.get('/fetch_company_master', JWT_validation, company_hospital.fetch_company_master);
//   router.post('/add_company', JWT_validation, company_hospital.add_company);
//   router.post('/get_company_data', JWT_validation, company_hospital.get_company_data);
//   router.post('/delete_company', JWT_validation, company_hospital.delete_company);


// let myjsonobj = {
//   "name": {
//   "first": "Robert",
//   "middle": "",
//   "last": "Smith"
//   },
//   "age": 25,
//   "DOB": "-",
//   "hobbies": [
//   "running",
//   "coding",
//   "-"
//   ],
//   "education": {
//   "highschool": "N/A",
//   "college": "Yale"
//   }
//   }
//   Object.keys(myjsonobj).forEach(function(key){
//     if (myjsonobj[key] === '' || myjsonobj[key] === '-' || myjsonobj[key] === 'N/A') {
//       delete myjsonobj[key];
//     }
//   });
//   Object.keys(myjsonobj.name).forEach(function(key){
//     if (myjsonobj.name[key] === '' || myjsonobj.name[key] === '-' || myjsonobj.name[key] === 'N/A') {
//       delete myjsonobj.name[key];
//     }
//   });
//   Object.keys(myjsonobj.education).forEach(function(key){
//     if (myjsonobj.education[key] === '' || myjsonobj.education[key] === '-' || myjsonobj.education[key] === 'N/A') {
//       delete myjsonobj.name[key];
//     }
//   });
//   console.log(myjsonobj.hobbies.length);
//   for( var i = 0; i < myjsonobj.hobbies.length; i++){ 
      
//           if ( myjsonobj.hobbies[i] === '-') { 
      
//               myjsonobj.hobbies.splice(i, 1); 
//           }
      
//       }
  
//   console.log(myjsonobj);
module.exports = router;