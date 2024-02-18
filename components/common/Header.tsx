import '../../css/common/Header.css';
import { useEffect,useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import queryString from 'query-string';
import { clearInterval } from 'timers';

function Header(){
    const [menu,setMenu]=useState(0);
    const [name, setName]=useState('');
    const [id,setId]=useState('');
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [leftTime,setLeftTime]=useState(0);

    useEffect(()=>{
        menuDropDown();
        checkAccesToken();

        const queryObj=queryString.parse(window.location.search)
        
            if(queryObj !== null){
                if(typeof(queryObj.menu)==='string' ){
                    const m:number=parseInt(queryObj.menu);
                    setMenu(m);
                }
            }
        
        setInterval(()=>{
            var leftTime=document.getElementById('left-time');
            if(leftTime !== null){
                var time=parseInt(leftTime.innerText)-1;
                if(time < 0){
                    
                }else{
                    leftTime.innerText=time.toString();
                }
            }
        },1000)    

    },[])

    const menuDropDown=()=>{

    }

    const moveLogin=()=>{
        window.location.href='/login';
    }

    const moveRegister=()=>{
        window.location.href='/register';
    }

    const checkAccesToken=async()=>{
        console.log('checkAccesToken');
        const token = cookies.token; // 쿠키에서 id 를 꺼내기
        console.log(token);

        await axios.post('/api/member/check/token',{ token: token })
        .then(response => {
            console.log('토큰 유효함!');
            console.log(response);
            console.log(response.data.id);
            const id = response.data.id;
            const name = response.data.name;

            const leftTime = parseInt(response.data.exp)-parseInt(response.data.current);
            setLeftTime(leftTime);

            setIsLoggedIn(true);
            setId(id);
            setName(name);
        }).catch(error=>{
            console.log(error);
            //removeCookie('token');
        
        })
    }

    const logOutAction=async()=>{
        alert('로그아웃!');
        const token = cookies.token; // 쿠키에서 id 를 꺼내기
        await axios.post('/api/member/logout',{ token: token, id:id })
        .then(response => {
            console.log(response);
            console.log(response.data.id);
            removeCookie('token');
            setIsLoggedIn(false);
        }).catch(error=>{
            console.log(error);
            removeCookie('token');
            window.location.href='/';
        })
    }

    const moveMemberUpdate=()=>{
        alert('회원정보 수정 페이지 이동!');
        window.location.href='/update'
    }

    return(
        <header id='header' className='m-auto'>
            <div id='util' className='box-border pt-30'>
                <div id='logo'>
                    <a href="/" className='w-full h-full'>
                        <img src={'/images/logo.png'}/>
                    </a>
                </div>
                <div id='member-menu'>
                    {
                        isLoggedIn===true?
                        <div id='member-wrap'>
                            <span id='left-time'>{leftTime}</span>
                            <span onClick={moveMemberUpdate}>{name}님</span>
                            <span onClick={logOutAction}>로그아웃</span>
                            <span onClick={moveRegister}>회원가입</span>
                        </div>
                        :
                        <div id='member-wrap'>
                            <span onClick={moveLogin}>로그인</span>
                            <span onClick={moveRegister}>회원가입</span>
                        </div>
                    }
                </div>
            </div>
            <div id='menu'>
                <div id='menu_bg' className='m-auto'>

                </div>
                <ul id='gnb' className='m-auto'>
                    <li>
                        <a href="/ani/total?menu=1" className={menu===1? 'menu-active':''}>애니메이션</a>
                        <ul className='lnb'>
                            <li><a href="/ani/total?menu=1">목록</a></li>
                            <li><a href="/ani/goods/list?menu=1">굿즈구매</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/game/total?menu=2" className={menu===2? 'menu-active':''}>게임</a>
                        <ul className='lnb'>
                            <li><a href="/game/total?menu=2">목록</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/docu/total?menu=3" className={menu===3? 'menu-active':''}>다큐멘터리</a>
                        <ul className="lnb">
                            <li><a href="/docu/total?menu=3">목록</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/health/total?menu=4" className={menu===4? 'menu-active':''}>건강정보</a>
                        <ul className="lnb">
                            <li><a href="/health/total?menu=4">목록</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/book?menu=5" className={menu===5? 'menu-active':''}>책리뷰</a>
                        <ul className="lnb">
                            <li><a href="/book?menu=5">목록</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/board/notice?menu=6" className={menu===6? 'menu-active':''}>게시판</a>
                        <ul className="lnb">
                            <li><a href="/board/notice?menu=6">공지사항</a></li>
                            <li><a href="/board/user?menu=6">사용자</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">채팅방</a>
                        <ul className="lnb">
                            <li><a href="/chat/free?menu=7">자유채팅방</a></li>
                            <li><a href="/chat/user?menu=7">회원채팅방</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            </header>
    )
}

export default Header;