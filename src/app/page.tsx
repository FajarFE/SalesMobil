"use server";
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
import LandingPage from "@/components/LandingPage";
import prisma from "@/libs/db";
import { Status } from "@prisma/client";

export default async function Home() {
	const Product = await prisma.postProduct.findMany({
		where: { status: Status.PUBLISHED },
		include: {
			carBrand: true,
		},
	});

	const Testimoni = await prisma.testimonial.findMany({
		where: { status: Status.PUBLISHED },
		include: {
			carBrand: true,
		},
	});

	const Contact = await prisma.myContact.findMany({
		select: { numberPhone: true, message: true },
	});

	const dataContact = Contact[0];
	return (
		<div className='w-full h-auto '>
			<LandingPage
				dataContact={dataContact && dataContact}
				dataProduct={Product && Product}
				dataTestimoni={Testimoni && Testimoni}
			/>
		</div>
	);
}
