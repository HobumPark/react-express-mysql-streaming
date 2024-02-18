import {useEffect,useState} from 'react';
import '../../../css/board/user/UserBoardMain.css';
import UserBoard from './UserBoard';
import axios from 'axios';

function UserBoardMain(){
    
    const [userBoard,setUserBoard]=useState([])
    const [total,setTotal]=useState('')
    const [currentPage,setCurrentPage]=useState(1)

    useEffect(()=>{
        getUserBoardData()
   
    },[])

    const getUserBoardData=async()=>{
        await axios.get('/api/board/user?page=1').then(response => {
            console.log(response);
            setUserBoard(response.data)
        })
        .catch(error => {
            console.error(error);
        })
    }

    const prevPage=()=>{
        if(currentPage-1 < 1){
            alert('이동불가!')
        }else{
            pageClick(currentPage-1)
        }
    }

    const nextPage=()=>{
        if(currentPage+1 > 4){
            alert('이동불가!')
        }else{
            pageClick(currentPage+1)
        }
    }

    const pageClick=async(page:any)=>{
        await axios.get(`/api/board/user?page=${page}`).then(response => {
            console.log(response);
            setUserBoard(response.data)
        })
          .catch(error => {
            console.error(error);
        })
        setCurrentPage(page)
    }

    const boardWrite=()=>{
        window.location.href='/board/user/write'
    }

    const boardDelete=()=>{
        alert('삭제!')
    }

    const checkAll=()=>{
        alert("전체 선택!")
    }

    const userMap = userBoard.map(
        (data:any)=>(<UserBoard key={data.no} no={data.no} title={data.title}
            writer={data.writer} write_date={data.write_date} 
            attach={data.attach} hits={data.hits}/>)
    )
    let pageNumbers: number[]=[1,2,3]
    const pageMap = pageNumbers.map(
        (page)=>(<span id='page' 
        onClick={()=>pageClick(page)}
        className={page===currentPage? 'active':''}>{page}</span>)
    )

    return(
        <div id='user-board-main'>
            <div id='user-board-list'>
            <div id='user-label'>
                    <span>번호</span>
                    <span>제목</span>
                    <span>글쓴이</span>
                    <span>날짜</span>
                    <span>파일</span>
                    <span>조회수</span>
                </div>
                {userMap}
            </div>
            <div id='board-util'>
                <div id='check-all-wrap'>
                    
                </div>
                <div id='btn-wrap'>
                    <button onClick={boardDelete}>삭제</button>
                    <button onClick={boardWrite}>글쓰기</button>
                </div>
            </div>
            <div id='user-pagination'>
                <div id='user-pagination-inner'>
                    <span id='page' onClick={prevPage}>&lt;</span> 
                        {pageMap}
                    <span id='page' onClick={nextPage}>&gt;</span> 
                </div>
            </div>
        </div>
    )
}

export default UserBoardMain;