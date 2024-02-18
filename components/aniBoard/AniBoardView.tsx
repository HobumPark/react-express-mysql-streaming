import '../../css/aniBoard/AniBoardView.css';
import {useEffect,useState} from 'react';
import axios from 'axios';
import queryString from 'query-string';
import ReactPlayer from 'react-player';

function AniBoardView(){

    const [no,setNo]=useState(0);
    const [title,setTitle]=useState('');
    const [file,setFile]=useState('');
    const [prev,setPrev]=useState('');
    const [next,setNext]=useState('');
    
    useEffect(()=>{
        const queryObj=queryString.parse(window.location.search);
        

        const temp=window.localStorage.getItem('total_video_list');

        if(temp!==null || queryObj!==null){

            const tempNo:any = (queryObj.no);
            let no=0;
            if(typeof(tempNo)==='string'){
                no = parseInt(tempNo);
            }

            const file:any = queryObj.file;
            
            setNo(no);
            setFile(file);

            if(typeof(temp)==='string'){
                const Obj:any=JSON.parse(temp);
                console.log(Obj);

                const length = Obj.length;
                const title:any = Obj[no-1].title;
                setTitle(title);

                if(Number(queryObj.no)===1){
                    alert('1번 영상');
                    setPrev('없음');
                    setNext(Obj[no].title);
                }else if(Number(queryObj.no)<length-1){
                    setPrev(Obj[no-2].title);
                    setNext(Obj[no].title);
                }else{
                    setPrev(Obj[no-2].title);
                    setNext('없음');
                }
            }         
        }
    },[])

    const movePrev=()=>{
        alert('이전!');
        window.location.href=`/ani/view?no=${no-1}&title=&file=dragon_ball_ep14&menu=1`
    }

    const moveNext=()=>{
        alert('다음!');
        window.location.href=`/ani/view?no=${no+1}&title=&file=dragon_ball_ep14&menu=1`
    }

    return(
        <div id='animation-view-wrap'>
            <div id='animation-view-wrap-inner'>
                <div id='animation-view'>
                    <div id='animation-view-title'>
                        {title}
                    </div>
                    <div id='animation-view-video'>
                        <ReactPlayer
                        className='react-player'
                        width='100%'
                        height='100%'
                        light={`/videos/dragon_ball/cover/dragon_ball_${no}.png`}
                        playing={true}
                        //url={`/videos/dragon_ball/dragon_ball_ep01.mpav 4`}
                        url={'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                        controls = {true}
                        />
                    </div>
                </div>
                <div id='prev-next-view'>
                    <span id='prev-view'>
                        <h1>이전화</h1>
                        <span onClick={movePrev}>
                        {prev}
                        </span>
                    </span>
                    <span id='next-view'>
                        <h1>다음화</h1>
                        <span onClick={moveNext}>
                            {next}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AniBoardView;