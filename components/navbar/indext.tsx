import { cn } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";

interface dataProps {
	link: string;
	title: string;
}

interface navbarProps {
	className: string;
	data: dataProps[];
	logo: string;
	nama: string;
}

export const Navbar = ({ className, data, logo, nama }: navbarProps) => {
	return (
		<>
			<div className={(cn(`flex justify-between items-center`), className)}>
				<div>
					{logo && (
						<Image
							src={logo}
							alt='Logo sales mobil'
							fill={true}
							width={40}
							height={40}
						/>
					)}
					<div>{nama}</div>
				</div>
				{data &&
					data.map((data, index) => {
						return (
							<Link href={data.link} key={index} className=''>
								{data.title}
							</Link>
						);
					})}
			</div>
		</>
	);
};
