import '../../css/aniBoard/AniBoardOneList.css';
import {useEffect,useState} from 'react';
import axios from 'axios';
import queryString from 'query-string';
import moment from 'moment';

function AniBoardOneList(){
    const [currentPage,setCurrentPage]=useState(1);
    const [totalLength, setTotalLength]=useState('');
    const [korTitle,setKorTitle]=useState('');
    const [engtitle,setEngTitle]=useState('');
    const [oneAniList,setOneAniList]=useState([]);
    const [currentList,setCurrentList]=useState([]);
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
        alert('localStorage set!')
        
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

    const getOneInitialAniList=async(id:any,page:number)=>{
        await axios.get(`/api/ani/one?id=${id}&page=${page}`).then(response => {
            console.log(response);
            console.log(response.data);
            setKorTitle(response.data[0].kor_title);
            setEngTitle(response.data[0].eng_title);
            
            console.log(response.data[0].animation_list);
            console.log(JSON.parse(response.data[0].animation_list));
            const animation_list=JSON.parse(response.data[0].animation_list)
            let total_video_list=animation_list.video_list;
            setOneAniList(total_video_list)
            window.localStorage.setItem('total_video_list',JSON.stringify(total_video_list));
            setTotalLength(total_video_list.length);
            
            const startIndex = (page-1)*10
            const endIndex = startIndex+10
            const video_list=total_video_list.slice(startIndex,endIndex)
            console.log('video_list')
            console.log(video_list)
            setCurrentList(video_list)
        })
          .catch(error => {
            console.error(error);
        })
    }

    const getOneAniList=async(id:any,page:number)=>{
        await axios.get(`/api/ani/one?id=${id}&page=${page}`).then(response => {
            console.log(response);
            console.log(response.data);
            console.log(response.data[0].animation_list);
            console.log(JSON.parse(response.data[0].animation_list));
            const animation_list=JSON.parse(response.data[0].animation_list)
            let total_video_list=animation_list.video_list;
            const startIndex = (page-1)*10
            const endIndex = startIndex+10
            const video_list=total_video_list.slice(startIndex,endIndex)
            console.log('video_list')
            console.log(video_list)
            setCurrentList(video_list)
        })
          .catch(error => {
            console.error(error);
        })
    }

    const getAnimationCount=async()=>{

    }

    const handleOnKeyPress = (e:any) => {
        //alert('keyup')
        if (e.key === 'Enter') {
            alert('search!')
            searchAni()
        }
    };

    const searchAni=()=>{
        alert('검색!')
    }

    const moveAnimationView=(no:number,title:string,file:string)=>{
        alert(no)
        window.location.href=`view?no=${no}&file=${file}&menu=1`
    }

    const pageClick=(page:number)=>{
        alert(page)
        setCurrentPage(page)
        getOneAniList(id,page)
    }
    //https://img.youtube.com/vi/3Kf8uj05BEU/0.jpg
    const animationList = currentList.map(
        (data:any)=>(<div className="animation-one-element" onClick={()=>moveAnimationView(data.no,data.title,data.file)}>
                                    <img src={`/videos/dragon_ball/cover/${data.cover}.png`} alt='txt' id="ani-one-image"/>
                                    <span id="ani-one-title">{data.title}</span>
                                </div>)
    )
    const length:any = totalLength;
    var endPage = Math.ceil(length/10);
    let pageNumbers=[]
    for(let i=1; i<=endPage; i++){
        pageNumbers.push(i)
    }
    const pageList = pageNumbers.map(
        (page)=>(<span className={`page `+(currentPage===page? 'active':'')} onClick={()=>pageClick(page)}>{page}</span>)
    )

    const prevPage=()=>{
        if(currentPage-1 <1){
            alert('이동불가!')
        }else{
            pageClick(currentPage-1)
            setCurrentPage(currentPage-1)
        }
    }

    const nextPage=()=>{
        const length:any = totalLength;
        var endPage = Math.ceil(length/10);
        if(currentPage+1 > endPage){
            alert('이동불가!')
        }else{
            pageClick(currentPage+1)
            setCurrentPage(currentPage+1)
        }
    }

    return(
        <div id="animation-one-list-wrap">
            <div id="animation-one-list-wrap-inner">
                <div id="search-tab">
                    <input type="text" placeholder="검색어 입력" onKeyPress={handleOnKeyPress}/>
                    <button onClick={searchAni}>검색</button>
                </div>
                <div id="animation-one-list">
                    <div id="animation-one-list-side">
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
                    <div id="animation-one-list-inner">
                        {animationList}
                    </div>
                </div>
                <div id='pagination-wrap'>
                    <div id="pagination-wrap-inner">
                        <span className="page" onClick={()=>prevPage()}>&lt;</span>
                            {pageList}
                        <span className="page" onClick={()=>nextPage()}>&gt;</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AniBoardOneList;