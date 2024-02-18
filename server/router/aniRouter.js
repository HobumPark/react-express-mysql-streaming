const express = require('express')
const router = express.Router()
const db = require('./config/db.js')
const bodyParser = require('body-parser')
router.use(bodyParser.json());

router.get('/total', function (req, res) {
    const page=req.query.page
    const idx=(page-1)*12
    db.query(`select * from animation_total_list limit ${idx},12`,(err,data)=>{
        if(!err){
          res.send(data)
        }else{
          console.log(err)
        }
    })
});

router.get('/count', function (req, res) {
  db.query(`select count(*) as cnt from animation_total_list`,(err,data)=>{
      if(!err){
        res.send(data)
      }else{
        console.log(err)
      }
  })
});

router.post('/filter', function (req, res) {
  console.log('/filter');
  console.log(req.body);
  console.log(req.body.genreFilter);
  console.log(req.body.tagFilter);
  console.log(req.body.yearFilter);
  const genreFilter=req.body.genreFilter;
  const tagFilter=req.body.tagFilter;
  const yearFilter=req.body.yearFilter;

  let genreFilterStr='';
  let tagFilterStr='';
  let yearFilterStr='';
  let fullFilterStr='';
  //용자,추리,드라마,무협
  //가족,감동,동물
  //genre like '%용자%' or '%추리%' or '%드라마%' or '%무협%'
  //tag like '%가족%' or '%감동%' or '%동물%'
  for(var i=0; i<genreFilter.length; i++){
    if(i===0){
      if(genreFilter.length === 1){
        genreFilterStr=(`genre like '%${genreFilter[i]}%'`)
      }else{
        genreFilterStr=(`genre like '%${genreFilter[i]}%' or `)
      }
    }else if(i===genreFilter.length-1){
      genreFilterStr+=(`genre like '%${genreFilter[i]}%'`)
    }else {
      genreFilterStr+=(`genre like '%${genreFilter[i]}%' or `)
    }
  }
  console.log(genreFilterStr)

  for(var i=0; i<tagFilter.length; i++){
    if(i===0){
      if(tagFilter.length === 1){
        tagFilterStr=(`tag like '%${tagFilter[i]}%'`)
      }else{
        tagFilterStr=(`tag like '%${tagFilter[i]}%' or `)
      }
    }else if(i===tagFilter.length-1){
      tagFilterStr+=(`tag like '%${tagFilter[i]}%'`)
    }else{
      tagFilterStr+=(`tag like '%${tagFilter[i]}%' or `)
    }
  }
  console.log(tagFilterStr)
  
  const yearFromNum=yearFilter[0]+"-01-01";
  const yearToNum=yearFilter[1]+"-12-31";
  yearFilterStr = `animation_year between '${yearFromNum}' and '${yearToNum}'`;
  console.log('yearFilterStr')
  console.log(yearFilterStr)

  if(genreFilter.length !==0 && tagFilter.length !==0){
    console.log('version1')

    if(yearFilter.length !==0){
      console.log('version1-1')
      db.query(`select * from animation_total_list where ${genreFilterStr} or ${tagFilterStr} and ${yearFilterStr}`,(err,data)=>{
        if(!err){
          console.log(data)
          res.send(data)
        }else{
          console.log(err)
        }
      })
    }else{
      db.query(`select * from animation_total_list where ${genreFilterStr} or ${tagFilterStr}`,(err,data)=>{
        if(!err){
          console.log(data)
          res.send(data)
        }else{
          console.log(err)
        }
      })
    }

  }else if(genreFilter.length !==0 && tagFilter.length ===0){
    console.log('version2')
    db.query(`select * from animation_total_list where ${genreFilterStr}`,(err,data)=>{
      if(!err){
        console.log(data)
        res.send(data)
      }else{
        console.log(err)
      }
    })
  }else if(genreFilter.length ===0 && tagFilter.length !==0){
    console.log('version3')
    db.query(`select * from animation_total_list where ${tagFilterStr}`,(err,data)=>{
      if(!err){
        console.log(data)
        res.send(data)
      }else{
        console.log(err)
      }
    })
  }
 
});

router.get('/total/search', function (req, res) {
  //const id = req.query.id
  console.log(req.query);
  const searchText = req.query.searchText
  const idx=0;
  console.log('/total/search');
  db.query(`select * from animation_total_list where animation_title like '%${searchText}%' limit ${idx},12`,(err,data)=>{
    if(!err){
      res.send(data)
    }else{
      console.log(err)
    }
})

});


router.get('/info', function (req, res) {
  //const id = req.query.id
  console.log('/ani/info');
  console.log(req.query);
  const id= req.query.id
  
  db.query(`select * from animation_total_list where id=${id}`,(err,data)=>{
    if(!err){
      res.send(data)
    }else{
      console.log(err)
    }
})

});



router.get('/one', function (req, res) {
  const id = req.query.id

  db.query(`select * from animation_one_list where id=${id}`,(err,data)=>{
      if(!err){
        console.log(data)
        res.send(data)
      }else{
        console.log(err)
      }
  })
});

router.get('/music', function (req, res) {
  console.log('/music')
  const id = req.query.id

  db.query(`select * from animation_music where id=${id}`,(err,data)=>{
      if(!err){
        console.log(data)
        res.send(data)
      }else{
        console.log(err)
      }
  })
});

router.get('/story', function (req, res) {
  const id = req.query.id

  db.query(`select * from animation_story where id=${id}`,(err,data)=>{
      if(!err){
        console.log(data)
        res.send(data)
      }else{
        console.log(err)
      }
  })
});

router.get('/character', function (req, res) {
  const id = req.query.id

  db.query(`select * from animation_character where id=${id}`,(err,data)=>{
      if(!err){
        console.log(data)
        res.send(data)
      }else{
        console.log(err)
      }
  })
});


module.exports = router