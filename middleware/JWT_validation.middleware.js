const jwt = require('jsonwebtoken');

exports.JWT_validation = async (req,res,next) => {
    
    try{
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
            return res.status(422).json({error: true, statuscode: 0, message: "Please provide the token",});
        }
        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, 'the-super-strong-secrect');
        if(decoded.user_id > 0) {
            req.body.userData = decoded;
            next();
            //return res.send({ error: false, statuscode: 0, message: decoded });
        } else {
            return res.send({ error: true, statuscode: 0, message: decoded });
        }
    }
    catch(err) {
        return res.send({ error: true, statuscode: 0, data: err });
    }
}
// 

