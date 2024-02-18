import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useEffect,useState} from 'react';
import axios from 'axios';
import '../../css/home/HomeSlide.css';

function HomeSlide(){
    const [homeSlideList,setHomeSlideList]=useState([]);

    useEffect(()=>{
        getHomeSlideList()
    },[])

    const getHomeSlideList=async()=>{
        await axios.get('/api/slide/list').then(response => {
        console.log(response);
        setHomeSlideList(response.data)
        })
        .catch(error => {
        console.error(error);
        })
    }

    const slideMap=homeSlideList.map(
        (data:any)=>(<div className='slide-element'>
                        <img src={`/images/slide/${data.slide_img}`}/>
                    </div>)
    )

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    return(
        <div id='home-slide'>
            <Slider {...settings}>
                {slideMap}
            </Slider>
        </div>
    )
}

export default HomeSlide;