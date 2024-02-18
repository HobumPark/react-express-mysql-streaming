import '../../css/common/LoginRouter.css'
import {Routes, Route} from 'react-router-dom';
import Login from './Login';
import FacebookLoginPage from './etc_login/FacebookLoginPage';
import GoogleLoginPage from './etc_login/GoogleLoginPage';
import KakaoLoginPage from './etc_login/KakaoLoginPage';

function LoginRouter(){
    return(
        <div id='login-router'>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/facebook' element={<FacebookLoginPage/>}/>
                <Route path='/google' element={<GoogleLoginPage/>}/>
                <Route path='/kakao' element={<KakaoLoginPage/>}/>
            </Routes>
        </div>
    )
}

export default LoginRouter;