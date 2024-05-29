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

interface carBrand {
	name: string;
}

interface Product {
	id: string;
	title: string;
	price: string;
	image: string;
	category: carBrand;
}

interface Slide {
	testimoni: string;
	customer: string;
	image?: string;
}

interface ProductProps {
	dataProduct: Product[];
	dataTestimoni: Slide[];
}
export default async function Home({
	dataProduct,
	dataTestimoni,
}: ProductProps) {
	const DataNavbar = [
		{ link: "product", title: "Cars" },
		{ link: "testimoni", title: "Testimoni" },
		{ link: "solution", title: "Solusi" },
	];

	const DataTestimoni = [
		{
			testimoni: "waokdoadoadoadko",
			customer: "Anjay",
			image: "OAWWDKOADO",
		},
		{
			testimoni: "waokdoadoadoadko",
			customer: "Anjay",
			image: "OAWWDKOADO",
		},
	];

	const DataProduct = [
		{
			id: "oawkdoadoa",
			title: "oawkdoakdoad",
			price: "oawkdoadoa",
			image: "oawkdoadoaaowdka",
			category: {
				name: "waodkoawdo",
			},
		},
	];
	return (
		<div className='w-full h-auto '>
			<Element name='home'>
				<HeroSection />
			</Element>
			<Element name='solution'>
				<CarsView />
			</Element>
			<Element name='testimoni'>
				<div className='w-full h-auto -mb-[10px] container w-max-7xl'>
					<div
						style={{ backgroundSize: "100%" }}
						className='w-full h-full bg-testimonial bg-no-repeat'>
						<SliderTestimoni data={DataTestimoni} />
					</div>
				</div>
			</Element>
			<Element name='product'>
				<div className='w-full h-[700px] relative overflow-hidden '>
					<div className=' container w-full w-max-7xl bg-product bg-no-repeat'>
						<ProductSection data={dataProduct} />
					</div>
					<div className='h-[625px] w-[50%] right-0 bottom-0 bg-[#E2DDD6] absolute'></div>
					<div className='h-[700px] w-[50%] left-0 bottom-0 bg-[#E2DDD6] absolute'></div>
				</div>
			</Element>
			<Element name='contact'>
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
