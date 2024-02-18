import '../../css/home/Home.css'
import HomeSlide from './HomeSlide';
import {useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {increment} from '../../redux/actions'
import UserBoard from '../board/user/UserBoard';
import NoticeBoard from '../board/notice/NoticeBoard';
import RealTimeSlide from './RealTimeSlide';
import ThisWeekSlide from './ThisWeekSlide';
import TotalSlide from './TotalSlide';

function Home(){

    const [activeBoard,setActiveBoard]=useState('notice')
    const [noticeBoard,setNoticeBoard]=useState([])
    const [userBoard,setUserBoard]=useState([])
    const [isNotice,setIsNotice]=useState(true);
    const [isUser,setIsUser]=useState(false);
    

    const [activeContents,setActiveContents]=useState('pop')
    const [popContents,setPopContents]=useState([])
    const [newContents,setNewContents]=useState([])
    const [isPop,setIsPop]=useState(true);
    const [isNew,setIsNew]=useState(false);    


    const [slideMenu,setSlideMenu]=useState(1)

    useEffect(()=>{
        getBoardData();
    },[])

    const getBoardData=async()=>{
        await axios.get('/api/board/notice/home').then(response => {
            console.log(response);
            setNoticeBoard(response.data)
        })
          .catch(error => {
            console.error(error);
        })

        await axios.get('/api/board/user/home').then(response => {
            console.log(response);
            setUserBoard(response.data)
        })
          .catch(error => {
            console.error(error);
        })
    }

    const getContentsData=async()=>{
        
    }

    const dispatch = useDispatch();
    const number = useSelector((state:any)=> state.number)
    
    const showNoticeBoard=()=>{
        setActiveBoard('notice');
        setIsNotice(true);
        setIsUser(false);
    }

    const showUserBoard=()=>{
        setActiveBoard('user');
        setIsUser(true);
        setIsNotice(false);
    }

    const showPopContents=()=>{
        setActiveContents('pop');
        setIsPop(true);
        setIsNew(false);
    }

    const showNewContents=()=>{
        setActiveContents('new');
        setIsNew(true);
        setIsPop(false);
    }

    const userBoardMap=userBoard.map(
        (data:any)=>(<UserBoard key={data.no}
                no={data.no}
                title={data.title} writer={data.writer}
                write_date={data.write_date} hits={data.hits}
                attach={data.attach}/>)
    )

    const noticeBoardMap=noticeBoard.map(
        (data:any)=>(<UserBoard key={data.no}
                no={data.no}
                title={data.title} writer={data.writer}
                write_date={data.write_date} hits={data.hits}
                attach={data.attach}/>)
    )        

    return(
        <div id='home' className='w-full'>
            <div id="slide" className='m-auto'>
                <HomeSlide/>
            </div>
            <div id='contents-slide-wrap' className='m-auto mb-10'>
                <div id='contents-slide-btn-wrap'>
                    <h1>라프텔 인기 애니</h1>
                    <div id='contents-slide-btn'>
                        <button onClick={()=>setSlideMenu(1)} className={slideMenu===1? 'active-slide':''}>실시간</button>
                        <button onClick={()=>setSlideMenu(2)} className={slideMenu===2? 'active-slide':''}>이번주</button>
                        <button onClick={()=>setSlideMenu(3)} className={slideMenu===3? 'active-slide':''}>역대</button>
                    </div>
                </div>
                <div id='contents-slide'>
                    {
                        slideMenu===1?
                        <div id='contents-slide-real-time'>
                            <RealTimeSlide/>
                        </div>:''
                    }
                    {
                        slideMenu===2?
                        <div id='contents-slide-week'>
                            <ThisWeekSlide/>
                        </div>:''
                    }
                    {
                        slideMenu===3?
                        <div id='contents-slide-total'>
                            <TotalSlide/>
                        </div>:''
                    }
                </div>
            </div>
            <div id="member-ship-area">
                <div id="member-ship-area-inner" className='m-auto'> 
                    <div id="member-ship-contents">
                        <img src="/images/membership/membership.png"/>
                        <div id="member-ship-text">
                            <h1><b>멤버십</b> 시작하기</h1>
                            <h2>한일 동시방영 신작부터 역대 인기애니까지 무제한!</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div id="contents" className='m-auto'>
                <div id="tab1">
                    <div id="tab1-btn">
                        <button onClick={showNoticeBoard} className={isNotice===true? 'tab1-active':''}>공지사항</button>
                        <button onClick={showUserBoard} className={isUser===true? 'tab1-active':''}>사용자게시판</button>
                    </div>
                    <div id="tab1-contents">
                        {
                        activeBoard==='notice'?
                        <div id='contents-notice-board' className='m-auto'>
                            {noticeBoardMap}
                        </div>:
                        <div id='contents-user-board' className='m-auto'>
                            {userBoardMap}
                        </div>
                        }
                    </div>
                </div>
                <div id="tab2">
                    <div id="tab2-btn">
                        <button onClick={showPopContents} className={isPop===true? 'tab2-active':''}>인기작품</button>
                        <button onClick={showNewContents} className={isNew===true? 'tab2-active':''}>신규작품</button>
                    </div>
                    <div id="tab2-contents">
                        {
                            activeContents==='pop'?
                            <div id='contents-popular' className='m-auto'>
                                <ul>
                                    <li>
                                        <a href="#">
                                            <img src='/images/gallery/pop1.png'/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <img src='/images/gallery/pop2.png'/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <img src='/images/gallery/pop3.png'/>
                                        </a>
                                    </li>
                                </ul>
                            </div>:
                            <div id='contents-new' className='m-auto'>
                                <ul>
                                    <li>
                                        <a href="#">
                                            <img src='/images/gallery/new1.png'/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <img src='/images/gallery/new2.png'/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <img src='/images/gallery/new3.png'/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div id="ad-area" className='m-auto'>
                <div id="ad-area-inner" className='m-auto'>
                    <div id="ad-contents">
                        <div id="ad-text">
                            <h1>멤버십 이용자라면</h1>
                            <h2><b>라프텔 TV앱</b>으로도 웅장하게 즐겨보세요!</h2>
                        </div>
                        <img src="/images/banner/img-banner-tv.png"/>
                    </div>    
                </div>      
            </div>
        </div>
    )
}

export default Home;