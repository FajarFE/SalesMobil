"use server";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { auth } from "@/libs/auth";
import { findUserByEmail } from "@/libs/email";
import prisma from "@/libs/db";
import Product from "@/components/Product";

export default async function Home() {
	const user = await auth();

	const userData = await findUserByEmail(user?.user?.email as string);
	console.log(userData);

	const category = await prisma.carBrand.findFirst({
		where: { userId: userData?.id },
	});

	const dataProduct = await prisma.postProduct.findMany({
		where: {
			userId: userData?.id,
		},
		include: {
			carBrand: true,
		},
	});

	const productCount = await prisma.postProduct.count({
		where: { userId: userData?.id },
	});

	const archivedCount = await prisma.postProduct.count({
		where: {
			userId: userData?.id,
			status: "ARCHIVED",
		},
	});
	const publishCount = await prisma.postProduct.count({
		where: {
			userId: userData?.id,
			status: "PUBLISHED",
		},
	});
	const draftCount = await prisma.postProduct.count({
		where: {
			userId: userData?.id,
			status: "DRAFT",
		},
	});

	return (
		<div className='w-full h-auto '>
			<Product
				archivedCount={archivedCount.toString() ?? "0"}
				draftCount={draftCount.toString() ?? "0"}
				publishCount={publishCount.toString() ?? "0"}
				productCount={productCount.toString() ?? "0"}
				data={dataProduct && dataProduct}
			/>
		</div>
	);
}
