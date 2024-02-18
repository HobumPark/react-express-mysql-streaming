const express = require('express')
const router = express.Router()
const db = require('./config/db.js')

router.get('/list', function (req, res) {
    db.query(`select * from rank_slide_list`,(err,data)=>{
        if(!err){
          res.send(data)
        }else{
          console.log(err)
        }
    })
});

router.get('/realtime', function (req, res) {
  db.query(`select * from popular_realtime`,(err,data)=>{
      if(!err){
        res.send(data)
      }else{
        console.log(err)
      }
  })
});

router.get('/view', function (req, res) {
  const id = req.query.id

  db.query(`select * from slide_list where id=${id}`,(err,data)=>{
      if(!err){
        console.log(data)
        res.send(data)
      }else{
        console.log(err)
      }
  })
});

module.exports = router