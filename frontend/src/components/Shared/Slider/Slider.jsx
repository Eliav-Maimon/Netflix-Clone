// import Slider from "react-slick";
// import './slider.css'
// import {PropTypes, useState} from '../../../imports'

// const Slider1 = ({ data, title }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);


//   const settings = {
//     lazyLoad: "ondemand",
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     dots: false,
//     // nextArrow: (
//     //     <div>
//     //       <div className="next-slick-arrow">
//     //           <img  stroke="white" height="24"  width="24"/><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/>
//     //       </div>
//     //     </div>
//     //   ),

//     // prevArrow: (
//     //     <div>
//     //       <div className="next-slick-arrow rotate-180">
//     //         <img  stroke="white" height="24"  width="24"/><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/>
//     //       </div>
//     //     </div>
//     //   ),
//     infinite: true,
//     speed: 200,
//     autoplay: false,
//     autoplaySpeed: 3000,
//     arrows: true,
//     beforeChange: (current, next) => setCurrentIndex(next),
//   };

//   if (!data || data.length === 0) {
//     return null;
//   }



//   return (
//     <div>
//       <p>{title}</p>
//       <Slider {...settings}>
//         {data.map((item, index) => (
//           <div key={index}>
//             <img className="sliderImg" src={item.imgVertical} alt={`content ${index}`} />
//           </div>
//         ))}
//       </Slider>
//       {/* <div className="current-slide">Current Slide: {currentIndex + 1}</div> */}
//     </div>
//   );
// };


// Slider1.propTypes = { data: PropTypes.array, title: PropTypes.string };
// export default Slider1;












import Slider from "react-slick";
import './slider.css';
import { PropTypes, useState } from '../../../imports';
import YouTube from 'react-youtube';

const Slider1 = ({ data, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    lazyLoad: "ondemand",
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    speed: 200,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div>
      <p id="titleSlider">{title}</p>
      <Slider {...settings}>
        {data.map((item, index) => (
          <div key={index}>
            {/* <iframe className="sliderImg" src={item.trailer} alt={`content ${index}`} /> */}
            {/* <YouTube videoId={item.trailer} /> */}
          </div>
        ))}
      </Slider>
      {/* <div className="current-slide">Current Slide: {currentIndex + 1}</div> */}
    </div>
  );
};


Slider1.propTypes = { data: PropTypes.array, title: PropTypes.string };
export default Slider1;
