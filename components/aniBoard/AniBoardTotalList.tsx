import '../../css/aniBoard/AniBoardTotalList.css';
import {useEffect,useState} from 'react';
import axios from 'axios';
import {InputChangeEvent, KeyboardEvent} from '../../types'
import AniBoardTotalListFilter from './AniBoardTotalListFilter';

function AniBoardTotalList(){

    const [total,setTotal]=useState(0)
    const [currentPage,setCurrentPage]=useState(1)
    const [totalAniList,setTotalAniList]=useState([])
    const [searchWord,setSearchWord]=useState('')

    useEffect(()=>{
        getTotalAniCount()
        getTotalAniList(1)
    },[])

    const getTotalAniCount=async()=>{
        await axios.get(`/api/ani/count`).then(response => {
            console.log(response);
            console.log(response.data);
            setTotal(response.data[0].cnt)
        })
          .catch(error => {
            console.error(error);
        })
    }

    const getTotalAniList=async(page:number)=>{
        alert('전체조회!');
        await axios.get(`/api/ani/total?page=${page}`).then(response => {
            console.log(response);
            setTotalAniList(response.data);
            getTotalAniCount()
        })
          .catch(error => {
            console.error(error);
        })
    }

    const searchAni=async()=>{
        alert('검색!')
        if(searchWord.trim()===''){
            alert('검색어를 입력하세요!')
            return
        }

        await axios.get(`/api/ani/total/search?searchText=${searchWord}`).then(response => {
            console.log(response);
            setTotalAniList(response.data);
            setTotal(response.data.length);
            setSearchWord('');
        })
          .catch(error => {
            console.error(error);
        })
    }

    const handleOnKeyPress = (e:any) => {
        //alert('keyup')
        if (e.key === 'Enter') {
            alert('search!')
            searchAni()
        }
    };

    const moveOneAniList=(id:number)=>{
        alert(id)
        window.location.href=`/ani/one?id=${id}&page=1&menu=1`
    }

    const prevPage=()=>{

    }

    const nextPage=()=>{
        
    }

    const aniListMap = totalAniList.map(
        (data:any)=>(
            <div key={data.id} className="animation-box" onClick={()=>moveOneAniList(data.id)}>
                    <img src={`/images/cover/${data.cover_image}`} id="ani-image"/>
                    <span id="ani-title">{data.animation_title}</span>
            </div>
        )
    )
    const endPage = Math.ceil(total/12);
    let pageNumbers=[];
    for(var i=1; i<=endPage; i++){
        pageNumbers.push(i);
    }
    const pageClick=(page:number)=>{
        alert('pageClick!')
        getTotalAniList(page)
        setCurrentPage(page)
    }

    const inputSearchWord=(e:InputChangeEvent)=>{
        console.log(e.target.value);
        setSearchWord(e.target.value)
    }

    const pageListMap = pageNumbers.map(
        (page)=>
            (<span className={`page `+(currentPage===page?`active`:``) } 
                   onClick={()=>pageClick(page)}>
                {page}
            </span>)
    )
    
 
    return(
        <div id="animation-total-list-wrap">
            <AniBoardTotalListFilter setTotalAniList={setTotalAniList} 
            setTotal={setTotal} getTotalAniList={getTotalAniList}/>
            <div id="animation-total-list-wrap-inner">    
                <div id="search-tab">
                    <input type="text" placeholder="검색어 입력" 
                    onKeyPress={handleOnKeyPress}
                    onChange={inputSearchWord}
                    value={searchWord} />
                    <button onClick={searchAni}>검색</button>
                    <button onClick={()=>getTotalAniList(1)}>전체조회</button>
                </div>
                <div className="animation-box-wrap">
                    {aniListMap}
                </div>
                <div id="pagination-wrap">
                    <div id="pagination-wrap-inner">
                        <span className="page" onClick={()=>prevPage()}>&lt;</span>
                            {pageListMap}
                        <span className="page" onClick={()=>nextPage()}>&gt;</span>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default AniBoardTotalList;