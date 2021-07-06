const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const productRouter = require('./src/routes/products')
const userRouter = require('./src/routes/users')
const morgan = require('morgan')

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
// my middleware
const myMiddleware = (req, res, next) => {
  console.log('my middleware di jalankan ');
  next()
}

app.use(myMiddleware)

app.use('/products', productRouter)
app.use('/users', userRouter)

app.use('*', (req, res)=>{
  res.status(404).json({
    message: 'url not found'
  })
})




// app.get('/', (req, res)=>{
// res.send('<h1>hello world</h1>')
// })

// app.use('/coba', (req, res)=>{
//   res.send('hello wolrd')
// })

// app.get('/product', (req, res) => {
//     res.json({
//       name: 'sepeda',
//       price: 4000
//     })
// })

// app.post('/product', (req, res)=>{
//   const name = req.body.name
//   const price = req.body.price
//   // console.log(data);

//   res.json({
//     message: "success data terkirim dengan name "+name+" dan price "+price 
//   })
// })

// app.put('/product', (req, res) => {
//   const name = req.body.name
//   const price = req.body.price
//   // console.log(data);

//   res.json({
//     message: "success data terkirim dengan name " + name + " dan price " + price
//   })
// })

// app.get('/about/:nomor', (req, res) => {
//   const id = req.params.nomor
//   const name = req.query.name
//   const email = "risano@gmail.com"
//   res.send('about page ke ' + id + 'dan nama saya ' + name)
// })

app.listen(4000, ()=>{
  console.log('server is running on port 4000');
})