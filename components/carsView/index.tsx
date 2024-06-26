"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Ri24HoursLine, RiExchange2Fill } from "react-icons/ri";
import {
	MdOutlineHomeRepairService,
	MdOutlineManageSearch,
} from "react-icons/md";
import { FaHandshake } from "react-icons/fa";
import { SiAdguard } from "react-icons/si";
export const CarsView = () => {
	return (
		<div className='w-screen h-screen mb-[700px] mt-[150px] min-h-[800px] max-h-[1000px] relative w-max-7xl container mx-auto '>
			<div className='my-20 text-6xl text-center w-full px-[200px] flex justify-center items-center relative h-auto'>
				<div>KAMI MENJAMIN PENGALAMAN PELANGGAN TERBAIK</div>
				<Image
					width='100'
					height='100'
					alt='waodkaod'
					src='/assets/carstitle.svg'
					className='absolute bottom-[35px] h-[405px] w-[605px]'
				/>
			</div>
			<div className='w-full h-full absolute grid grid-rows-3 pl-[100px] pr-[220px]'>
				<div className='justify-between items-center flex'>
					<div className=' h-auto flex-col flex relative justify-center items-start '>
						<div className='text-left relative w-auto'>
							<div className='absolute -top-[18px] left-[20px] gap-4 flex flex-col w-[190px]'>
								<Ri24HoursLine size={50} />
								<div className='text-xl font-bold'>
									24/7 Jam Pelayanan Customer{" "}
								</div>
							</div>
							<span className='border-t-[4px] left-[100px] top-[8px] border-black w-[70px] absolute'></span>
							<span className='border-t-[4px] rotate-[42deg] left-[155px] top-[41px] border-black w-[100px] absolute'></span>
							<span className='border-[3px] border-black w-5 h-5  flex bg-transparent rounded-full top-[70px] absolute left-[240px] '></span>
						</div>
					</div>
					<div className=' h-auto flex-col flex justify-center items-end '>
						<div className='text-left relative w-auto'>
							<div className='absolute -top-[18px] left-[20px] gap-4 flex flex-col w-[190px]'>
								<MdOutlineManageSearch size={50} />
								<div className='text-xl text-right font-bold relative w-full'>
									<div className='right-[140px] w-full absolute'>
										Feature Mudah Dicari
									</div>
								</div>
							</div>
							<span className='border-t-[4px] -left-[80px] top-[8px] border-black w-[70px] absolute'></span>
							<span className='border-t-[4px] -rotate-[42deg] -left-[167px] top-[41px] border-black w-[100px] absolute'></span>
							<span className='border-[3px] border-black w-5 h-5  flex bg-transparent rounded-full top-[70px] absolute -left-[170px] '></span>
						</div>
					</div>
				</div>
				<div className='justify-between items-center flex'>
					<div className=' h-auto flex-col flex justify-center items-start '>
						<div className='text-left relative w-auto'>
							<div className='absolute -top-[18px] left-[20px] gap-4 flex flex-col w-[190px]'>
								<FaHandshake size={50} />
								<div className='text-xl font-bold'>
									Profesional Team Negoisasi
								</div>
							</div>

							<span className='border-t-[4px] left-[100px] top-[8px] border-black w-[70px] absolute'></span>
							<span className='border-t-[4px] rotate-[42deg] left-[155px] top-[41px] border-black w-[100px] absolute'></span>
							<span className='border-[3px] border-black w-5 h-5  flex bg-transparent rounded-full top-[70px] absolute left-[240px] '></span>
						</div>
					</div>
					<div className=' h-auto flex-col flex justify-center items-end '>
						<div className='text-left relative w-auto'>
							<div className='absolute -top-[18px] left-[20px] gap-4 flex flex-col w-[190px]'>
								<RiExchange2Fill size={50} />
								<div className='text-xl text-right font-bold relative w-full'>
									<div className='right-[140px] w-full absolute'>
										Jual Beli Disatu Tempat
									</div>
								</div>
							</div>

							<span className='border-t-[4px] -left-[80px] top-[8px] border-black w-[70px] absolute'></span>
							<span className='border-t-[4px] -rotate-[42deg] -left-[167px] top-[41px] border-black w-[100px] absolute'></span>
							<span className='border-[3px] border-black w-5 h-5  flex bg-transparent rounded-full top-[70px] absolute -left-[170px] '></span>
						</div>
					</div>
				</div>
				<div className='justify-between items-center flex'>
					<div className=' h-auto flex-col flex justify-center items-start '>
						<div className='text-left relative w-auto'>
							<div className='absolute -top-[18px] left-[20px] gap-4 flex flex-col w-[190px]'>
								<MdOutlineHomeRepairService size={50} />
								<div className='text-xl font-bold'>
									Jasa Perbaikan Setelah Membeli
								</div>
							</div>

							<span className='border-t-[4px] left-[100px] top-[8px] border-black w-[70px] absolute'></span>
							<span className='border-t-[4px] rotate-[42deg] left-[155px] top-[41px] border-black w-[100px] absolute'></span>
							<span className='border-[3px] border-black w-5 h-5  flex bg-transparent rounded-full top-[70px] absolute left-[240px] '></span>
						</div>
					</div>
					<div className=' h-auto flex-col flex justify-center items-end '>
						<div className='text-left relative w-auto'>
							<div className='absolute -top-[18px] left-[20px] gap-4 flex flex-col w-[190px]'>
								<SiAdguard size={50} />
								<div className='text-xl text-right font-bold relative w-full'>
									<div className='right-[140px] w-full absolute'>
										Garansi Terpercaya
									</div>
								</div>
							</div>
							<div></div>
							<span className='border-t-[4px] -left-[80px] top-[8px] border-black w-[70px] absolute'></span>
							<span className='border-t-[4px] -rotate-[42deg] -left-[167px] top-[41px] border-black w-[100px] absolute'></span>
							<span className='border-[3px] border-black w-5 h-5  flex bg-transparent rounded-full top-[70px] absolute -left-[170px] '></span>
						</div>
					</div>
				</div>
			</div>
			<div
				className='rotate-90 mb-[2000px] z-[200] h-full relative'
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Image
					src='https://hyundaimobil.co.id/vehicle/assets/images/ioniq-5/interior-color.png'
					alt='Interior Color'
					width={940} // specify the width of the image
					className='absolute left-[250px] z-[200] top-[220px]'
					height={780} // specify the height of the image
				/>
			</div>
			<div
				style={{
					perspective: "1000px",
					transform: " translateZ(0)",
				}}
				className='absolute left-[710px] top-[500px] ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2 '>
				<>
					<motion.div
						initial={{
							opacity: 0,
							scale: 0,
							x: "-50%",
							y: "-50%",
						}}
						animate={{
							opacity: [0, 1, 0.5, 0],
							scale: 1,

							z: 0,
						}}
						transition={{
							duration: 6,
							repeat: Infinity,
							delay: 0,
						}}
						className='absolute left-1/2 top-1/2  h-[80.25rem] w-[80.25rem] rounded-[50%] bg-[#E2DDD6]/[0.18] shadow-[0_8px_16px_rgb(0_0_0/0.4)]'></motion.div>
					<motion.div
						initial={{
							opacity: 0,
							scale: 0,
							x: "-50%",
							y: "-50%",
						}}
						animate={{
							opacity: [0, 1, 0.5, 0],
							scale: 1,

							z: 0,
						}}
						transition={{
							duration: 6,
							repeat: Infinity,
							delay: 2,
						}}
						className='absolute left-1/2 top-1/2  h-[80.25rem] w-[80.25rem] rounded-[50%] bg-[#E2DDD6]/[0.18] shadow-[0_8px_16px_rgb(0_0_0/0.4)]'></motion.div>
					<motion.div
						initial={{
							opacity: 0,
							scale: 0,
							x: "-50%",
							y: "-50%",
						}}
						animate={{
							opacity: [0, 1, 0.5, 0],
							scale: 1,

							z: 0,
						}}
						transition={{
							duration: 6,
							repeat: Infinity,
							delay: 4,
						}}
						className='absolute left-1/2 top-1/2  h-[80.25rem] w-[80.25rem] rounded-[50%] bg-[#E2DDD6]/[0.18] shadow-[0_8px_16px_rgb(0_0_0/0.4)]'></motion.div>
					<motion.div
						initial={{
							opacity: 0,
							scale: 0,
							x: "-50%",
							y: "-50%",
						}}
						animate={{
							opacity: [0, 1, 0.5, 0],
							scale: 1,

							z: 0,
						}}
						transition={{
							duration: 6,
							repeat: Infinity,
							delay: 6,
						}}
						className='absolute left-1/2 top-1/2  h-[80.25rem] w-[80.25rem] rounded-[50%] bg-[#E2DDD6]/[0.18] shadow-[0_8px_16px_rgb(0_0_0/0.4)]'></motion.div>
				</>
			</div>
		</div>
	);
};
