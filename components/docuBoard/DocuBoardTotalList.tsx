import '../../css/docuBoard/DocuBoardTotalList.css'
import {useState,useEffect} from 'react';
import axios from 'axios';

function DocuBoardTotalList(){
    const [currentPage,setCurrentPage]=useState(1)
    const [totalDocuList,setTotalDocuList]=useState([{"no":1}])

    useEffect(()=>{
        getTotalDocuList()
    },[])

    const prevPage=()=>{

    }

    const nextPage=()=>{
        
    }
    
    const getTotalDocuList=async()=>{
        await axios.get('/api/docu/total').then(response => {
            console.log(response);
            setTotalDocuList(response.data)
        })
          .catch(error => {
            console.error(error);
        })
    }

    const searchAni=async()=>{
        alert('검색!')
        await axios.get('/api/docu/total/search').then(response => {
            console.log(response);
            setTotalDocuList(response.data)
        })
          .catch(error => {
            console.error(error);
        })
    }

    const moveOneDocuList=(id:number)=>{
        alert(id)
        window.location.href=`/docu/one?id=${id}&page=1`
    }

    const total = Math.ceil(totalDocuList.length/10);
    let pageNumbers=[];
    for(var i=1; i<=total; i++){
        pageNumbers.push(i);
    }
    const pageListMap = pageNumbers.map(
        (page)=>(<span className={`page `+(currentPage===page?`active`:``) }>{page}</span>)
    )

    const totalDocuMap = totalDocuList.map(
        (data:any)=>(
            <div key={data.id} className="documentary-box" onClick={()=>moveOneDocuList(data.id)}>
                    <img src={`/images/cover/${data.cover_image}`} id="documentary-image"/>
                    <span id="documentary-title">{data.documentary_title}</span>
            </div>
        )
    )

    return(
        <div id='documentary-board-total-list-wrap'>
            <div id='documentary-board-total-list-inner'>
                <div id="search-tab">
                    <input type="text" placeholder="검색어 입력"/>
                    <button onClick={searchAni}>검색</button>
                </div>
                <div className="documentary-box-wrap">
                    {totalDocuMap}
                </div>
                <div id="pagination-wrap">
                    <div id="pagination-wrap-inner">
                        <span className="page" onClick={prevPage}>&lt;</span>
                        {pageListMap}
                        <span className="page" onClick={nextPage}>&gt;</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DocuBoardTotalList;