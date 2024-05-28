"use client"; // <===== REQUIRED

import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// Swiper components, modules, and styles
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { RiDoubleQuotesL } from "react-icons/ri";
interface Slide {
	id: number;
	title: string;
	tagline: string;
	image: string;
	buttons: ButtonProps[];
}

interface ButtonProps {
	id: number;
	text: string;
	link: string;
	type: string;
}

interface DemoSliderProps {
	data: Slide[];
}

const DemoSlider: React.FC<DemoSliderProps> = ({ data }) => {
	const [swiper, setSwiper] = useState<SwiperClass | null>(null);
	const prevRef = useRef(null);
	const nextRef = useRef(null);

	return (
		<div className='h-[505px] w-full relative'>
			<div className='w-[70%] h-full absolute left-[40px] -top-[550px]'>
				<Image
					width={100}
					height={100}
					className='w-full h-full'
					src='/assets/1.svg'
					alt='adeh'
				/>
			</div>
			<span className='h-[200px] w-10 border-r-[6px] -top-[135px] left-[5px] border-black absolute'></span>
			<div className='w-auto h-auto flex flex-row absolute'>
				<div className='w-20 h-20 bg-black rounded-full'></div>
				<div className='p-2 border-[4px] bg-[#E2DDD6] border-black rounded-full absolute left-[60px]'>
					<RiDoubleQuotesL size={56} />
				</div>
			</div>
			<Swiper
				onSwiper={setSwiper}
				effect={"fade"}
				navigation={{
					prevEl: prevRef.current,
					nextEl: nextRef.current,
				}}
				className='h-full'
				modules={[Navigation, Pagination, EffectFade]}>
				{data.map((data, index) => (
					<SwiperSlide key={index}>
						{({ isActive }) =>
							isActive && (
								<>
									<div className='flex flex-col h-full'>
										<div className='grid grid-cols-12 h-full w-full'>
											<div className='col-span-9 w-full h-full flex flex-col relative items-center gap-10'>
												<div className='text-6xl py-5 pl-[180px] font-bold'>
													WHAT CUSTOMER SAY
												</div>
												<div className='flex flex-col justify-between items-center w-full h-[51%]'>
													<div className='text-2xl py-5 pl-[50px] pr-[80px] font-reguler'>
														Lorem ipsum dolor sit amet consectetur, adipisicing
														elit. Voluptates voluptatem quo autem, dolores
														natus, dicta libero placeat animi reprehenderit
														deserunt eligendi. Pariatur architecto a illum neque
														dignissimos quo quos soluta.
													</div>
													<div className='flex justify-start  font-bold text-2xl items-start w-full pl-[50px] pr-[70px]'>
														Fajar Fernandi
													</div>
												</div>

												<span className=' absolute border-b-[1px] border-[#A89A89] w-[50%] top-[100px] right-[170px]'></span>
											</div>
											<div className='col-span-3 w-full h-full pr-12 py-12 relative'>
												<div className='rounded-3xl bg-[#A89A89] h-full relative flex w-full'>
													<span className='h-20 w-20 rounded-3xl bg-[#A89A89] absolute bottom-0 left-[30px] z-[100]'></span>
													<span className='h-20 w-20 rounded-3xl bg-[#A89A89] absolute bottom-[28px] left-[0] z-[100]'></span>
													<span className='h-[20px] rotate-45 w-[67px] rounded-3xl bg-[#A89A89] absolute bottom-[17px] -left-1 z-[100]'></span>
												</div>
												<span className='w-[40%] rotate-45 h-[40px] bg-[#E2DDD6] z-5 absolute bottom-[50px] left-[-65px]'></span>
											</div>
										</div>
									</div>
								</>
							)
						}
					</SwiperSlide>
				))}
			</Swiper>
			<div className='absolute  right-[60px] flex gap-5 bottom-[60px]  z-10'>
				<button className='bg-[#E2DDD6] p-2  rounded-full ' ref={nextRef}>
					<FaArrowLeft color='#A89A89' size='25' />
				</button>
				<button ref={prevRef} className='bg-[#E2DDD6] p-2  rounded-full '>
					<FaArrowRight color='#A89A89' size='25' />
				</button>
			</div>
		</div>
	);
};

export default DemoSlider;
