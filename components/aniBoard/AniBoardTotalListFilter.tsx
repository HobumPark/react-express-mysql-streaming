import '../../css/aniBoard/AniBoardTotalListFilter.css';
import {useState,useEffect} from 'react';
import { InputChangeEvent, SelectChangeEvent } from '../../types';
import $ from 'jquery';
import axios from 'axios';

function AniBoardTotalListFilter(props:any){
    
    const [genreHero,setGenreHero]=useState(false);
    const [genreDetective,setGenreDetective]=useState(false);
    const [genreDrama,setGenreDrama]=useState(false);
    const [genreChivalry,setGenreChivalry]=useState(false);
    const [genreGag,setGenreGag]=useState(false);
    const [genreHorror,setGenreHorror]=useState(false);
    
    const [tagFamily,setTagFamily]=useState(false);
    const [tagHumanism,setTagHumanism]=useState(false);
    const [tagAnimal,setTagAnimal]=useState(false);
    const [tagBrain,setTagBrain]=useState(false);
    const [tagMagicGirl,setTagMagicGirl]=useState(false);
    
    const [fromYear,setFromYear]=useState(0);
    const [toYear,setToYear]=useState(0);
    
    useEffect(()=>{
        searchFilterAxios();
    },[genreHero,genreDetective,genreDrama,genreChivalry,
        tagFamily,tagHumanism,tagAnimal,toYear])

    //장르 필터
    const genreHeroCheck=()=>{
        alert('장르 용자물 체크!');
        setGenreHero(!genreHero);
    }

    const genreDetectiveCheck=()=>{
        alert('장르 추리물 체크!');
        setGenreDetective(!genreDetective);
    }

    const genreDramaCheck=()=>{
        alert('장르 드라마 체크!');
        setGenreDrama(!genreDrama);
    }

    const genreChivalryCheck=()=>{
        alert('장르 무협 체크!');
        setGenreChivalry(!genreChivalry);
    }

    const genreGagCheck=()=>{
        alert('장르 개그 체크!');
        setGenreGag(!genreGag);
    }

    const genreHororCheck=()=>{
        alert('장르 호러 체크!');
        setGenreHorror(!genreHorror);
    }

    //태그 필터
    const tagFamilyCheck=()=>{
        alert('태그 가족 체크!');
        setTagFamily(!tagFamily);
    }

    const tagHumanismCheck=()=>{
        alert('태그 감동 체크!');
        setTagHumanism(!tagHumanism);
    }

    const tagAnimalCheck=()=>{
        alert('태그 동물 체크!');
        setTagAnimal(!tagAnimal);
    }

    const tagBrainCheck=()=>{
        alert('태그 두뇌싸움 체크!');
        setTagBrain(!tagBrain);
    }

    const tagMagicGirlCheck=()=>{
        alert('태그 마법소녀 체크!'); 
        setTagMagicGirl(!tagMagicGirl);
    }

        

    //셀렉트 필터
    const selectChangeFrom=(e:SelectChangeEvent)=>{
        alert('selectChangeFrom')
        alert(e.target.value)
        const fromYear=parseInt(e.target.value)
        setFromYear(fromYear);
        console.log(fromYear);
    }

    const selectChangeTo=(e:SelectChangeEvent)=>{
        alert('selectChangeTo')
        alert(e.target.value)
        const toYear=parseInt(e.target.value)
        if(toYear < fromYear){
            alert('끝년도는 시작년도보다 커야합니다.');
            $("#to-select").find('option:eq(0)').prop("selected",true);
            return
        }
        setToYear(toYear);    
        console.log(toYear);
        getAniListByYear(fromYear,toYear);
    }

    const getAniListByYear=async(fromYear:number,toYear:number)=>{
       
    }

    const searchFilterAxios=async()=>{
        alert('searchFilterAxios')
        //{ {'genreFilter':[]} , {'tagFilter':[]} }
        let totalFilter={'genreFilter':['aaa'],'tagFilter':['aaa'],'yearFilter':[0]}
        let genreFilterList:Array<string>=[]
        let tagFilterList:Array<string>=[]
        let yearFilterList:Array<number>=[]
        
        if(genreHero===true){
            genreFilterList.push('용자')
        }
        if(genreDetective===true){
            genreFilterList.push('추리')
        }
        if(genreDrama===true){
            genreFilterList.push('드라마')
        }
        if(genreChivalry===true){
            genreFilterList.push('무협')
        }
        if(tagFamily===true){
            tagFilterList.push('가족')
        }
        if(tagHumanism===true){
            tagFilterList.push('감동')
        }
        if(tagAnimal===true){
            tagFilterList.push('동물')
        }

        if(fromYear !==0 && toYear !==0){
            yearFilterList.push(fromYear);
            yearFilterList.push(toYear);
        }

        totalFilter.genreFilter=genreFilterList;
        totalFilter.tagFilter=tagFilterList;
        totalFilter.yearFilter=yearFilterList;

        await axios.post(`/api/ani/filter`,totalFilter).then(response => {
            console.log(response);
            console.log(response.data);
            props.setTotalAniList(response.data);
            props.setTotal(response.data.length);
        })
        .catch(error => {
            console.error(error);
        })
    }

    const searchFilterAxiosRefresh=async()=>{
        alert('searchFilterAxiosRefresh')
        
    }

    const allFilterInit=()=>{
        alert('필터 초기화!')
        setGenreHero(false);
        setGenreDetective(false);
        setGenreDrama(false);
        setGenreGag(false);
        setGenreChivalry(false);
        setGenreHorror(false);
        setTagAnimal(false);
        setTagBrain(false);
        setTagHumanism(false);
        setTagMagicGirl(false);
        setTagFamily(false);
        searchFilterAxiosRefresh();
        props.getTotalAniList(1);
    }

    return(
        <div id='ani-board-total-list-filter'>
            <div id='filter-refresh' className='filter'>
                <h1>필터</h1>
                <div>
                    <button onClick={allFilterInit}>전체 초기화</button>
                </div>
            </div>
            <div id='filter1-genre' className='filter'>
                <h1>장르</h1>
                <div>
                    <input type="checkbox" id="genre-hero" onClick={genreHeroCheck} 
                    checked={genreHero}/>
                    <span>용자</span>
                </div>
                <div>
                    <input type="checkbox" id="genre-detective" onClick={genreDetectiveCheck} 
                    checked={genreDetective}/>
                    <span>추리</span>
                </div>
                <div>
                    <input type="checkbox" id="genre-drama" onClick={genreDramaCheck}
                    checked={genreDrama}/>
                    <span>드라마</span>
                </div>
                <div>
                    <input type="checkbox" id="genre-chivalry" onClick={genreChivalryCheck}
                    checked={genreChivalry}/>
                    <span>무협</span>
                </div>
                <div>
                    <input type="checkbox" id="genre-gag" onClick={genreGagCheck}
                    checked={genreGag}/>
                    <span>개그</span>
                </div>
                <div>
                    <input type="checkbox" id="genre-horor" onClick={genreHororCheck}
                    checked={genreHorror}/>
                    <span>공포</span>
                </div>

            </div>
            <div id='filter1-tag' className='filter'>
                <h1>태그</h1>
                <div>
                    <input type="checkbox" id="tag-family" onClick={tagFamilyCheck}
                    checked={tagFamily}/>
                    <span>가족</span>
                </div>
                <div>
                    <input type="checkbox" id="tag-humanism" onClick={tagHumanismCheck}
                    checked={tagHumanism}/>
                    <span>감동</span>
                </div>
                <div>
                    <input type="checkbox" id="tag-animal" onClick={tagAnimalCheck}
                    checked={tagAnimal}/>
                    <span>동물</span>
                </div>
                <div>
                    <input type="checkbox" id="tag-brain" onClick={tagBrainCheck}
                    checked={tagBrain}/>
                    <span>두뇌싸움</span>
                </div>
                <div>
                    <input type="checkbox" id="tag-magic-girl" onClick={tagMagicGirlCheck}
                    checked={tagMagicGirl}/>
                    <span>마법소녀</span>
                </div>
            </div>
            <div id='filter1-year' className='filter'>
                <h1>년도</h1>
                <div>
                    <select id='from-select' onChange={selectChangeFrom}>
                        <option>선택</option>
                        <option>2013</option>
                        <option>2014</option>
                        <option>2015</option>
                        <option>2016</option>
                        <option>2017</option>
                        <option>2018</option>
                    </select>
                    <span>
                        ~
                    </span>
                    <select id='to-select' onChange={selectChangeTo}>
                        <option>선택</option>
                        <option>2013</option>
                        <option>2014</option>
                        <option>2015</option>
                        <option>2016</option>
                        <option>2017</option>
                        <option>2018</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default AniBoardTotalListFilter;