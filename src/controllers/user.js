const userModels = require('../models/users')
const { v4: uuidv4 } = require('uuid');
const helpers = require('../helpers/helpers')
const createError = require('http-errors')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const common = require('../helpers/common')

const register = async (req, res, next) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const { name, email, password, phone } = req.body
  
  const user = await userModels.findUser(email)
  if (user.length >0){
    return helpers.response(res, null, 401, {message: 'email sudah ada'})
  }
  console.log(user);
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // Store hash in your password DB.
      console.log(hash);
      const data = {
        id: uuidv4(),
        name: name,
        email: email,
        password: hash,
        phone: phone,
        status: 0,
      }

      userModels.insertUser(data)
        .then((result) => {
          delete data.password
          // verifikasi user via email
         
          jwt.sign({ email: data.email }, process.env.SECRET_KEY, { expiresIn: '12h' }, function (err, token) {
            common.sendEmail(data.email, token)
            helpers.response(res, user, 200)
          });
          helpers.response(res, data , 200)
        })
        .catch((error) => {
          console.log(error);
          helpers.response(res, null, 500, { message: 'internal server error' })
        })
    });
  });
}

const login = async (req, res, next)=>{
  const {email, password} = req.body
  const result = await userModels.findUser(email)
  const user = result[0]
  bcrypt.compare(password, user.password, function (err, resCompare) {
    if (!resCompare){
      return helpers.response(res, null, 401, { message: 'password wrong' })
    }
    // generate token
    jwt.sign({ email: user.email, role: '1' }, process.env.SECRET_KEY , { expiresIn: '24h'  }, function (err, token) {
      console.log(token);
      console.log(process.env.SECRET_KEY);
      delete user.password
      user.token = token
      helpers.response(res, user, 200)
    });


   
  });
} 
module.exports = {
  register,
  login
}