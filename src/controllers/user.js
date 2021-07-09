const userModels = require('../models/users')
const { v4: uuidv4 } = require('uuid');
const helpers = require('../helpers/helpers')
const createError = require('http-errors')

const insertUser = (req, res, next) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const { name, email, password } = req.body
  const data = {
    id: uuidv4(),
    name: name,
    email: email,
    password: password,
  }

  userModels.insertUser(data)
    .then((result) => {
      helpers.response(res, {id: data.id}, 200)
    })
    .catch((error) => {
      console.log(error);

      helpers.response(res, null, 500, { message: 'internal server error' })
    })
}

module.exports = {
  insertUser
}