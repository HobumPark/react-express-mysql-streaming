import {useEffect,useState} from 'react';
import '../../css/common/Login.css';
import axios from 'axios';
import { useCookies } from 'react-cookie'; // useCookies import

function Login(){

    const [id,setId]=useState('')
    const [pw,setPw]=useState('')
    const [idSave, setIdSave]=useState(false)
    const [cookies, setCookie] = useCookies(['token']); // 쿠키 훅 

    useEffect(()=>{

    },[])

    const moveRegister=()=>{
        window.location.href='/register'
    }

    const idChange=(e:any)=>{
        console.log(e.target.value)
        setId(e.target.value)
    }

    const pwChange=(e:any)=>{
        console.log(e.target.value)
        setPw(e.target.value)
    }

    const saveId=()=>{
        alert('아이디 기억하기!')
    }

    const login=async()=>{
        alert('로그인!')
        if(id.trim() ===''){
            alert('아이디를 입력하세요!')
            return
        }
        if(pw.trim() ===''){
            alert('패스워드를 입력하세요!')
            return
        }
        const userInfo={id:id,pw:pw}
        console.log('서버에 전송!')
        await axios.post('/api/member/login',userInfo).then(response => {
            console.log('response');
            console.log(response);

            let status='';
            let accessToken='';
            let refreshToken='';

            if(response.data.hasOwnProperty('status')===true){
                status = response.data.status;
                accessToken = response.data.accessToken;

                console.log('status존재!')

                if( Number(status) === 200){
                    console.log('로그인 성공!');
                    console.log(accessToken);

                    setCookie('token', accessToken);//

                    //saveRefreshToken(id);

                    window.location.href='/';
                }
            }

        })
        .catch(error => {
            let status=''
            console.log('오류처리')
            console.error(error);
            if(error.response.data.hasOwnProperty('status')===true){
                status = error.response.data.status
                console.log('status존재!')
                if( Number(status) === 401){
                    console.log('아이디가 존재하지 않음!')
                    return
                }else if( Number(status) === 402){
                    console.log('비밀번호 불일치!')
                    return
                }
            }    
        })
    }

    const saveRefreshToken=async(id:string)=>{
        console.log('saveRefreshToken');
        console.log('id');
        console.log(id);
        console.log('moment');
        const info={id:id};
        await axios.post('/api/member/save/refresh',info)
        .then(
            response=>{
                console.log(response);
            }
        )
        .catch(err=>{
            console.log(err);
        })
    }


    return(
        <div id='login'>
           <div id='login-form'>
                <h1>로그인</h1>
                <div id='login-input'>
                    <input type='text' placeholder='아이디를 입력하세요' onChange={idChange}/>
                    <input type='password' placeholder='비밀번호 (5~20자 영문, 숫자입력)' onChange={pwChange}/>
                </div>
                <div id='div-btn'>
                    <input type="checkbox" id='save-id' onClick={saveId}/>
                    <label htmlFor="save-id">아이디 기억하기</label>
                    <span id='id-pw-find'>ID/PW찾기</span>
                </div>
                <div id='login-btn'>
                    <button onClick={login}>로그인</button>
                </div>
                <div id='etc-login'>
                    <h1>다른방법으로 로그인하기(회원가입시 등록된 계정으로만 가능)</h1>
                    <div id='etc-login-btn-wrap'>
                        <ul>
                            <li>
                                <a href="#">
                                    <img src="./images/etc_login_01.png" alt="기타로그인1" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="./images/etc_login_02.png" alt="기타로그인2" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="./images/etc_login_03.png" alt="기타로그인3" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="./images/etc_login_04.png" alt="기타로그인4" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="./images/etc_login_05.png" alt="기타로그인5" />
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
                <div id='join'>
                    <h1>ANIPLUS 회원이 아니신가요?</h1>
                    <button onClick={moveRegister}>지금 회원가입하세요</button>
                </div>
           </div>
        </div>
    )
}

export default Login;