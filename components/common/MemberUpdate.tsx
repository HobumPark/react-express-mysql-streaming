import '../../css/common/MemberUpdate.css';
import { InputChangeEvent  } from '../../types'
import {useEffect,useState} from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import AddressPopUp from './AddressPopUp';;


function MemberUpdate(){
    const [id,setId]=useState('');//아이디
    const [name, setName]=useState('');//이름
    const [pw,setPw]=useState('');//패스워드
    const [pwConfirm,setPwConfirm]=useState('');//패스워드확인
    const [pwChange,setPwChange]=useState(false);//패스워드 변경사용 변수
    const [phone,setPhone]=useState('');//폰번호
    const [phoneFirst,setPhoneFirst]=useState('');//폰번호앞자리
    const [phoneMiddle,setPhoneMiddle]=useState('');//폰번호중간
    const [phoneLast,setPhoneLast]=useState('');//폰번호뒷자리  
    const [phoneChange,setPhoneChange]=useState(false);//폰번호 변경사용 변수

    const [email,setEmail]=useState('');//이메일
    const [emailAddress,setEmailAddress]=useState('');//이메일주소
    const [emailDomain,setEmailDomain]=useState('');//이메일도메인
    const [emailChange,setEmailChange]=useState(false);//이메일 변경사용 변수
    
    const [address,setAddress]=useState('');//주소
    const [detailAddress, setDetailAddress]=useState('');//상세주소
    const [addressChange,setAddressChange]=useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const [showPopUp,setShowPopUp]=useState(false);

    const [leftTime,setLeftTime]=useState(0);

    useEffect(()=>{
        checkAccesToken();
    },[])

    const getMemberInfo=async(id:string)=>{
        console.log('getMemberInfo');
        await axios.get(`/api/member/userInfo/${id}`)
        .then(response=>{
            console.log(response);
            console.log(response.data);
            console.log(response.data[0]);
            const {id,pw,name}=response.data[0];
            setId(id);
            setPw(pw);
            setPwConfirm(pw);
            setName(name);

            const phoneTemp=response.data[0].phone;
            const phoneSplit=phoneTemp.split('-');
            const phoneFirst=phoneSplit[0];
            const phoneMiddle=phoneSplit[1];
            const phoneLast=phoneSplit[2];

            const emailTemp=response.data[0].email;
            const emailSplit=emailTemp.split('@');
            const emailAddress=emailSplit[0];
            const emailDomain=emailSplit[1];
            
            setPhoneFirst(phoneFirst);
            setPhoneMiddle(phoneMiddle);
            setPhoneLast(phoneLast);            
            setPhone(response.data[0].phone);
            
            setEmail(emailTemp);
            setEmailAddress(emailAddress);
            setEmailDomain(emailDomain);

            setAddress(response.data[0].address)
            setDetailAddress(response.data[0].detail_address)
        })
        .catch(error=>{
            console.log(error);
        })
    }

    //패스워드
    const handlePw=(e:InputChangeEvent)=>{
        console.log('패스워드 입력!');
        setPw(e.target.value);
    }

    const handlePwConfirm=(e:InputChangeEvent)=>{
        console.log('패스워드 확인 입력!');
        setPwConfirm(e.target.value);
    }

    const changePassword=()=>{
        alert('비밀번호 변경!');
        setPwChange(!pwChange);
    }

    //폰번호
    const changePhone=()=>{
        alert('폰번호 변경!');
        setPhoneChange(!phoneChange);
    }

    const handlePhoneFirst=(e:InputChangeEvent)=>{
        setPhoneFirst(e.target.value)
    }

    const handlePhoneMiddle=(e:InputChangeEvent)=>{
        setPhoneMiddle(e.target.value)
    }

    const handlePhoneLast=(e:InputChangeEvent)=>{
        setPhoneLast(e.target.value)
    }

    //이메일
    const handleEmailAddress=(e:InputChangeEvent)=>{
        console.log('이메일 주소 입력!');
        setEmailAddress(e.target.value);
    }

    const handleEmailDomain=(e:InputChangeEvent)=>{
        console.log('이메일 도메인 입력!');
        setEmailDomain(e.target.value);
    }

    const changeEmail=()=>{
        alert('이메일 변경!');
        setEmailChange(!emailChange);
    }

    const updateAction=async()=>{
        alert('수정!')
        const updateInfo={id:id,pw:pw,phone:phone,email:email,address:address,detailAddress};

        await axios.put('/api/member/update',updateInfo)
        .then(response=>{
            console.log(response);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    const moveDelete=()=>{
        alert('삭제!');
    }

    const changeAddress=()=>{
        alert('주소 변경!');
        setAddressChange(!addressChange);
        setShowPopUp(true);
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
            
            setId(id);
            setName(name);
            getMemberInfo(id);
        }).catch(error=>{
            console.log(error);
            removeCookie('token');
            window.location.href='/';
        })
    }


    return(
        <div id='member-update'>
            <div id='member-update-form'>
                <h1>회원정보 수정</h1>
                <div id='id-row'>
                    <span>아이디:</span>
                    <input type='text' value={id} disabled={true}/>
                </div>
                <div id='pw-row'>
                    <span>비밀번호:</span>
                    <input type='text'  defaultValue={pw} onChange={handlePw}
                    className={pwChange===true? 'input-active':''}
                    disabled={pwChange===true? false:true}/>
                    <input type='text' defaultValue={pwConfirm} onChange={handlePwConfirm}
                    className={pwChange===true? 'input-active':''}
                    disabled={pwChange===true? false:true}/>
                    <button onClick={changePassword}>변경</button>
                </div>
                <div id='name-row'>
                    <span>이름:</span>
                    <input type='text'  value={name} disabled={true}/>
                </div>
                <div id='phone-row'>
                    <span>휴대폰:</span>
                    <input type='text' defaultValue={phoneFirst}
                    onChange={handlePhoneFirst}
                    className={phoneChange===true? 'input-active':''}
                    disabled={phoneChange===true? false:true}/>
                    <span>-</span>
                    <input type='text' defaultValue={phoneMiddle}
                    onChange={handlePhoneMiddle}
                    className={phoneChange===true? 'input-active':''}
                    disabled={phoneChange===true? false:true}/>
                    <span>-</span>
                    <input type='text' defaultValue={phoneLast}
                    onChange={handlePhoneLast}
                    className={phoneChange===true? 'input-active':''}
                    disabled={phoneChange===true? false:true}/>
                    <button onClick={changePhone}>변경</button>
                </div>
                <div id='email-row'>
                    <span>이메일:</span>
                    <input type='text' defaultValue={emailAddress} onChange={handleEmailAddress}
                    className={emailChange===true? 'input-active':''}
                    disabled={emailChange===true? false:true}/>
                    <span>@</span>
                    <input type='text' defaultValue={emailDomain} onChange={handleEmailDomain}
                    className={emailChange===true? 'input-active':''}
                    disabled={emailChange===true? false:true}/>
                    <button onClick={changeEmail}>변경</button>
                </div>
                <div id='address-row'>
                    <span>주소:</span>
                    <input type='text' id='address' value={address}
                    className={addressChange===true? 'input-active':''}/> <button onClick={changeAddress}>주소변경</button> <br/>
                    <input type='text' id='detail-address' defaultValue={detailAddress}
                    className={addressChange===true? 'input-active':''}/>
                    {
                            showPopUp===true?
                            <AddressPopUp showPopUp={showPopUp} setShowPopUp={setShowPopUp}
                                      setAddress={setAddress} setDetailAddress={setDetailAddress}/>
                            :''
                    }
                </div>
                <div id='btn-row'>
                    <button onClick={updateAction}>수정</button>
                    <button onClick={moveDelete}>회원탈퇴</button>
                </div>
            </div>
        </div>
    )
}

export default MemberUpdate;