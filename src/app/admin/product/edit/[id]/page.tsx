"use server";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ECommerce from "@/components/Product";
import { auth } from "@/libs/auth";
import { findUserByEmail } from "@/libs/email";
import prisma from "@/libs/db";
import FormEditProducts from "@/components/editProduct";

export default async function Home({ params }: { params: { id: string } }) {
	const user = await auth();

	const userData = await findUserByEmail(user?.user?.email as string);

	const category = await prisma.carBrand.findFirst({
		where: { userId: userData?.id },
	});

	const dataProduct = await prisma.postProduct.findUnique({
		where: {
			id: params.id,
		},

		include: {
			carBrand: true,
		},
	});

	return (
		<div className='w-full h-auto '>
			<FormEditProducts
				dataProduct={dataProduct}
				id={params.id}
				dataCategory={category ? [category] : []}
			/>
		</div>
	);
}
