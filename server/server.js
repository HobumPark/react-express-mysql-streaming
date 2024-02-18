const express = require('express')
const app = express()
const port = 4000

//const socketIO = require('socket.io');
const http = require('http');
const server = http.createServer(app);
//const io = socketIO(server);

const slideRouter = require('./router/slideRouter');
const aniRouter = require('./router/aniRouter');
const docuRouter = require('./router/docuRouter');
const boardRouter = require('./router/boardRouter');
const memberRouter = require('./router/memberRouter');
const chatRouter = require('./router/chatRouter');

app.use('/api/slide',slideRouter);
app.use('/api/ani',aniRouter);
app.use('/api/docu',docuRouter);
app.use('/api/board',boardRouter);
app.use('/api/member',memberRouter);
app.use('/api/chat',chatRouter);
/*
var socket = io.connect(`http://localhost:4000`,{
  cors: { origin: '*' }
});
*/
// Socket.io 연결
/*
io.on('connection', (socket) => {
    console.log('사용자가 연결되었습니다.');
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`A client connected:${ip}`);
    console.log(`${req}`);
    console.log(`${ip}`);
    console.log(`socket.id:${socket.id}`)
    
    // 클라이언트에서 메시지를 받으면 다시 해당 클라이언트에게 전송
    socket.on('message', (message) => {
      console.log('받은 메시지:', message);
  
      // 받은 메시지를 해당 클라이언트에게 다시 전송
      socket.emit('message', `${message}`);
      socket.broadcast.emit('message', `${message}`);//나를 제외한 모든 클라이언트에게 전송
    });
  
    // 연결이 끊어졌을 때의 이벤트
    socket.on('disconnect', () => {
      console.log('사용자가 연결 해제');
    });
});
*/

server.listen(port,()=>{
    console.log(`Example App Listening on port ${port}`);
})