import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import DemoSlider from "@/components/sliderTestimoni";
import { ProductSection } from "@/components/productSection";
import { CarsView } from "@/components/carsView";
import { PinContainer } from "@/components/Pin";
import { HeroSection } from "@/components/heroSection";

const data = [
	{
		id: 1,
		title: "ARE AWESOME",
		tagline: "NEXTJS 13 & SWIPER SLIDER",
		image: "/image1.jpg",
		buttons: [
			{
				id: 1,
				text: "Roberto Nickson",
				link: "https://www.pexels.com/@rpnickson/",
				type: "btn-dark btn-circle",
			},
		],
	},
	{
		id: 2,
		title: "GIVE IT A SHOOT",
		tagline: "IF YOU LIKE IT",
		image: "/image2.jpg",
		buttons: [
			{
				id: 1,
				text: "Julia M Cameron",
				link: "https://www.pexels.com/@julia-m-cameron/",
				type: "btn-dark btn-circle",
			},
		],
	},
];

export default function Home() {
	return (
		<div className='w-full h-auto '>
			<HeroSection />
			<CarsView />
			<div className='w-full h-auto -mb-[10px] container w-max-7xl'>
				<div
					style={{ backgroundSize: "100%" }}
					className='w-full h-full bg-testimonial bg-no-repeat'>
					<DemoSlider data={data} />
				</div>
			</div>
			<div className='w-full h-[700px] relative overflow-hidden '>
				<div className=' container w-full w-max-7xl bg-product bg-no-repeat'>
					<ProductSection />
				</div>
				<div className='h-[625px] w-[50%] right-0 bottom-0 bg-[#E2DDD6] absolute'></div>
				<div className='h-[700px] w-[50%] left-0 bottom-0 bg-[#E2DDD6] absolute'></div>
			</div>
		</div>
	);
}
