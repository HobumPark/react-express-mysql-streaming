import '../../css/chatRoom/FreeChatRoomMain.css'
import {useState,useEffect} from 'react';
import axios from 'axios';
import { InputChangeEvent  } from '../../types'
import io from 'socket.io-client';

const socket = io('/'); // 서버 주소에 맞게 변경

function FreeChatRoomMain(){
    const [userName,setUserName]=useState('user123');
    const [chatWord,setChatWord]=useState('');
    const [receivedMessage, setReceivedMessage] = useState<string[]>([]);
    const [logs,setLogs]=useState([])

    useEffect(()=>{
        /*
        socket.emit('message', `${userName} 접속합니다!`);
        
         // 서버에서 메시지를 받으면 상태 업데이트
        socket.on('message', (message) => {
            console.log('서버응답');
            console.log(message);
            setReceivedMessage((prevLogs) => [...prevLogs, message]);
            console.log(receivedMessage);
        });
  
        // 컴포넌트가 언마운트될 때 소켓 이벤트 리스너 제거
        return () => {
            socket.off('message');
        };
        */
    },[])

    const freeChatRoomConnect=async()=>{
        console.log('freeChatRoomConnect')
        await axios.get('/api/chat/free/connect')
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.error(error);
        })
    }
    

    const handleChatInput=(e:InputChangeEvent)=>{
        setChatWord(e.target.value)
    }

    const sendChatWord=()=>{
        alert('전송!')
        socket.emit('message', chatWord);
        setChatWord('');
    }

    const messageMap=receivedMessage.map(
        (msg)=>(<div id='message'>{msg}</div>)
    )

    return(
        <div id='free-chat-room-main'>
            <div id='free-chat-room-main-inner'>
                <div id='chat-contents-wrap'>
                    <div id='chat-contents-list'>
                        {messageMap}
                    </div>
                    <div id='chat-input-wrap'>
                        <input type='text' value={chatWord} onChange={handleChatInput}/>
                        <button onClick={sendChatWord}>전송</button>
                    </div>
                </div>
                <div id='chat-user-list'>
                    <div className="chat-user">
                        익명 유저
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FreeChatRoomMain;