const express = require('express')
const router = express.Router()
const productController = require('../controllers/products')
// const mymiddle = (req, res, next)=>{
//   // res.send('hello ini middle saya')
//   console.log('saya mengolah data terlebih dahulu');
//   // next()
// }
// const auth = (req, res, next)=>{
//   const authValid = true
//   if(authValid){
//     next()
//   }else{
//     res.json({
//       message: 'auth failed'
//     })
//   }
// }
router
  .get('/', productController.getAllProduct)
  .post('/', productController.insertProduct)
  .put('/:id', productController.updateProduct)
  .delete('/:id', productController.deleteProduct)

module.exports = router