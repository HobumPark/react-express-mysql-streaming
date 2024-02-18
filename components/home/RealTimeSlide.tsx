import '../../css/home/RealTimeSlide.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useEffect,useState} from 'react';
import axios from 'axios';

function RealTimeSlide(){
    const [realtimeSlide,setRealTimeSlide]=useState([]);

    useEffect(()=>{
        getRealTimeSlideList()
    },[])

    const getRealTimeSlideList=async()=>{
        await axios.get('/api/slide/realtime')
        .then(response => {
            console.log(response);
            setRealTimeSlide(response.data)
        })
        .catch(error => {
            console.error(error);
        })
    }

    const slideMap=realtimeSlide.map(
        (data:any)=>(<div className='real-time-slide-element'>
                        <img src={`/images/slide/${data.cover_image}`}/>
                        <h2>{data.animation_title}</h2>
                    </div>)
    )

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5
      };

    return(
        <div id='real-time-slide'>
            <Slider {...settings}>
                {slideMap}
            </Slider>
        </div>
    )
}

export default RealTimeSlide;