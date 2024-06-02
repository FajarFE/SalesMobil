"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Navbar } from "../navbar";

export const HeroSection = () => {
	const DataNavbar = [
		{ link: "product", title: "Cars" },
		{ link: "testimoni", title: "Testimoni" },
		{ link: "solution", title: "Solusi" },
	];
	return (
		<div className='w-full h-screen  min-h-[800px] max-h-[911px]  relative mx-auto  bg-gradient-to-br from-[#F2F1F0] to-[#C2B292] overflow-hidden'>
			<Navbar
				className='w-full max-w-8xl py-5 -mb-[92px] text-lg uppercase font-bold flex-row z-50 relative flex justify-between items-center container mx-auto'
				data={DataNavbar}
				nama='Honda Tulungagung'
			/>
			<div className='grid md:grid-cols-3 lg:grid-cols-3  w-full max-w-12xl mx-auto container'>
				<div className='flex col-span-2 justify-start mt-20 items-start pt-20 w-full h-full'>
					<div className='flex flex-col w-full h-full gap-10'>
						<div className='text-8xl leading-tight font-bold pr-[200px]'>
							TEMUKAN MOBIL IMPIAN ANDA DI SINI
						</div>
						<div className='flex flex-col gap-2'>
							<div className='pr-[200px] text-lg font-reguler'>
								Temukan mobil impian Anda dengan mudah di sini! Kami menawarkan
								berbagai pilihan merek dan model untuk memenuhi kebutuhan Anda.
								Cari dan temukan mobil idaman Anda dalam hitungan menit.
							</div>
							<div className='pr-[200px] text-lg font-bold'>
								Jelajahi koleksi kami sekarang!
							</div>
						</div>
						<div className='flex flex-row gap-4 '>
							<Button className='text-lg rounded-full py-6 px-5 font-bold '>
								Cari Mobil
							</Button>
							<Button className='text-lg rounded-full py-6 px-5 bg-transparent border-2 hover:text-white border-black text-black font-bold'>
								Hubungi Kami
							</Button>
						</div>
					</div>
				</div>
				<div className='w-full h-full relative '>
					<div className='w-full h-full absolute right-[110px]'>
						<span className='absolute w-10 h-[400px] border-l-black border-l-[5px] top-[571px] rotate-[62deg] left-[90px]'></span>
						<span className='absolute w-[500px] rounded-[54px] bg-white left-[90px] h-[320px] top-[150px]'>
							<div className='w-full h-full relative'>
								<Image
									alt='awodkaod'
									width={940} //
									height={780}
									src='https://stat.overdrive.in/wp-content/odgallery/2018/05/42332_2018_Hyundai_Creta_2.jpg'
									className='w-[800px]  h-[322px] rounded-[59px] top-[0px] absolute'
								/>
								<Image
									alt='awodkaod'
									width={100}
									height={100}
									src='/assets/imageHero.svg'
									className='w-[800px] z-10  h-[500px] -top-[90px] absolute'
								/>
								<span className='w-10 h-10 rounded-full bg-black top-[490px] left-[180px] z-10 absolute'>
									<div className='relative w-full h-full flex justify-center items-center'>
										<span className='absolute w-[400px] h-2 left-0 border-b-[4px] border-black'>
											<div className='h-full w-full relative justify-end items-end flex'>
												<span className='absolute left-[310px] w-[600px] bottom-[208px] -rotate-[45deg] h-2  border-b-[4px] border-black '></span>
											</div>
										</span>
									</div>
								</span>
								<span className='w-10 h-[180px]  top-[330px] left-[197px] z-10 absolute border-l-[4px] border-black'></span>
								<span className='w-10 h-[100px]  -top-[80px] left-[197px] z-10 absolute border-l-[4px] border-black'></span>
							</div>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
