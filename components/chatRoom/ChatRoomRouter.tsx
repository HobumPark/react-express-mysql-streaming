import '../../css/chatRoom/ChatRoomRouter.css'

import {Routes, Route} from 'react-router-dom';
import FreeChatRoomMain from './FreeChatRoomMain';
import UserChatRoomMain from './UserChatRoomMain';

function ChatRoomRouter(){
    return(
        <div id='chat-room-router'>
            <Routes>
                <Route path='/free' element={<FreeChatRoomMain/>}/>
                <Route path='/user' element={<UserChatRoomMain/>}/>
            </Routes>
        </div>
    )
}

export default ChatRoomRouter;