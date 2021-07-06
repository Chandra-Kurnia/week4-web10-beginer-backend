const express = require('express')
const router = express.Router()

  router.post('/register', (req, res)=>{
    const data = req.body
    res.send('ini register')
  })
  router.post('/login', (req,res)=>{
    res.send('ini login')
  })

module.exports = router