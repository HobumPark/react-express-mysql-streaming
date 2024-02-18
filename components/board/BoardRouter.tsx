import '../../css/aniBoard/AniBoardRouter.css'
import {Routes, Route} from 'react-router-dom';
import NoticeBoardMain from './notice/NoticeBoardMain';
import NoticeBoardWrite from './notice/NoticeBoardWrite';
import NoticeBoardView from './notice/NoticeBoardView';
import UserBoardMain from './user/UserBoardMain';
import UserBoardWrite from './user/UserBoardWrite';
import UserBoardView from './user/UserBoardView';

function BoardRouter(){
    return(
        <div id='board-router'>
            <Routes>
                <Route path='/notice' element={<NoticeBoardMain/>}/>
                <Route path='/notice/write' element={<NoticeBoardWrite/>}/>
                <Route path='/notice/view' element={<NoticeBoardView/>}/>
                <Route path='/user' element={<UserBoardMain/>}/>
                <Route path='/user/write' element={<UserBoardWrite/>}/>
                <Route path='/user/view' element={<UserBoardView/>}/>
            </Routes>
        </div>
    )
}

export default BoardRouter;