import {useEffect,useState} from 'react';
import '../../css/common/JwtTokenTestPage.css';
import axios from 'axios';
import { useCookies } from 'react-cookie'; // useCookies import
import moment from 'moment';

function JwtTokenTestPage(){

    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const [currentDate, setCurrentDate]=useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['jwt-access-token-test']);

    useEffect(()=>{
        makeCurrentDate();
    },[])

    const makeCurrentDate=()=>{
        

        setInterval(
            ()=>{
                const format = moment().format('YYYY-MM-DD hh:mm:ss');
                setCurrentDate(format);
            }, 1000
        )

    }

    const jwtTestLogin=async()=>{
        alert('로그인!');

        await axios.post('/api/jwt_test/login')
        .then(
            (response)=>{
                console.log(response);
                setIsLoggedIn(true);
            }
        )
        .catch(
            (error)=>{
                console.log(error);
            }
        )
    }

    const jwtTestLogOut=async()=>{
        alert('로그아웃!');

        await axios.post('/api/jwt_test/log_out')
        .then(
            (response)=>{
                console.log(response);
                setIsLoggedIn(false);
            }
        )
        .catch(
            (error)=>{
                console.log(error);
            }
        )
    }

    const jwtAccessTokenLookUp=async()=>{
        alert('액세스 토큰 조회!');

        await axios.get('/api/jwt_test/access_token')
        .then(
            (response)=>{
                console.log(response);
            }
        )
        .catch(
            (error)=>{
                console.log(error);
            }
        )
    }

    const jwtRefreshTokenLookUp=async()=>{
        alert('리프레시 토큰 조회!');

        await axios.get('/api/jwt_test/refresh_token')
        .then(
            (response)=>{
                console.log(response);
            }
        )
        .catch(
            (error)=>{
                console.log(error);
            }
        )
    }

    return(
        <div id='jwt-test-page'>
            <div id='jwt-login'>
                <h1>로그인</h1>
                {
                    isLoggedIn===true?
                    <div id='jwt-login-true'>
                        <div id='id-row'>
                            <span>아이디:</span>
                            <span></span>
                        </div>
                        <div id='name-row'>
                            <span>이름:</span>
                            <span></span>
                        </div>
                        <div id='loggedin-row'>
                            <span>로그인여부:</span>
                            <span></span>
                        </div>
                        <button onClick={jwtTestLogOut}>로그아웃</button>  
                    </div>
                    :
                    <div id='jwt-login-false'>
                        <input type="text" placeholder='아이디' id="id" />
                        <input type="password" placeholder='비밀번호' id="pw" />
                        <button onClick={jwtTestLogin}>로그인</button>    
                    </div>
                }
            </div>
            <div id='access-token-info'>
                <h1>
                    액세스 토큰 유효시간 <button onClick={jwtAccessTokenLookUp}>조회</button> 
                </h1>
                <div id='access-token-current'>
                    <span>현재날짜:</span>
                    <span>{currentDate}</span>
                </div>
                <div id='access-token-expired'>
                    <span>만료날짜:</span>
                    <span></span>
                </div>
                <div id='access-token-left'>
                    <span>남은시간:</span>
                    <span></span>
                </div>    
            </div>
            <div id='refresh-token-info'>
                <h1>
                    리프레시 토큰 유효시간 <button onClick={jwtRefreshTokenLookUp}>조회</button> 
                </h1>
                <div id='refresh-token-current'>
                    <span>현재날짜:</span>
                    <span>{currentDate}</span>
                </div>
                <div id='refresh-token-expired'>
                    <span>만료날짜:</span>
                    <span></span>
                </div>
                <div id='refresh-token-left'>
                    <span>남은시간:</span>
                    <span></span>
                </div> 
            </div>
        </div>
    )
}

export default JwtTokenTestPage;