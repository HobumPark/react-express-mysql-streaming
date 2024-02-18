import '../../css/docuBoard/DocuBoardOneList.css'
import {useEffect,useState} from 'react';
import axios from 'axios';
import queryString from 'query-string';

function DocuBoardOneList(){
    const [currentPage,setCurrentPage]=useState(1)
    const [totalLength, setTotalLength]=useState('')
    const [title,setTitle]=useState('')
    const [korTitle,setKorTitle]=useState('')
    const [engtitle,setEngTitle]=useState('')
    const [oneDocuList,setOneDocuList]=useState([])
    const [currentList,setCurrentList]=useState([])
    const [id,setId]=useState('')

    useEffect(()=>{
        const queryObj=queryString.parse(window.location.search)
        const id:any = queryObj.id
        setId(id)
        console.log(id)
        getOneInitialDocuList(id,1)
    },[])

    const getOneInitialDocuList=async(id:any,page:number)=>{
        await axios.get(`/api/docu/one?id=${id}&page=${page}`).then(response => {
            console.log(response);
            console.log(response.data);
            setTitle(response.data[0].title);
            console.log(response.data[0].documentary_list);
            console.log(JSON.parse(response.data[0].documentary_list));
            const documentary_list=JSON.parse(response.data[0].documentary_list)
            let total_video_list=documentary_list.video_list;
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

    const getOneDocuList=async(id:any,page:number)=>{
        await axios.get(`/api/docu/one?id=${id}&page=${page}`).then(response => {
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

    const searchDocu=()=>{
        alert('검색!')
    }

    const moveDocumentaryView=(no:number,v:string,si:string)=>{
        alert(no)
        window.location.href=`view?no=${no}&v=${v}&si=${si}`
    }

    const pageClick=(page:number)=>{
        alert(page)
        setCurrentPage(page)
        getOneDocuList(id,page)
    }

    const documentaryList = currentList.map(
        (data:any,index:number)=>(<div className="documentary-one-element" onClick={()=>moveDocumentaryView(index+1,data.v,data.si)}>
                    <img src={`https://img.youtube.com/vi/${data.v}/0.jpg`} id="docu-one-image"/>
                    <span id="docu-one-title">{data.title}</span>
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

    }

    const nextPage=()=>{

    }

    return(
        <div id='documentary-board-one-list-wrap'>
            <div id="documentary-one-list-wrap-inner">
                <div id="search-tab">
                    <input type="text" placeholder="검색어 입력"/>
                    <button onClick={searchDocu}>검색</button>
                </div>
                <div id="documentary-one-list">
                    <div id="documentary-one-list-side">
                    <div id="animation-one-list-side-img">
                            <img src={``}/>
                        </div>
                        <div id="animation-one-list-side-info">
                            <h1></h1>
                            <span>동영상 <b>{totalLength}</b>개</span>
                            <span>조회수 <b></b>회</span>
                            <span><a href="">스토리보기</a></span>
                            <span><a href="">음악</a></span>
                        </div>
                        <div id="animation-one-list-side-control">
                            <button>모두재생</button>
                            <button>셔플</button>
                        </div>
                    </div>
                    <div id="documentary-one-list-inner">
                        {documentaryList}
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

export default DocuBoardOneList;