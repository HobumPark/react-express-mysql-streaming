import '../../css/aniBoard/AniBoardRouter.css'
import {Routes, Route} from 'react-router-dom';
import AniBoardTotalList from './AniBoardTotalList';
import AniBoardOneList from './AniBoardOneList';
import AniBoardView from './AniBoardView';
import AniBoardGoodsList from './AniBoardGoodsList';
import AniBoardGoodsView from './AniBoardGoodsView';
import AniBoardStoryView from './AniBoardStoryView';
import AniBoardMusicView from './AniBoardMusicView';

function AniBoardRouter(){
    return(
        <div id='ani-board-router'>
            <Routes>
                <Route path='/total' element={<AniBoardTotalList/>}/>
                <Route path='/one' element={<AniBoardOneList/>}/>
                <Route path='/view' element={<AniBoardView/>}/>
                <Route path='/story/view' element={<AniBoardStoryView/>}/>
                <Route path='/music/view' element={<AniBoardMusicView/>}/>
                <Route path='/goods/list' element={<AniBoardGoodsList/>}/>
                <Route path='/goods/view' element={<AniBoardGoodsView/>}/>
            </Routes>
        </div>
    )
}

export default AniBoardRouter;