import {useEffect,useState} from 'react';
import '../../../css/board/notice/NoticeBoard.css';
import moment from 'moment'

function NoticeBoard(props:any){

    useEffect(()=>{

    },[])

    return(
        <div id='notice-board'>
            <span>{props.no}</span>
            <span>
                <a href={`/board/notice/view?no=${props.no}`}>{props.title}</a>
            </span>
            <span>{props.writer}</span>
            <span>{moment(props.write_date).format('YYYY-MM-DD')}</span>
            <span>{props.attach}</span>
            <span>{props.hits}</span>
        </div>
    )
}

export default NoticeBoard;