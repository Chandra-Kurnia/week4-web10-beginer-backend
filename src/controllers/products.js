
const productModel = require('../models/products')

const getAllProduct = (req, res, next) => {
  productModel.getAllproduct()
  .then((result)=>{
    const products = result
    res.status(200)
    res.json({
      message: 'success',
      data: products
    })
  })
  .catch((error)=>{
    console.log(error);
    res.status(500)
    res.json({
      message: 'internal server error'
    })
  })
}

const insertProduct = (req, res, next)=>{
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const {name, price, description} = req.body
  const data = {
    name: name,
    price: price,
    description: description,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  productModel.insertProduct(data)
  .then(()=>{
    res.json({
      message: 'data berhasil di insert',
      data: data
    })
  })
  .catch((error)=>{
    console.log(error);
    res.status(500)
    res.json({
      message: 'internal server error'
    })
  })
} 


const updateProduct = (req, res) => {
  // const name = req.body.name
  // const price = req.body.price
  // const description =req.body.description
  const id = req.params.id
  const { name, price, description } = req.body
  const data = {
    name: name,
    price: price,
    description: description,
    updatedAt: new Date()
  }
  productModel.updateProduct(id, data)
    .then(() => {
      res.json({
        message: 'data berhasil di insert',
        data: data
      })
    })
    .catch((error) => {
      console.log(error);
      res.status(500)
      res.json({
        message: 'internal server error'
      })
    })
}

const deleteProduct = (req, res)=>{
  const id = req.params.id
  productModel.deleteProduct(id)
  .then(()=>{
    res.status(200)
    res.json({
      message: 'data berhasil di hapus',
    })
  })
  .catch((err)=>{
    console.log(err);
    res.status(500)
    res.json({
      message: 'internal server error'
    })
  })
}
module.exports = {
  getAllProduct,
  insertProduct,
  updateProduct,
  deleteProduct
}