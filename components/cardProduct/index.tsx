"use client";
import Image from "next/image";
import Link from "next/link";
import { GiCarKey } from "react-icons/gi";
import { IoCarSportOutline } from "react-icons/io5";

interface carBrand {
	name: string;
}

interface ProductData {
	id: string;
	title: string;
	price: string;
	image: string;
	category: carBrand;
}

export const CardProduct = ({
	id,
	title,
	price,
	image,
	category,
}: ProductData) => {
	return (
		<div
			style={{
				backgroundImage: "linear-gradient(to bottom right, #E2DDD6, #A89A89)",
			}}
			className='flex flex-col w-full h-auto gap-5 rounded-[40px] p-8'>
			<div className='w-[470px] h-[240px] relative justify-center items-center'>
				<Image
					src='https://www.hyundai.com/content/dam/hyundai/ww/en/images/find-a-car/all-vehicles/ioniq-phev-ae-pe-quater-view.png'
					alt='owakdoado'
					width={600}
					height={600}
					className=' w-[470px] h-[240px] absolute -left-[20px]'
				/>
			</div>
			<div className='flex flex-col gap-2'>
				<div className='font-bold  text-xl'>{title}</div>
				<div className='text-lg'>Rp. {price}</div>
				<div className='flex flex-row gap-5 justify-start items-center'>
					<div className='flex flex-row text-lg gap-2 justify-start items-center'>
						<GiCarKey size={30} />
						<div>{category.name}</div>
					</div>
				</div>
			</div>
			<Link
				href={`/detail/${id}`}
				className='w-full justify-center items-center py-3 text-md bg-black text-white rounded-full'>
				Detail
			</Link>
		</div>
	);
};
