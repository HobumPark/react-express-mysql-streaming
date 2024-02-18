import {useEffect,useState} from 'react';
import '../../../css/board/notice/NoticeBoardMain.css';
import axios from 'axios';
import NoticeBoard from './NoticeBoard';

function NoticeBoardMain(){
    const [noticeBoard,setNoticeBoard]=useState([{id:1}])
    const [total,setTotal]=useState('')
    const [currentPage,setCurrentPage]=useState(1)

    useEffect(()=>{
        getNoticeBoardData()
        getNoticeBoardCount()
    },[])

    const getNoticeBoardData=async()=>{
        await axios.get('/api/board/notice?page=1').then(response => {
            console.log(response);
            setNoticeBoard(response.data)
        })
          .catch(error => {
            console.error(error);
        })
    }

    const getNoticeBoardCount=async()=>{
        await axios.get('/api/board/notice/count').then(response => {
            console.log(response);
            console.log(response.data);
            console.log(response.data[0].cnt);
            setTotal(response.data[0].cnt)
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
        const endPage = Math.ceil(parseInt(total)/3)
        if(currentPage+1 > endPage){
            alert('이동불가!')
        }else{
            pageClick(currentPage+1)
        }
    }

    const pageClick=async(page:any)=>{
        await axios.get(`/api/board/notice?page=${page}`).then(response => {
            console.log(response);
            setNoticeBoard(response.data)
        })
          .catch(error => {
            console.error(error);
        })
        setCurrentPage(page)
    }

    const noticeMap = noticeBoard.map(
        (data:any)=>(<NoticeBoard key={data.no} no={data.no} title={data.title}
                        writer={data.writer} write_date={data.write_date} 
                        attach={data.attach} hits={data.hits}/>)
    )
    const endPage = Math.ceil(parseInt(total)/3)
    let pageNumbers: number[]=[]
    //1~10 (1~9)
    //11~20 (11~19)
    //parseInt(currentPage/10) -> 0, 1
    //currentPage%10
    //1~3
    //4~6
    for(var i=0; i<=9; i++){
        var num = Number(currentPage/10)
        num = Math.floor(num)
        console.log(num)
        const cur=10*(num)+i
        if(cur===0){
            continue;
        }
        if(cur>endPage){
            break
        }
        console.log(cur)
        pageNumbers.push(cur)
    }
    
    const pageMap = pageNumbers.map(
        (page)=>(<span id='page' 
        onClick={()=>pageClick(page)}
        className={page===currentPage? 'active':''}>{page}</span>)
    )

    return(
        <div id='notice-board-main'>
            <div id='notice-board-list'>
                <div id='notice-label'>
                    <span>번호</span>
                    <span>제목</span>
                    <span>글쓴이</span>
                    <span>날짜</span>
                    <span>파일</span>
                    <span>조회수</span>
                </div>
                {noticeMap}
            </div>
            <div id='notice-pagination'>
                <div id='notice-pagination-inner'>
                    <span id='page' onClick={prevPage}>&lt;</span> 
                        {pageMap}
                    <span id='page' onClick={nextPage}>&gt;</span>
                </div>
            </div>
        </div>
    )
}

export default NoticeBoardMain;