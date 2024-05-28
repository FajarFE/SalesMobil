"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { CardProduct } from "../cardProduct";
import { FaArrowRight } from "react-icons/fa";

// import required modules
import { Pagination } from "swiper/modules";
import Link from "next/link";

export const ProductSection = () => {
	return (
		<div className='w-full h-auto flex flex-col gap-10  z-[200]'>
			<div className='flex flex-row justify-between items-center pt-10 pr-[450px] pl-10  z-20'>
				<div className='text-4xl font-bold'>
					<div>CARI MOBIL TERBAIK </div>
					<div>DARI SHOOWROOM KAMI</div>
				</div>
				<Link href='#' className='p-4 rounded-full bg-black -rotate-45'>
					<FaArrowRight size={37} color={"#E2DDD6"} />
				</Link>
			</div>
			<div className='w-full h-auto z-20 ml-[40px]'>
				<Swiper
					slidesPerView={3}
					pagination={{
						clickable: true,
					}}>
					<SwiperSlide>
						<div className='px-8'>
							<CardProduct />
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className='px-8'>
							<CardProduct />
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className='px-8'>
							<CardProduct />
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className='px-8'>
							<CardProduct />
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className='px-8'>
							<CardProduct />
						</div>
					</SwiperSlide>
				</Swiper>
			</div>
		</div>
	);
};
