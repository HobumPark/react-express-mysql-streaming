import '../../css/bookBoard/BookBoardRouter.css'

import {Routes, Route} from 'react-router-dom';

function BookBoardRouter(){
    return(
        <div id='book-board-router'>
            <Routes>
                <Route path='/total' element={''}/>
                <Route path='/view' element={''}/>
            </Routes>
        </div>
    )
}

export default BookBoardRouter;