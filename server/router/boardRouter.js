const express = require('express')
const router = express.Router()
const db = require('./config/db.js')
const fs = require('fs');
const path = require('path');

router.use(express.json()); 
router.use(express.urlencoded( {extended : false } ));

const multer = require('multer');
const upload = require('./fileUploadAction');//업로드 기능을 가져옴


//공지사항 게시판
router.get('/notice', function (req, res) {
    const page = req.query.page
    const idx = (page-1)*3
    db.query(`select * from notice_board order by no desc limit ${idx},3 `,(err,data)=>{
        if(!err){
          res.send(data)    
        }else{
          console.log(err)
        }
    })
});

router.get('/notice/home', function (req, res) {
    db.query(`select * from notice_board order by no desc limit 0,7 `,(err,data)=>{
        if(!err){
          res.send(data)    
        }else{
          console.log(err)
        }
    })
});

router.get('/notice/view', function (req, res) {
  console.log('/notice/view')
  const no = req.query.no
  db.query(`select * from user_board where no=${no}`,(err,data)=>{
    if(!err){
      res.send(data)
    }else{
      console.log(err)
    }
  })
});

router.post('/notice', function (req, res) {
    res.send('/notice(post)')
    console.log(req.body)
    const {title,contents,writer,write_date,attach,hits}=req.body

    db.query(`insert into notice_board(title,contents,writer,write_date,attach,hits)
    values('${title}','${contents}','${writer}','${write_date}','${attach}',${hits})`,(err,data)=>{
      if(!err){
        res.send(data)
      }else{
        console.log(err)
      }
    })
});
router.put('/notice', function (req, res) {
  console.log('/notice(put)')
  console.log(req.body)
  const {title,contents}=req.body
  db.query(`update user_board title='${title}', contents='${contents}' where no=${no}`,(err,data)=>{
    if(!err){
      res.send(data)    
    }else{
      console.log(err)
    }
  })
});
router.delete('/notice', function (req, res) {
    res.send('/notice(delete)')
});

router.get('/notice/count', function (req, res) {
    db.query(`select count(*) as cnt from notice_board`,(err,data)=>{
        if(!err){
          res.send(data)    
        }else{
          console.log(err)
        }
    })
});

//사용자 게시판
router.get('/user', function (req, res) {
    const page = req.query.page
    const idx = (page-1)*10
    db.query(`select * from user_board order by no desc limit ${idx},10 `,(err,data)=>{
        if(!err){
          res.send(data)    
        }else{
          console.log(err)
        }
    })
});

router.get('/user/home', function (req, res) {
    db.query(`select * from user_board order by no desc limit 0,7`,(err,data)=>{
        if(!err){
          res.send(data)
        }else{
          console.log(err)
        }
    })
});

router.get('/user/view', function (req, res) {
  console.log('/user/view')
  const no = req.query.no
  db.query(`select * from user_board where no=${no}`,(err,data)=>{
    if(!err){
      res.send(data)
    }else{
      console.log(err)
    }
  })
});

router.post('/user', function (req, res) {
  console.log('user board write')
  console.log(req.body)
  const {title,contents,writer,write_date,attach,fileName,hits}=req.body
  res.send('/user(post)')
  /*
  db.query(`insert into user_board(title,contents,writer,write_date,attach,file_name,hits)
  values('${title}','${contents}','${writer}','${write_date}','${attach}','${fileName}',${hits})`,(err,data)=>{
    if(!err){
      res.send(data)
    }else{
      console.log(err)
    }
  })
  */
  
});

/* 파일업로드 (글쓰기 파일 전송) */
router.post('/upload', function (req, res, next) {
  console.log('/upload')
  console.log(req);

  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return next(err);
    } else if (err) {
      return next(err);
    }
    console.log('등록시간 : ' + req.addtime)
    console.log('저장파일명 : ' + req.file.filename)
    console.log('크기 : ' + req.file.size)
    return res.json({success:1,savefile:req.file.filename});
  });

});


/* 파일다운로드 (글상세보기 파일 다운로드) */
router.get('/user/download/:fileName', function (req, res) {
    console.log('/user/download/:fileName')
    const currentDirectory = __dirname
    console.log(currentDirectory);

    console.log(req.params.fileName)
    const fileName=req.params.fileName
    const file=path.join(__dirname,`\\..\\uploads\\${fileName}`);
    console.log(file)
    //var mimetype = mime.getType(file);
    //console.log(mimetype)

    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    //res.setHeader('Content-Type', 'txt');
    res.sendFile(file);
    //res.download(file); // Set disposition and send it.
});

//파일삭제
router.get('/user/delete/:fileName', function (req, res) {
  console.log('/user/delete/:fileName')
  console.log(req.params.fileName)
  const fileName=req.params.fileName
  const file=path.join(__dirname,`\\..\\uploads\\${fileName}`);
  console.log(file)

  fs.unlinkSync(file);
  res.send('file-delete-complete');
});

router.put('/user', function (req, res) {
    console.log(req.body)
    const {title,contents}=req.body
    db.query(`update user_board title='${title}', contents='${contents}' where no=${no}`,(err,data)=>{
      if(!err){
        res.send(data)    
      }else{
        console.log(err)
      }
    })
});

router.delete('/user', function (req, res) {
  const no = req.params.no
  db.query(`delete from user_board where no=${no}`,(err,data)=>{
    if(!err){
      res.send(data)    
    }else{
      console.log(err)
    }
  })
});

router.get('/user/count', function (req, res) {
    db.query(`select count(*) as cnt from user_board`,(err,data)=>{
        if(!err){
          res.send(data)    
        }else{
          console.log(err)
        }
    })
});

/*댓글관련*/
router.get('/user/comment', function (req, res) {
  console.log('/user/comment')
  const no = parseInt(req.query.no)
  console.log(no)
  db.query(`select * from user_board_comment where bno=${no}`,(err,data)=>{
      if(!err){
        res.send(data)    
      }else{
        console.log(err)
      }
  })
});

router.post('/user/comment', function (req, res) {
  console.log('/user/comment');
  console.log(req.body);

  res.send('/user/comment');
});

router.get('/user/reply', function (req, res) {
  const no = req.query.no
  db.query(`select * from user_board_reply where no=${no}`,(err,data)=>{
      if(!err){
        res.send(data)    
      }else{
        console.log(err)
      }
  })
});

module.exports = router