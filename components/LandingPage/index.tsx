"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SliderTestimoni from "@/components/sliderTestimoni";
import { ProductSection } from "@/components/productSection";
import { CarsView } from "@/components/carsView";
import { PinContainer } from "@/components/Pin";
import { HeroSection } from "@/components/heroSection";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Element } from "react-scroll";
import { title } from "process";
import { useEffect } from "react";

interface carBrand {
	name: string;
}

interface Product {
	id: string;
	title: string;
	price: string;
	image: string;
	carBrand: carBrand | null;
}

interface Slide {
	testimoni: string;
	customer: string;
	image?: string;
	carBrand: carBrand | null;
}

interface ProductProps {
	dataProduct: Product[];
	dataTestimoni: Slide[];
}
export default function LandingPage({
	dataProduct,
	dataTestimoni,
}: ProductProps) {
	const DataNavbar = [
		{ link: "product", title: "Cars" },
		{ link: "testimoni", title: "Testimoni" },
		{ link: "solution", title: "Solusi" },
	];
	return (
		<div className='w-full h-auto '>
			<Element name='home' id='home'>
				<HeroSection />
			</Element>
			<Element name='solution' id='solution'>
				<CarsView />
			</Element>
			<Element name='testimoni' id='testimoni'>
				<div className='w-full h-auto -mb-[10px] container w-max-7xl'>
					<div
						style={{ backgroundSize: "100%" }}
						className='w-full h-full bg-testimonial bg-no-repeat'>
						<SliderTestimoni data={dataTestimoni && dataTestimoni} />
					</div>
				</div>
			</Element>
			<Element name='product' id='product'>
				<div className='w-full h-[700px] relative overflow-hidden '>
					<div className=' container w-full w-max-7xl bg-product bg-no-repeat'>
						<ProductSection data={dataProduct && dataProduct} />
					</div>
					<div className='h-[625px] w-[50%] right-0 bottom-0 bg-[#E2DDD6] absolute'></div>
					<div className='h-[700px] w-[50%] left-0 bottom-0 bg-[#E2DDD6] absolute'></div>
				</div>
			</Element>
			<Element id='contact' name='contact'>
				<Contact />
			</Element>
			<Footer
				name='Honda Tulungagung'
				alamat='apwdlpadpadpadlpda'
				menu={DataNavbar}
			/>
		</div>
	);
}
