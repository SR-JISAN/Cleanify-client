import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import slideA from "../../assets/slideA.png"
import slideB from "../../assets/slideB.png"
import slideC from "../../assets/slideC.png"

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const Banner = () => {
    return (
      <div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="rounded-2xl shadow-xl"
        >
          <SwiperSlide>
            <div className="relative">
              <img
                src={slideA}
                alt="bird having healthy food"
                className="w-full h-[500px] object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-black/40 rounded-2xl flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl lg:text-4xl font-bold mb-2">
                  Garbage Problem in Our Community
                </h2>
                <p className="text-lg text-gray-200">
                  Highlight the impact of littering and waste buildup on health,
                  environment, and quality of life.
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative">
              <img
                src={slideB}
                alt="Pet grooming in winter"
                className="w-full h-[500px] object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-black/40 rounded-2xl flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl lg:text-4xl font-bold mb-2">
                  Community Cleanup Initiatives
                </h2>
                <p className="text-lg">
                  Showcase local efforts and volunteers working together to
                  clean streets, parks, and public spaces.
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative">
              <img
                src={slideC}
                alt="Healthy pet food"
                className="w-full h-[500px] object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-black/40 rounded-2xl flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl lg:text-4xl font-bold mb-2">
                  Promoting Sustainable Action
                </h2>
                <p className="text-lg">
                  Emphasize recycling, waste reduction, and long-term
                  sustainable practices for a cleaner environment.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    );
};

export default Banner;