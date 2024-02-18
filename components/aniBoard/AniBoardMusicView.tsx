import '../../css/aniBoard/AniBoardMusicView.css';
import {useEffect,useState} from 'react';
import axios from 'axios';
import queryString from 'query-string';
import moment from 'moment';

function AniBoardMusicView(){
    const [musicList,setMusicList]=useState([]);
    const [fileList,setFileList]=useState([]);
    const [totalLength, setTotalLength]=useState('');
    const [korTitle,setKorTitle]=useState('');
    const [engtitle,setEngTitle]=useState('');
    const [id,setId]=useState('');

    const [genre, setGenre]=useState('');
    const [country, setCountry]=useState('');
    const [grade, setGrade]=useState('');
    const [animationYear, setAnimationYear]=useState('');

    useEffect(()=>{
        const queryObj=queryString.parse(window.location.search)
        const id:any = queryObj.id
        setId(id)
        console.log(id)
        getOneAnimationInfo(id);
        getOneInitialAniList(id,1)
        getMusicListInfo(id)
    },[])

    const getOneAnimationInfo=async(id:number)=>{
        console.log('getOneAnimationInfo');
        await axios.get(`/api/ani/info?id=${id}`).then(response => {
            console.log(response);
            console.log(response.data);
            setGenre(response.data[0].genre);
            setCountry(response.data[0].country);
            setGrade(response.data[0].grade);
            const tempYear=response.data[0].animation_year;
            const resultYear=moment(tempYear).format('YYYY년MM월DD일');
            setAnimationYear(resultYear);
        })
          .catch(error => {
            console.error(error);
        })
    }
  
    const getOneInitialAniList=async(id:number,page:number)=>{
        await axios.get(`/api/ani/one?id=${id}&page=${page}`)
        .then(response => {
            console.log(response);
            console.log(response.data);
            setKorTitle(response.data[0].kor_title);
            setEngTitle(response.data[0].eng_title);
            console.log(response.data[0].animation_list);
            console.log(JSON.parse(response.data[0].animation_list));
            const animation_list=JSON.parse(response.data[0].animation_list)
            let total_video_list=animation_list.video_list;
            setTotalLength(total_video_list.length);
        })
          .catch(error => {
            console.error(error);
        })
    }

    const handleFileDown=async()=>{
        alert('파일 다운!')
    }

    const getMusicListInfo=async(id:number)=>{
        await axios.get(`/api/ani/music?id=${id}`)
        .then(response => {
            console.log(response);
            console.log(response.data[0]);
            console.log(response.data[0].video_info);
            const video_info=JSON.parse(response.data[0].video_info);
            const file_info=JSON.parse(response.data[0].file_info);
            const video_list=video_info.video_list;
            const file_list=file_info.file_list;
            console.log(video_info);
            console.log(video_list);
            setMusicList(video_list);
            setFileList(file_list);
        })
          .catch(error => {
            console.error(error);
        })
    }

    const musicMap=musicList.map(
        (data:any)=>(
            <iframe width="560" height="315" 
                                src={`https://www.youtube.com/embed/${data.url}`}
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen></iframe>
        )
    )

    const fileMap=fileList.map(
        (data:any)=>(
            <div className='music-file-element'>
                <span id='music-file-title'>{data.title}</span>
                <span onClick={handleFileDown} className='music-file'>{data.file_name}</span>
                <span id='audio-wrap'>
                    <audio controls src={`/audio/Makafushigi Adventure-.mp3`}/>
                </span>
            </div>   
        )
    )

    return(
        <div id='ani-board-music-view'>
            <div id="ani-board-music-view-inner">
                <div id='music-header'>
                    <h1>음악</h1>
                </div>
                <div id='music-main' className='clearfix'>
                    <div id='music-main-side'>
                            <div id="animation-one-list-side-img">
                                <img src={`/images/cover/${engtitle}.png`}/>
                            </div>
                            <div id="animation-one-list-side-info">
                                <h1>{korTitle}</h1>
                                <span>동영상 <b>{totalLength}</b>개</span>
                                <span>조회수 <b></b>회</span>
                                <span><a href={`/ani/one?id=${id}&page=1&menu=1`}>재생 목록</a></span>
                                <span><a href={`/ani/story/view?id=${id}&menu=1`}>스토리보기</a></span>
                                <span><a href={`/ani/music/view?id=${id}&menu=1`}>음악</a></span>
                                <span id='animation-info'>애니메이션 정보</span> 
                                <span>제작국가: <span className={country}></span> </span>
                                <span>장르: {genre}</span>
                                <span>방영일: {animationYear}</span>
                                <span>등급: {grade} 관람가</span>
                            </div>
                            <div id="animation-one-list-side-control">
                                <button>모두재생</button>
                                <button>셔플</button>
                            </div>
                    </div>
                    <div id='music-main-inner' className='clearfix'>
                        <div id='music-video-info'>
                            {musicMap}
                        </div>
                        <div id='music-file-info'>
                            {fileMap}
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    )
}

export default AniBoardMusicView