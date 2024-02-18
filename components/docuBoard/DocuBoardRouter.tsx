import '../../css/docuBoard/DocuBoardRouter.css'
import {Routes, Route} from 'react-router-dom';
import DocuBoardTotalList from './DocuBoardTotalList';
import DocuBoardOneList from './DocuBoardOneList';
import DocuBoardView from './DocuBoardView';

function DocuBoardRouter(){
    return(
        <div id='docu-board-router'>
            <Routes>
                <Route path='/total' element={<DocuBoardTotalList/>}/>
                <Route path='/one' element={<DocuBoardOneList/>}/>
                <Route path='/view' element={<DocuBoardView/>}/>
            </Routes>
        </div>
    )
}

export default DocuBoardRouter;