import '../../css/aniBoard/AniBoardGoodsList.css';

function AniBoardGoodsList(){
    return(
        <div id='ani-board-goods-list-wrap'>
            <div id='ani-board-goods-list-wrap-inner'>
                <div id="search-tab">
                    <input type="text" placeholder="검색어 입력"/>
                    <button>검색</button>
                </div>
                <div className="goods-box-wrap">
                    
                </div>
            </div>
        </div>
    )
}

export default AniBoardGoodsList