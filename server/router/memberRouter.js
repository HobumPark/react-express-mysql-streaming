const express = require('express');
const router = express.Router();
const db = require('./config/db.js');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'my-secret-key';
const moment = require("moment");

router.use(express.json()); 
router.use(express.urlencoded( {extended : false } ));

router.post('/login', function (req, res, next) {
    console.log('/login')
    console.log(req.body)
    const {id,pw}=req.body
    console.log(id)
    console.log(pw)

    db.query(`select pw from member where id='${id}'`,(err,data)=>{
        if(!err){
          console.log(data)
          if(data.length===0){
            console.log('아이디가 없음!')
            res.status(401).json({ status : 401, message : "id not found"})
            return
          }

          console.log(data[0].pw)

          if(pw === data[0].pw){
            console.log('비밀번호 일치!')
            next() //다음 함수로 넘겨서 토큰 발급 진행
          }else if(pw !== data[0].pw){
            console.log('비밀번호 불일치!')
            res.status(402).json({ status : 402, message : "pw not correct"})
            return
          }
          
        }else{
          console.log(err)
        }
    })

    
},function(req, res){
    console.log('next')

    const id = req.body.id
    //jwt.sign(payload, secretOrPrivateKey, [options, callback])
    //액세스토큰
    const accesstoken = jwt.sign({
      type: 'JWT',
      id: id,
    }, SECRET_KEY, {
      expiresIn: '60s', // 만료시간 1시간
      issuer: 'phb',
    });

    console.log('accesstoken');
    console.log(accesstoken);

    res.status(200).json({ status : 200, message : "login success",accessToken:accesstoken})
});

router.post('/check/token',function(req,res){
  console.log('/check/token');
  console.log(req.body);
  const token =req.body.token;

  jwt.verify(token, "my-secret-key",(error, decoded) => {
    if(error) {
        console.error(error);
        res.status(402).json({ status : 402, message : "token verify failed"});
    }else{
      console.log(decoded);
      const id = decoded.id
      const exp = decoded.exp
      const iat = decoded.iat
      const current = new Date().getTime()/1000;
      console.log('current');
      console.log(current);
      console.log('exp');
      console.log(exp);
      if(current >= exp){
        console.log('액세스 토큰 만료됨!');
        res.status(403).json({ status : 403, message : "token expired"});
        //res.status(404).json({ status : 403, message : "token expired"});
        //주석처리하면 리프레시 토큰 확인
        //주석해제하면 액세스토큰 없으면 그냥 오류로 끝냄


      }else{
        console.log('액세스 토큰 아직 유효함!');

        let name = '';  
        db.query(`select name from member where id='${id}'`,(err,data)=>{
        if(!err){
          console.log(data);
          console.log(data[0].name);
          const name=data[0].name
          res.status(200).json({ status : 200, message : "token verify success",id:decoded.id,name:name,current:current,exp:exp});
          }else{
            console.log(err)
            res.status(404).json({ status : 404, message : "SQL failed"});
          }
        }) 

        //res.status(200).json({ status : 200, message : "token verified",exp:exp});
      }

      
      /* 
      db.query(`select timestampdiff(second, now(), expires_at) from refresh_tokens where id='${id}'`,(err,data)=>{
        if(!err){
          console.log(data);
          console.log(data[0].name);
          name = data[0].name;
          res.status(200).json({ status : 200, message : "token verify success",id:decoded.id,name:name});
        }else{
          console.log(err)
          res.status(404).json({ status : 404, message : "refresh token verify failed"});
        }
      }) 
      */
    }
  });
})

// /api/member/save/refresh
router.post('/save/refresh',function(req,res){
  console.log('/save/refresh');
  console.log(req.body);
  const id=req.body.id;
  console.log(id);
  //db - insert
  const created_at=moment().format("YYYY-MM-DD HH:mm:ss");
  console.log(created_at);

  const expires_at=moment().add(7,'days').format("YYYY-MM-DD HH:mm:ss")
  console.log(expires_at);


  //리프레시토큰-payload없이
  const token = jwt.sign({
    type: 'JWT',
  }, SECRET_KEY, {
    expiresIn: '7d', // 만료시간 7일
    issuer: 'phb',
  });

  console.log('refreshToken');
  console.log(token);
  
  db.query(`insert into refresh_tokens(user_id,token,expires_at,created_at) values('${id}','${token}','${expires_at}','${created_at}')`,(err,data)=>{
    if(!err){
      console.log(data);
      res.send(data)
    }else{
      console.log(err)
    }
  })  

  
})

router.post('/logout',function(req,res){
    console.log('/logout');
    console.log(req.body);
    const token=req.body.token;

    res.send('/logout');
})

router.get('/userInfo/:id',function(req,res){
  console.log('/userInfo/:id');
  const id = req.params.id;

  db.query(`select * from member where id='${id}'`,(err,data)=>{
    if(!err){
      console.log(data);
      res.send(data)
    }else{
      console.log(err)
    }
  })  

  //res.send('/userInfo');
})

router.post('/register', function (req, res) {
    res.send('/register')
    console.log('/login')
    console.log(req.body)
    const {id,pw,nickname,phone}=req.body
    console.log(id)
    console.log(pw)
    console.log(nickname)
    console.log(phone)

    db.query(`insert into member(id,pw,nickname,phone,email)
    values('${id}','${pw}','${nickname}','${phone}','${email}')`,(err,data)=>{
      if(!err){
        res.send(data)
      }else{
        console.log(err)
      }
    })
});

router.post('/id/duplicate', function (req, res) {
  console.log('/id/duplicate')
  console.log(req.body)
  const {id}=req.body
  console.log(id)
  db.query(`select count(*) as cnt from member where id='${id}'`,(err,data)=>{
    if(!err){
      res.send(data)
    }else{
      console.log(err)
    }
  })
});

router.post('/nickname/duplicate', function (req, res) {
  console.log('/nickname/duplicate')
  console.log(req.body)
  const {nickName}=req.body
  console.log(nickName)
  db.query(`select count(*) as cnt from member where nickname='${nickName}'`,(err,data)=>{
    if(!err){
      res.send(data)
    }else{
      console.log(err)
    }
  })
});

router.put('/update', function(req, res) {
    console.log('/update');
    console.log(req.body);
    res.send('/update');
});

router.delete('/delete', function (req, res) {
  
    res.send('/update')
});

module.exports = router