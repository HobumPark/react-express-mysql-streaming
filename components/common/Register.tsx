import {useEffect,useState} from 'react';
import '../../css/common/Register.css';
import { InputChangeEvent  } from '../../types'
import axios from 'axios';
import $ from 'jquery';
import AddressPopUp from './AddressPopUp';

function Register(){
    const [id,setId]=useState('')//아이디
    const [isId, setIsId] = useState(false);//아이디 유효성검사
    const [idMessage,setIdMessage]=useState(false);//아이디 검사 메시지 박스 띄울지 여부
    const [isIdDuplicate,setIsIdDuplicate]=useState(true);//아이디 중복 여부
    
    const [nickName,setNickName]=useState('')//닉네임
    const [isNickName, setIsNickName] = useState(false);//닉네임 유효성검사
    const [nickNamemessage, setNickNameMessage] = useState(false);//닉네임 검사 메시지 박스 띄울지 여부
    const [isNickNameDuplicate,setIsNickNameDuplicate]=useState(true);//닉네임 중복 여부

    const [pw,setPw]=useState('')//패스워드
    const [pwConfirm,setPwConfirm]=useState('')//패스워드 확인
    const [isPw, setIsPw] = useState(false);//패스워드 유효성검사
    const [pwMessage, setPwMessage] = useState(false);//패스워드 검사 메시지박스 띄울지 여부

    const [phone,setPhone]=useState('')//폰번호
    const [isPhone,setIsPhone]=useState(false)//폰번호 유효성 검사
    const [phoneMessage,setPhoneMessage]=useState(false) //폰번호 검사 메시지박스 띄울지 여부

    const [email,setEmail]=useState('')//이메일
    const [isEmail,setIsEmail]=useState('')//이메일 유효성 검사
    const [emailMessage,setEmailMessage]=useState(false) //이메일 검사 메시지박스 띄울지 여부

    const [address,setAddress]=useState('')
    const [detailAddress, setDetailAddress]=useState('')

    const [allCheck,setAllCheck]=useState(false)//모든 약관 동의 체크 여부
    const [over14Check,setOver14Check]=useState(false)//14세이상 동의 체크 여부

    const [showPopUp,setShowPopUp]=useState(false);

    useEffect(()=>{

    },[])

    const idChange=(e:InputChangeEvent)=>{
        console.log(e.target.value)
        const currentId=e.target.value
        setId(currentId)
    }
    
    const idDuplicateCheck=async()=>{
        console.log('아이디 중복체크!')

        const currentId=id
        const idRegExp = /^[a-zA-z0-9]{4,12}$/;

        if (!idRegExp.test(currentId)) {
            console.log("4-12사이 대소문자 또는 숫자만 입력해 주세요!")
            setIsId(false)
            setId('')
            idMessageBoxShow("4-12사이 대소문자 또는 숫자만 입력해 주세요!",'red');
            return
        }

        const idInfo={id:id}
        await axios.post('/api/member/id/duplicate',idInfo).then(response => {
            console.log('response');
            console.log(response);
            console.log(response.data[0]);
            console.log(response.data[0].cnt);
            const count = response.data[0].cnt
            if(count===0){
                console.log('중복확인! 사용가능!')
                setIsIdDuplicate(false)
                idMessageBoxShow("중복확인! 사용 가능!",'green');
            }else if(count===1){
                console.log('중복확인! 사용 불가능!')
                idMessageBoxShow("중복확인! 사용 불가능!",'red');
                setIsIdDuplicate(true)
            }
            setIdMessage(true)
        })
        .catch(error => {
            console.error(error);
        })

        setTimeout(()=>{
            setIdMessage(false)
        },2000)
    }

    const idMessageBoxShow=(txt:string,color:string)=>{
        $("#id-message").show();
        $("#message-text-inner").css('backgroundColor',color).text(txt);
        setTimeout(()=>{
            $("#id-message").hide();
        },2000)
    }

    const idCheckMessageRender=()=>{
        return(
            <div id='id-message'>
                <span id='message-text'>
                    <span id='message-text-inner'></span>
                </span>
                <span className="tri"></span>
            </div>
        )
    }

    const nickNameChange=(e:InputChangeEvent)=>{
        console.log(e.target.value)
        const currentNickName=e.target.value
        setNickName(currentNickName)
    }

    const nickNameDuplicateCheck=async()=>{
        alert('닉네임 중복체크!')
        const nickNameRegExp = /^[가-힣]{2,6}$/
        const currentNickName=nickName

        if (!nickNameRegExp.test(currentNickName)) {
            console.log("2~6글자 사이의 한글만 입력해주세요")
            setIsNickName(false)
            setNickName('')
            nickNameMessageBoxShow("2~6글자 사이의 한글만 입력해주세요",'red');
            return
        }

        const nickNameInfo={nickName:nickName}
        await axios.post('/api/member/nickname/duplicate',nickNameInfo).then(response => {
            console.log('response');
            console.log(response);
            console.log(response.data[0]);
            console.log(response.data[0].cnt);
            const count = response.data[0].cnt
            if(count===0){
                console.log('중복확인! 사용가능!')
                setIsNickNameDuplicate(false)
                nickNameMessageBoxShow('중복확인! 사용 가능!','green');
            }else if(count===1){
                console.log('중복확인! 사용 불가능!')
                nickNameMessageBoxShow('중복확인! 사용 불가능!','red');
                setIsNickNameDuplicate(true)
            }
            setNickNameMessage(true)
        })
        .catch(error => {
            console.error(error);
        })
    }  

    const nickNameCheckMessageRender=()=>{
        return(
            <div id='nick-name-message'>
                <span id='message-text'>
                    <span id='message-text-inner'>
                    
                    </span>
                </span>
                <span className="tri"></span>
            </div>
        )
    }

    const nickNameMessageBoxShow=(txt:string,color:string)=>{
        $("#nick-name-message").show();
        $("#nick-name-message>#message-text").css('backgroundColor',color).text(txt);
        setTimeout(()=>{
            $("#nick-name-message").hide();
        },2000)   
    }

    const pwChange=(e:InputChangeEvent)=>{
        console.log(e.target.value)
        const currentPassword=e.target.value
        setPw(currentPassword)
    }

    const pwAvailCheck=()=>{
        const currentPassword=pw

        const passwordRegExp =/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        
        if (!passwordRegExp.test(currentPassword)) {
            console.log('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!','red');
            setPw('');
            setIsPw(false);
            pwMessageBoxShow('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!','red');
        } else {
            console.log('안전한 비밀번호 입니다.');
            setIsPw(true);
            pwMessageBoxShow('안전한 비밀번호 입니다.','green');
        }
    }

    const pwConfirmChange=(e:InputChangeEvent)=>{
        console.log(e.target.value)
        const currentConfirmPassword=e.target.value
        setPwConfirm(currentConfirmPassword)
    }

    const pwConfirmAvailCheck=()=>{
        console.log('pwConfirmAvailCheck')
        const currentConfirmPassword=pwConfirm
        setPwConfirm(currentConfirmPassword)

        if(pw.trim()===''){
            console.log('패스워드를 먼저 입력하세요')
            pwMessageBoxShow('패스워드를 먼저 입력하세요','red');
            return
        }

        if(currentConfirmPassword === pw ){
            setPwConfirm(currentConfirmPassword)
            pwMessageBoxShow('패스워드와 패스워드확인이 일치합니다.','green');
            setIsPw(true);
        }else{
            pwMessageBoxShow('패스워드와 패스워드확인이 불일치합니다.','red');
            setIsPw(false);
            setPwConfirm('')
        }
    }

    const pwCheckMessageRender=()=>{
        return(
            <div id='pw-message'>
                <span id='message-text'>
                    <span id='message-text-inner'>
                    
                    </span>    
                </span>
                <span className="tri"></span>
            </div>
        )
    }

    const pwMessageBoxShow=(txt:string,color:string)=>{
        $("#pw-message").show();
        $("#pw-message>#message-text").css('backgroundColor',color).text(txt);
        setTimeout(()=>{
            $("#pw-message").hide();
        },2000)   
    }

    const phoneChange=(e:InputChangeEvent)=>{
        console.log(e.target.value)
        const phoneNum=e.target.value
        setPhone(phoneNum)
    }

    const phoneAvailCheck=()=>{
        const phoneNum=phone

        const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
        if (!phoneRegExp.test(phoneNum)) {
            console.log('010-1234-1234형식으로 입력해주세요');
            phoneMessageBoxShow('010-1234-1234형식으로 입력해주세요','red');
            setPhone('');
            setIsPhone(false);
        } else {
            console.log('유효한 휴대폰 번호 입니다.');
            phoneMessageBoxShow('유효한 휴대폰 번호 입니다.','green');
            setIsPhone(true);
        }
    }

    const phoneCheckMessageRender=()=>{
        return(
            <div id='phone-message'>
                <span id='message-text'>
                    <span id='message-text-inner'>
                    
                    </span>
                </span>
                <span className="tri"></span>
            </div>
        )
    }

    const phoneMessageBoxShow=(txt:string,color:string)=>{
        $("#phone-message").show();
        $("#phone-message>#message-text").css('backgroundColor',color).text(txt);
        setTimeout(()=>{
            $("#phone-message").hide();
        },2000)   
    }

    const emailChange=(e:InputChangeEvent)=>{
        console.log(e.target.value)
        //[a-z0-9]+@[a-z]+\.[a-z]{2,3}
        const emailAddress=e.target.value
        setEmail(emailAddress)
    }

    const emailCheckMessageRender=()=>{
        return(
            <div id='email-message'>
                <span id='message-text'>
                    <span id='message-text-inner'>
                    
                    </span>
                </span>
                <span className="tri"></span>
            </div>
        )
    }
    
    const emailAvailCheck=()=>{
        const emailAddress=email
        setEmail(emailAddress)
        
        const emailRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
        if (!emailRegExp.test(emailAddress)) {
            console.log('asdf123@naver.com형태로 입력해주세요');
            setEmail('');
            emailMessageBoxShow('asdf123@naver.com형태로 입력해주세요','red');
        } else {
            console.log('유효한 이메일 주소 입니다.');
            emailMessageBoxShow('유효한 이메일 주소 입니다.','green');
        }
    }

    const emailMessageBoxShow=(txt:string,color:string)=>{
        $("#email-message").show();
        $("#email-message>#message-text").text(txt);
        setTimeout(()=>{
            $("#email-message").hide();
        },2000)   
    }

    const checkAll=()=>{
        alert('모든 약관 동의')
    }

    const check14Over=()=>{
        alert('14세 이상 체크')
    }

    const checkRegister=()=>{
        alert('회원가입 약관 동의')
    }

    const checkPersonal=()=>{
        alert('회원가입 약관 동의')
    }

    const register=()=>{
        alert('회원가입!')
    }

    const searchAddress=()=>{
        alert('주소 검색!')
        setShowPopUp(true);
    }

    return(
        <div id='register'>
            <div id='register-form'>
                <h1>
                    회원가입
                    <span>회원가입에 필요한 필수 입력사항을 입력 후 약관에 동의해주세요!</span>
                </h1>
                <ul>
                    <li id='id-row'>
                        <input type="text" placeholder='아이디' value={id} onChange={idChange}/>
                        <input type="button" value="중복확인" id="id-duplicate-check"
                        onClick={idDuplicateCheck}/>
                        {idCheckMessageRender()}
                    </li>
                    <li id='nick-row'>
                        <input type="text" placeholder='닉네임' onChange={nickNameChange}/>
                        <input type="button" value="중복확인" id="nickname-duplicate-check"
                        onClick={nickNameDuplicateCheck}/>
                        {nickNameCheckMessageRender()}
                    </li>
                    <li id='pw-row'>
                        <input type="text" placeholder='비밀번호' value={pw} onChange={pwChange} onBlur={pwAvailCheck}/>
                        <input type="text" placeholder='비밀번호 확인' value={pwConfirm} onChange={pwConfirmChange} onBlur={pwConfirmAvailCheck}/>
                        {pwCheckMessageRender()}
                    </li>
                    <li id='phone-row'>
                        <input type="text" placeholder='휴대폰번호' value={phone} onChange={phoneChange} onBlur={phoneAvailCheck}/>
                        {phoneCheckMessageRender()}
                    </li>
                    <li id='email-row'>
                        <input type="text" placeholder='이메일' value={email} onChange={emailChange} onBlur={emailAvailCheck}/>
                        {emailCheckMessageRender()}
                    </li>
                    <li id='address-row'>
                        <input type="text" placeholder='주소' value={address}/>
                        <input type="text" placeholder='상세주소' defaultValue={detailAddress}/>
                        <button onClick={searchAddress}>검색</button>
                        {
                            showPopUp===true?
                            <AddressPopUp showPopUp={showPopUp} setShowPopUp={setShowPopUp}
                                      setAddress={setAddress} setDetailAddress={setDetailAddress}/>
                            :''
                        }
                        
                    </li>     
                </ul>
                <div id='agree-box'>
                    <ul>
                        <li>
                            <input type="checkbox" id='check-all' onClick={checkAll}/>
                            <span>전체 약관 동의</span>
                        </li>
                        <hr />
                        <li>
                            <input type="checkbox" id='check-14-over' onClick={check14Over}/>
                            <span>만 14세 이상입니다</span>
                        </li>
                        <li>
                            <input type="checkbox" id='check-register' onClick={checkRegister}/>
                            <span>회원가입 약관 동의</span>
                        </li>
                        <li>
                            <input type="checkbox" id='check-personal' onClick={checkPersonal}/>
                            <span>서비스 제공을 위한 개인정보 수집/이용</span>
                        </li>
                    </ul>
                </div>
                <button id='continue' onClick={register}>계속하기</button>
                <div id='sns-register'>
                    <h1>SNS 로그인으로 가입하기</h1>
                    <div id='etc-join'>
                        <ul>
                            <li>
                                <a href="#">
                                    <img src="./images/etc_login_01.png" alt="기타로그인1" />
                                </a>
                            </li>
                            <li>
                                <a href="/login/facebook">
                                    <img src="./images/etc_login_02.png" alt="기타로그인2" />
                                </a>
                            </li>
                            <li>
                                <a href="/login/google">
                                    <img src="./images/etc_login_03.png" alt="기타로그인3" />
                                </a>
                            </li>
                            <li>
                                <a href="/login/kakao">
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
            </div>
        </div>
    )
}

export default Register;