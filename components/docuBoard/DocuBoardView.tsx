import '../../css/docuBoard/DocuBoardView.css';
import {useEffect,useState} from 'react';
import axios from 'axios';
import queryString from 'query-string';
function DocuBoardView(){

    const [aniLinkList,setAniLinkList]=useState([])
    const [v,setV]=useState('')
    const [si,setSi]=useState('')
    useEffect(()=>{
        const queryObj=queryString.parse(window.location.search)
        const v:any = queryObj.v
        const si:any = queryObj.si
 
        setV(v)
        setSi(si)
        getAniLinkList()
    },[])

    const getAniLinkList=async()=>{
        //await axios.get('/')
    }

    return(
        <div id='documentary-view-wrap'>
            <div id='documentary-view-wrap-inner'>
                <div id='documentary-view'>
                    <div id='documentary-view-title'>

                    </div>
                    <div id='documentary-view-video'>
                        <iframe width="100%" height="100%" 
                        src={`https://www.youtube.com/embed/${v}?si=${si}&autoplay=true`}
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen></iframe>
                    </div>
                </div>
                <div id='prev-next-view'>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    )
}

export default DocuBoardView;