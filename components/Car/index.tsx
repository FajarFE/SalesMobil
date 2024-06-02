"use server";

import prisma from "@/libs/db";
import { Status } from "@prisma/client";
import { CardProduct } from "../cardProduct";
import Image from "next/image";
import { SearchComponent } from "../search";

export const CarData = async ({
	children,
	className,
	search,
}: {
	children: React.ReactNode;
	className?: string;
	search: string;
}) => {
	const data = await prisma.postProduct.findMany({
		where: {
			status: Status.PUBLISHED,
			title: {
				contains: search.toLowerCase(),
				mode: "insensitive",
			},
		},
		include: {
			carBrand: true,
		},
	});

	return (
		<div className={`${className}`}>
			{children}
			<div className='container w-full h-auto mx-auto max-w-8xl flex flex-col justify-center items-center gap-5'>
				<div className='w-full  h-auto rounded-xl overflow-hidden'>
					<Image
						src='https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						alt='Car Headline'
						width={14000}
						height={600}
						className='w-full object-cover h-[500px]'
					/>
				</div>
				<SearchComponent />
				<div className='grid grid-cols-12 gap-5'>
					{data &&
						data.map((item, index) => (
							<>
								<div key={index} className='px-5 col-span-4'>
									<CardProduct
										id={item.id}
										title={item.title}
										carBrand={item.carBrand}
										price={item.price}
										image={item.image}
									/>
								</div>
							</>
						))}
				</div>
			</div>
		</div>
	);
};
