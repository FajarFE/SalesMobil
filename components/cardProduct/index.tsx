import Image from "next/image";
import { GiCarKey } from "react-icons/gi";
import { IoCarSportOutline } from "react-icons/io5";

export const CardProduct = () => {
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
				<div className='font-bold  text-xl'>Anjay</div>
				<div className='text-lg'>Rp. 500.000.000</div>
				<div className='flex flex-row gap-5 justify-start items-center'>
					<div className='flex flex-row text-lg gap-2 justify-start items-center'>
						<GiCarKey size={30} />
						<div>Hyundai</div>
					</div>
					<div className='flex flex-row text-lg gap-2 justify-start items-center'>
						<IoCarSportOutline size={30} />
						<div>Type C</div>
					</div>
				</div>
			</div>
			<button className='w-full justify-center items-center py-3 text-md bg-black text-white rounded-full'>
				Find More
			</button>
		</div>
	);
};
