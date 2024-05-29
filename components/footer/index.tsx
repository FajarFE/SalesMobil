"use client";
import { DataNavbar } from "../navbar";
import { Input } from "../ui/input";
import { Link } from "react-scroll";
interface Footer {
	logo?: string;
	menu?: DataNavbar[];
	name?: string;
	alamat?: string;
}

export const Footer = ({ logo, menu, name, alamat }: Footer) => {
	return (
		<>
			<div className='w-full bg-black py-20 text-white h-[350px]'>
				<div className='flex justify-between   items-start w-full max-w-8xl container mx-auto gap-20'>
					<div className='flex flex-col justify-start items-start gap-4'>
						{logo && <div>{logo}</div>}
						<Link
							to='home'
							smooth={true}
							duration={500}
							offset={0}
							className='font-bold text-xl'>
							{name}
						</Link>
						<div className=' text-lg'>{alamat}</div>
					</div>
					<div className='flex flex-row gap-20 font-bold text-xl'>
						<div className='flex flex-col gap-4 justify-start items-start'>
							<div className='text-2xl'>Menu</div>
							{menu &&
								menu.map((data, index) => {
									return (
										<Link
											to={data.link}
											smooth={true}
											duration={500}
											offset={-150}
											key={index}
											className=''>
											{data.title}
										</Link>
									);
								})}
						</div>
						<div className='flex flex-col gap-10 '>
							<div className='w-[400px] flex gap-5 flex-col'>
								<div>Isi Email Untuk Berita Terbaru</div>
								<Input placeholder='Isi Email' />
							</div>
							<Link
								to='contact'
								smooth={true}
								duration={500}
								offset={0}
								className='px-3 py-2 bg-black border-2 border-white justify-center items-center flex rounded-full w-[50%] text-white'>
								Contact Sales
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
