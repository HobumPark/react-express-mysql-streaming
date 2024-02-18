import '../../css/aniBoard/AniBoardStoryView.css';
import {useEffect,useState} from 'react';
import axios from 'axios';
import queryString from 'query-string';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { configureStore } from '@reduxjs/toolkit';
import moment from 'moment';

function AniBoardStoryView(){
    const [storyText,setStoryText]=useState('');
    const [storyImage,setStoryImage]=useState([] as any);
    const [storyImageLength,setStoryImageLength]=useState(0);
    const [storyImageFile,setStoryImageFile]=useState('');
    const [characterList, setCharacterList]=useState([] as any);

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
        getStoryAndImageList(id)
        getAnimationCharacterInfo(id);
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

    const getStoryAndImageList=async(id:number)=>{
        await axios.get(`/api/ani/story?id=${id}`)
        .then(response => {
            console.log(response);
            console.log(response.data[0]);
            setStoryText(response.data[0].story_text);
            setStoryImageFile(response.data[0].img_file_name);
            setStoryImageLength(response.data[0].img_length);
            const length=response.data[0].img_length;
            const imgFileName=response.data[0].img_file_name;

            let tempList:any[]=[];
            for(var i=1; i<=length; i++){
                tempList.push(`${imgFileName}${i}.png`);
            }
            setStoryImage(tempList);
        })
          .catch(error => {
            console.error(error);
        })
    }

    const getAnimationCharacterInfo=async(id:number)=>{
        console.log('getAnimationCharacterInfo')
        await axios.get(`/api/ani/character?id=${id}`)
        .then(response => {
            console.log(response);
            console.log(response.data[0].character_info);
            const characterInfo=JSON.parse(response.data[0].character_info)
            const characterList=characterInfo.character_list
            setCharacterList(characterList);
        })
          .catch(error => {
            console.error(error);
        })
    }

    const imageSlideMap=storyImage.map(
        (data:any)=>(<div className='story-image-element'>
                    <img src={`/images/story/${engtitle}/${data}`}/>
                    </div>)
    )   

    const characterMap=characterList.map(
        (data:any)=><div className='character-element'>
                    <div id='character-img'>
                        <img src={`/images/character/${engtitle}/${data.file}`}/>
                        <span>{data.name}</span>
                    </div>
                    <div id='character-desc'>
                        <div id='character-desc-inner'>
                            {data.desc}
                        </div>
                    </div>
                </div>
    )

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow:3,
        slidesToScroll:3
    };

    return(
        <div id='ani-board-story-view'>
            <div id="ani-board-story-view-inner">
                <div id='story-header'>
                    <h1>스토리</h1>
                </div>
                <div id='story-main'>
                    <div id='story-main-side'>
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
                    <div id='story-main-inner'>
                        <div id='story-contents-text'>
                            <div id='story-contents-text-inner'>
                                {storyText}
                            </div>
                        </div>
                        <div id='story-contents-image'>
                            <Slider {...settings}>
                                {imageSlideMap}
                            </Slider>
                        </div>
                        <div id='story-character-info'>
                            {characterMap}
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    )
}

export default AniBoardStoryView