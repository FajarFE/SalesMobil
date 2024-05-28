"use server";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ECommerce from "@/components/Product";
import { auth } from "@/libs/auth";
import { findUserByEmail } from "@/libs/email";
import prisma from "@/libs/db";
import FormCreateTestimoni from "@/components/createTestimoni";

export default async function Home() {
	const user = await auth();

	const userData = await findUserByEmail(user?.user?.email as string);
	console.log(userData?.id);

	const category = await prisma.carBrand.findFirst({
		where: { userId: userData?.id },
	});

	return (
		<div className='w-full h-auto '>
			<FormCreateTestimoni data={category ? [category] : []} />
		</div>
	);
}
