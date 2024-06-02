import Image from "next/image";
import React from "react";

export const DetailProduct = ({
	data,
	children,
	className,
}: {
	data: {
		price: string;
		description: string;
		performance: string[];
		technology: string[];
		safety: string[];
		interiorImage: string[];
		exteriorImage: string[];
		image: string;
		title: string;
		carBrand: { name: string } | null;
	} | null;
	children: React.ReactNode;
	className: string;
}) => {
	if (!data) {
		return <div>Data not available</div>;
	}

	const baseUrl = process.env.BASE_URL || "http://localhost:3000";

	return (
		<div className={`${className}`}>
			{children}

			<div className='container w-full h-auto mx-auto max-w-8xl flex flex-col justify-center items-center gap-10'>
				<div className='w-full  h-auto rounded-xl overflow-hidden'>
					<Image
						src={`${baseUrl}/images/${data.image}`}
						alt='Car Headline'
						width={14000}
						height={600}
						className='w-full object-cover h-[500px]'
					/>
				</div>
				<div>{data.title}</div>
				<div>{data.description}</div>
				<div>{data.price}</div>
				<div>
					<h3>Car Brand:</h3>
					<p>{data?.carBrand?.name}</p>
				</div>
				<div className='w-full h-auto justify-center items-center'>
					<h3 className='text-center text-xl font-bold'>Performance</h3>
					<div className='grid grid-cols-12 w-full gap-5 m-5'>
						{data.performance.map((item, index) => (
							<div className='relative col-span-3' key={index}>
								<Image
									src={`${baseUrl}/images/${item}`}
									alt={`uploaded Image`}
									width='800'
									height={500}
									className='rounded-lg w-full h-full'
								/>
							</div>
						))}
					</div>
				</div>
				<div className='w-full h-auto justify-center items-center'>
					<h3 className='text-center text-xl font-bold'>Technology</h3>
					<div className='grid grid-cols-12 w-full gap-5 m-5'>
						{data.technology.map((item, index) => (
							<div className='relative col-span-3' key={index}>
								<Image
									src={`${baseUrl}/images/${item}`}
									alt={`uploaded Image`}
									width='800'
									height={500}
									className='rounded-lg w-full h-full'
								/>
							</div>
						))}
					</div>
				</div>
				<div className='w-full h-auto justify-center items-center'>
					<h3 className='text-center text-xl font-bold'>Safety</h3>
					<div className='grid grid-cols-12 w-full gap-5 m-5'>
						{data.safety.map((item, index) => (
							<div className='relative col-span-3' key={index}>
								<Image
									src={`${baseUrl}/images/${item}`}
									alt={`uploaded Image`}
									width='800'
									height={500}
									className='rounded-lg w-full h-full'
								/>
							</div>
						))}
					</div>
				</div>
				<div className='w-full h-auto justify-center items-center'>
					<h3 className='text-center text-xl font-bold'>Interior Images</h3>
					<div className='grid grid-cols-12 w-full gap-5 m-5'>
						{data.interiorImage.map((image, index) => (
							<div className='relative col-span-3' key={index}>
								<Image
									src={`${baseUrl}/images/${image}`}
									alt={`uploaded Image`}
									width='800'
									height={500}
									className='rounded-lg w-full h-full'
								/>
							</div>
						))}
					</div>
				</div>
				<div className='w-full h-auto justify-center items-center'>
					<h3 className='text-center text-xl font-bold'>Exterior Images</h3>
					<div className='grid grid-cols-12 w-full gap-5 m-5'>
						{data.exteriorImage.map((image, index) => (
							<div className='relative col-span-3' key={index}>
								<Image
									src={`${baseUrl}/images/${image}`}
									alt={`uploaded Image`}
									width='800'
									height={500}
									className='rounded-lg w-full h-full'
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
