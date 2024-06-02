"use server";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ECommerce from "@/components/Product";
import { auth } from "@/libs/auth";
import { findUserByEmail } from "@/libs/email";
import prisma from "@/libs/db";
import FormCreateTestimoni from "@/components/createTestimoni";
import FormEditTestimoni from "@/components/editTestimoni/page";
import { Null } from "@/components/handlePostNull";

export default async function Home({ params }: { params: { id: string } }) {
	const user = await auth();

	const userData = await findUserByEmail(user?.user?.email as string);
	console.log(userData?.id);

	const category = await prisma.carBrand.findFirst({
		where: { userId: userData?.id },
	});

	const dataTestimoni = await prisma.testimonial.findFirst({
		where: {
			id: params.id,
		},
		include: {
			carBrand: true,
		},
	});

	console.log(dataTestimoni, "adehhhh");
	return (
		<div className='w-full h-auto '>
			{dataTestimoni === null ? (
				<Null />
			) : (
				<FormEditTestimoni
					data={dataTestimoni}
					id={params.id}
					dataCategory={category ? [category] : []}
				/>
			)}
		</div>
	);
}
