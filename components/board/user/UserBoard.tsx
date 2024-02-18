import {useEffect,useState} from 'react';
import '../../../css/board/user/UserBoard.css';
import moment from 'moment'

function UserBoard(props:any){

    useEffect(()=>{

    },[])

    return(
        <div id='user-board'>
            <span>
                {props.no}
            </span>
            <span>
                <a href={`/board/user/view?no=${props.no}`}>{props.title}</a>
            </span>
            <span>{props.writer}</span>
            <span>{moment(props.write_date).format('YYYY-MM-DD')}</span>
            <span>{props.attach}</span>
            <span>{props.hits}</span>
        </div>
    )
}

export default UserBoard;