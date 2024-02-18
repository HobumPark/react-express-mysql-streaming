const express = require('express')
const router = express.Router()
const db = require('./config/db.js')

const http = require('http');

router.use(express.json()); 
router.use(express.urlencoded( {extended : false } ));
router.io = require('socket.io')();

//자유 채팅방 접속
router.get('/free/connect', function (req, res) {
    router.io.on('connection',(socket) => {
        console.log('유저가 들어왔다');
      
        socket.on('disconnect', () => {
            console.log('유저 나갔다');
        });
      
        socket.on('chat-msg', (msg) => {
          app.io.emit('chat-msg', msg);
        });
      
      });

    res.send('/api/chat/free/connect response')
});

//유저 채팅방 접속
router.get('/user/connect', function (req, res) {
   
});

module.exports = router