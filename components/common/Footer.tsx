import '../../css/common/Footer.css';

function Footer(){
    return(
        <footer id="footer">
                <div id="logo">
                    <img src={'/images/foot_logo.png'}/>
                </div>
                <div id="copyright">
                    <ul>
                        <li>
                            상호:주식회사 애니플러스
                        </li>
                        <li>
                            대표이사:전승택
                        </li>
                        <li>
                            개인정보관리책임자 : 손혜환
                        </li>
                        <li>
                            주소 : 서울 영등포구 국제금융로 10 Three IFC 28층
                        </li>
                    </ul>
                    <ul>
                        <li>
                            사업자등록번호 : 318-81-09181 
                        </li>
                        <li>
                            통신판매업신고번호 : 제 2020-서울영등포-2089 호
                        </li>
                        <li>
                            webmaster@aniplustv.com
                        </li>
                    </ul>
                    <ul>
                        <li>
                        Copyright (c) 2020 ANIPLUS INC. All rights reserved
                        </li>
                    </ul>
                </div>
                <div id="sns">
                    <a href="#">
                        <img src='/images/sns1.png'/>
                    </a>
                    <a href="#">
                        <img src='/images/sns2.png'/>
                    </a>
                    <a href="#">
                        <img src='/images/sns3.png'/>
                    </a>
                </div>
        </footer>
    )
}

export default Footer;