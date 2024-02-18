import {useEffect,useState} from 'react';
import '../../../css/board/notice/NoticeBoardView.css';
import axios from 'axios';
import queryString from 'query-string';
import moment from 'moment';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface Board {
    no:number;
    title: string;
    contents: string;
    writer: string;
    write_date: string;
    attach: string;
    hits: number;
}

function NoticeBoardView(){

    const [noticeBoard,setNoticeBoard]=useState<Board|null>(null)
    const [edit,setEdit]=useState(false)
    const [no,setNo]=useState<any>(0)

    useEffect(()=>{
        const queryObj = queryString.parse(window.location.search)
        const no = queryObj.no
        setNo(no)
        getNoticeBoardView(no)
    },[])

    const getNoticeBoardView=async(no:any)=>{
        await axios.get(`/api/board/notice/view?no=${no}`).then(response => {
            console.log(response);
            setNoticeBoard(response.data[0])
        })
          .catch(error => {
            console.error(error);
        })
    }  

    const boardUpdate=async()=>{
        alert('수정!')
    }

    const boardDelete=async()=>{
        alert('삭제!')
    }

    if(noticeBoard===null){
        return(
            <div id='notice-board-view'>
            </div>
        )
    }else{
    return(
        <div id='notice-board-view'>
            <div id='notice-board-view-inner'>
                <div id='notice-board-title'>
                    <div id='notice-board-title-top'>  
                        <span>{noticeBoard.no}</span>
                    </div>
                    <div id='notice-board-title-bottom'>  
                        <span>{noticeBoard.writer} </span>
                        <span>{moment(noticeBoard.write_date).format('YYYY-MM-DD')} </span>
                        <span>{noticeBoard.attach} </span>
                        <span>{noticeBoard.hits} </span>
                        <span>
                            <button onClick={boardUpdate}>수정</button>
                            <button onClick={boardDelete}>삭제</button>
                        </span>
                    </div>
                </div>
                <div id='notice-board-contents'>
                    <div id='notice-board-contents-inner'>
                        {noticeBoard.contents}    
                    </div>
                </div>
                <div id='notice-board-prev-next'>
                    <div id='prev'>

                    </div>
                    <div id='next'>

                    </div>
                </div>
            </div>
        </div>
    )
    }
}

export default NoticeBoardView;