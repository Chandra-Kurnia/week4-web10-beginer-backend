require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const route = require('./src/routes/index')
const morgan = require('morgan')
const setCors = require('./src/middlewares/cors')
const cors = require('cors')
const port = process.env.PORT || 3500
const createError = require('http-errors')
// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
// my middleware
const myMiddleware = async(req, res, next) => {
  console.log('my middleware di jalankan ');
  const email = 'muhammadrisano@gamil.com'
  req.myemail = email
  // const error = new Error('ada error bro....')
  // throw error
  next()
}

app.use(myMiddleware)
// app.use(setCors)
app.use(cors())

app.use('/v1', route)
app.use('/file', express.static('./uploads'))

app.use('*', (req, res, next)=>{
  const error = new createError.NotFound()
  next(error)
  // res.status(404).json({
  //   message: 'url not found'
  // })
})



app.use((err, req, res, next)=> {
  console.error(err)
  res.status(err.status || 500).json({
    message: err.message || 'internal server Error'
  })
})

app.listen(port, ()=>{
  console.log(`server is running on port ${port}`);
})