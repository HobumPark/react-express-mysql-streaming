import {useEffect,useState} from 'react';
import { InputChangeEvent } from '../../../types';
import '../../../css/board/user/UserBoardWrite.css';
import axios from 'axios';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import moment from 'moment';
import { useCookies } from 'react-cookie';

function UserBoardWrite(){
    const [name,setName]=useState<string>('');
    const [title,setTitle]=useState<string>('');
    const [contents,setContents]=useState<string>('');
    const [file, setFile] = useState<File|null>(null);
    const [fileName,setFileName]=useState<string>('');
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [id,setId]=useState('');
    const [isLoggedIn,setIsLoggedIn]=useState(false);

    useEffect(()=>{
        checkAccesToken();
    },[])

    const checkAccesToken=async()=>{
        console.log('checkAccesToken');
        const token = cookies.token; // 쿠키에서 id 를 꺼내기
        console.log(token);

        await axios.post('/api/member/check/token',{ token: token })
        .then(response => {
            console.log('토큰 유효함!');
            console.log(response);
            console.log(response.data.id);
            const id = response.data.id;
            const name = response.data.name;
            setIsLoggedIn(true);
            setId(id);
            setName(name);
        }).catch(error=>{
            console.log(error);
            removeCookie('token');
        
        })
    }


    const boardWrite=async(fileName:string)=>{
        alert('글쓰기!')

        const boardWrite
        ={title:title,contents:contents,writer:name,
        write_date:'2023-01-01',attach:'Y',fileName:fileName,hits:0}

        await axios.post(`/api/board/user`,boardWrite)
        .then(response => {
            console.log(response);
        })
          .catch(error => {
            console.error(error);
        })
    }

    const handleFileChange=(e:InputChangeEvent)=>{
        if(e.target.files !== null){
            console.log(e.target.files)
            const selectedFile = e.target.files[0];
            const fileName=e.target.files[0].name;
            
            alert(selectedFile);
            alert(fileName);
            
            setFile(selectedFile);
            setFileName(fileName);
        }
    }

    const fileUpload=async()=>{
             // FormData 객체 생성
             const formData = new FormData();
             if (file !== null) {
                 //alert('파일을 선택해주세요.');
                 formData.append('file', file);

                 await axios.post('/api/board/upload', formData)
                 .then(
                     response=>{
                         console.log(response);
                         console.log(response.data.savefile);
                         const fileName=response.data.savefile;
                         boardWrite(fileName)
                     }
                 )
                 .catch(error=>{
                     console.log(error);
                 })

             }else{
                boardWrite('')
             }
    }

    return(
        <div id='user-board-write'>
            <div id='user-board-write-inner'>
                <div id='user-board-write-title'>
                    <input type='text' placeholder='제목입력' 
                    onChange={e=>setTitle(e.target.value)}/>
                    <span id='writer'>{name}</span>
                    <button onClick={fileUpload}>등록</button>
                </div>
                <div id='user-board-write-contents'>
                    <CKEditor
                        editor={ClassicEditor}
                        data={contents}
                        onChange={(event, editor) => {
                            setContents(editor.getData());
                            console.log({ event, editor, contents });
                          }}
                        onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                            console.log("Editor is ready to use!", editor);
                        }}/>
                    <div id='file-attach-wrap'>
                        <input type='file' onChange={handleFileChange}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBoardWrite;