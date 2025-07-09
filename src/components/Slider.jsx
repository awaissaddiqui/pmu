import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import Image1 from "../assets/IMG_0593.jpeg";
import Image2 from "../assets/cr1.jpeg";
import Image3 from "../assets/cr2.jpeg";
import Image4 from "../assets/cr3.jpeg";

const Slider = ({ isNavigation = false, isRounded = "" }) => {
    return (
        <div className="w-full">
            <Swiper
                modules={[Autoplay, Navigation]}
                navigation={isNavigation}
                autoplay={{ delay: 3000 }}
                loop={true}
                className="w-full"
            >
                {[Image2, Image1, Image3, Image4].map((image, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={image}
                            alt={`Chief Minister ${index + 1}`}
                            className={`w-full h-[500px] object-cover ${isRounded} `} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;
