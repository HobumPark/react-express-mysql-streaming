import {useEffect,useState} from 'react';
import '../../../css/board/user/UserBoardComment.css';

function UserBoardComment(props:any){

    const [edit,setEdit]=useState(false);

    useEffect(()=>{

    },[])

    const commentUpdate=()=>{
        alert('댓글 수정!')
    }

    const commentDelete=()=>{
        alert('댓글 삭제!')
    }

    return(
        <div id='user-board-comment'>
            <div id='user-board-comment-info'>
                <span>{props.id}</span>
                <span>{props.write_date}</span>
                <span>
                    <button onClick={commentUpdate}>수정</button> 
                    <button onClick={commentDelete}>삭제</button> 
                </span>
            </div>
            <div id='user-board-comment-contents'>
                {props.contents}
            </div>
            <div id='user-board-comment-reply-list'>
                <span>댓글 <b>0</b></span>
            </div>
        </div>
    )
}

export default UserBoardComment;

