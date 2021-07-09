const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

  router.post('/register', userController.insertUser)
  router.post('/login', (req,res)=>{
    res.send('ini login')
  })

module.exports = router