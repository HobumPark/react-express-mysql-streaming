const express = require('express')
const router = express.Router()
const db = require('./config/db.js')

router.get('/total', function (req, res) {
    db.query(`select * from documentary_total_list`,(err,data)=>{
        if(!err){
          res.send(data)
        }else{
          console.log(err)
        }
    })
});

router.get('/one', function (req, res) {
  const id = req.query.id

  db.query(`select * from documentary_one_list where id=${id}`,(err,data)=>{
      if(!err){
        console.log(data)
        res.send(data)
      }else{
        console.log(err)
      }
  })
});

module.exports = router