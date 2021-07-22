const express = require('express')
const route = express.Router()
const productRouter = require('./products')
const userRouter = require('./users')
const multer = require('../middlewares/multer')
// app.use('/products', productRouter)
// app.use('/users', userRouter)
route
  .use('/products', productRouter)
  .use('/users', userRouter)

module.exports = route