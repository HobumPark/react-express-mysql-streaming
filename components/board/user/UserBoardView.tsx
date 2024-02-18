import {useEffect,useState} from 'react';
import '../../../css/board/user/UserBoardView.css';
import axios from 'axios';
import queryString from 'query-string';
import moment from 'moment';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UserBoardComment from './UserBoardComment';
import download from 'downloadjs';

interface Board {
    no:number;
    title: string;
    contents: string;
    writer: string;
    write_date: string;
    attach: string;
    file_name:string;
    hits: number;
}

function UserBoardView(){
    const [userBoard,setUserBoard]=useState<Board|null>(null)
    const [edit,setEdit]=useState(false)
    const [no,setNo]=useState<any>(0)
    const [userBoardComment,setUserBoardComment]=useState([])
    const [commentInput, setCommentInput]=useState('');

    useEffect(()=>{
        const queryObj = queryString.parse(window.location.search)
        const no = queryObj.no
        setNo(no)
        getUserBoardView(no)
        getUserBoardCommentList(no);
    },[])

    const getUserBoardView=async(no:any)=>{
        await axios.get(`/api/board/user/view?no=${no}`).then(response => {
            console.log(response);
            setUserBoard(response.data[0])
        })
          .catch(error => {
            console.error(error);
        })
    }   

    const getUserBoardCommentList=async(no:any)=>{
        await axios.get(`/api/board/user/comment?no=${no}`).then(response => {
            console.log(response);
            const tempCommentList=response.data;
            const length = tempCommentList.length;
            
            for(var i=0; i<length; i++){
                tempCommentList[i].write_date
                =moment(tempCommentList[i].write_date).format('YYYY-MM-DD hh:mm')
            }

            setUserBoardComment(tempCommentList)
        })
          .catch(error => {
            console.error(error);
        })
    }

    const boardUpdate=async()=>{
        alert('수정!')
        const updateData={title:'asdf',contents:'qwer'}
        if(edit===true){
            await axios.put(`/api/board/user?no=${no}`,updateData).then(response => {
                console.log(response);
                
            })
            .catch(error => {
                console.error(error);
            })
        }
        setEdit(!edit)
    }

    const boardDelete=async()=>{
        alert('삭제!')
        await axios.delete(`/api/board/user?bno=${no}`).then(response => {
            console.log(response);
            setUserBoard(response.data)
        })
        .catch(error => {
            console.error(error);
        })
    }

    const addComment=async()=>{
        alert('댓글 추가!');
        alert(commentInput);
        const currentDate = moment().format('YYYY-MM-DD hh:mm');
        const commentInfo={bno:no,id:'qwer1234',writer:'송중기',contents:commentInput,write_date:currentDate}
        await axios.post(`/api/board/user/comment`,commentInfo).then(response => {
            console.log(response);
            setUserBoard(response.data)
        })
        .catch(error => {
            console.error(error);
        })
    }
    
    const handleInputComment=(e:any)=>{
        setCommentInput(e.target.value);
    }

    const handleFileDown=async()=>{
        alert('파일 다운로드!');
        let fileNameHTML=document.getElementById('file-name');
        let fileName='';
        if(fileNameHTML !== null){
            fileName=fileNameHTML.innerText;
        }
        
        await axios.get(`/api/board/user/download/${fileName}`,{
            responseType: 'blob' }).then(
            response => {
                download(response.data, fileName);
        })
        .catch(error => {
            console.error(error);
        })
    }

    const handleFileDelete=async()=>{
        alert('파일삭제');
        let fileNameHTML=document.getElementById('file-name');
        let fileName='';
        if(fileNameHTML !== null){
            fileName=fileNameHTML.innerText;
        }
        await axios.get(`/api/board/user/delete/${fileName}`)
        .then(
            response => {
                console.log(response);
                console.log('userBoard');
                console.log(userBoard);
                let tempUserBoard = userBoard;
                if(tempUserBoard !== null){
                    tempUserBoard.attach='N';
                    console.log('tempUserBoard');
                    console.log(tempUserBoard);
                    setUserBoard(tempUserBoard);
                }
        })
        .catch(error => {
            console.error(error);
        })
    }

    const userboardCommentMap = userBoardComment.map(
        (data:any)=>(<UserBoardComment 
            id={data.id}
            write_date={data.write_date}
            contents={data.contents}/>)
    )
    if(userBoard===null){
        return(
            <div id='user-board-view'>
            </div>
        )
    }else{
        return(
            <div id='user-board-view'>
                <div id='user-board-view-inner'>
                    <div id='user-board-title'>
                        <div id='user-board-title-top'>
                            <span>{userBoard.no}</span>
                            {
                                edit===false?
                                <span id='title'>{userBoard.title} </span>:
                                <span><input type='text' defaultValue={userBoard.title}/></span>
                            }
                            
                        </div>
                        <div id='user-board-title-bottom'>
                            <span><b>작성자:</b> {userBoard.writer} </span>
                            <span><b>작성일:</b> {moment(userBoard.write_date).format('YYYY-MM-DD')} </span>
                            <span><b>첨부여부:</b> {userBoard.attach} </span>
                            <span><b>조회수:</b> {userBoard.hits} </span>
                            <span>
                                <button onClick={boardUpdate}>수정</button>
                                <button onClick={boardDelete}>삭제</button>
                            </span>
                        </div>
                        <div id='user-board-title-file'>
                            <span>
                                <b>첨부파일:</b> 
                                {
                                    userBoard.attach==='Y'?
                                    <span id='file-name' onClick={handleFileDown}>
                                        {userBoard.file_name}
                                    </span>    
                                    :
                                    <span id='no-file'>없음</span>
                                }
                                {
                                    userBoard.attach==='Y'?
                                    <button id='file-del-btn' onClick={handleFileDelete}>삭제</button>
                                    :''
                                }
                            </span>
                        </div>
                    </div>
                    <div id='user-board-contents'>
                        {
                        edit===false?
                        <div id='user-board-contents-inner'>
                            {userBoard.contents}
                        </div> :    <CKEditor
                                     editor={ClassicEditor}
                                     data={userBoard.contents}
                                     onReady={(editor) => {
                                       // You can store the "editor" and use when it is needed.
                                       console.log("Editor is ready to use!", editor);
                                     }}/>
                        }
                    </div>
                    <div id='user-board-comment-list'>
                        <div id='user-board-comment-input'>
                            <input type='text' id='comment-input' placeholder='댓글을 입력하세요'
                            onChange={handleInputComment}/>
                            <button onClick={addComment}>입력</button>
                        </div>
                        {
                            userboardCommentMap
                        }
                    </div>
                    <div id='user-board-prev-next'>
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

export default UserBoardView;