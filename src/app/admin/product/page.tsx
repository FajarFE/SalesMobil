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
	console.log(userData?.id);

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

	console.log(dataProduct, "aowkdoadoa");

	return (
		<div className='w-full h-auto '>
			<Product data={dataProduct && dataProduct} />
		</div>
	);
}
