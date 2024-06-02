"use server";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { auth } from "@/libs/auth";
import { findUserByEmail } from "@/libs/email";
import prisma from "@/libs/db";
import Product from "@/components/Product";
import { Testimoni } from "@/components/Testimoni";
import { Prisma } from "@prisma/client";

export default async function Home() {
	const user = await auth();

	const userData = await findUserByEmail(user?.user?.email as string);
	console.log(userData?.id);

	const category = await prisma.carBrand.findFirst({
		where: { userId: userData?.id },
	});

	const DataTestimoni = await prisma.testimonial.findMany({
		where: {
			userId: userData?.id,
		},
		include: {
			carBrand: true,
		},
	});

	const testimoniCount = await prisma.testimonial.count({
		where: { userId: userData?.id },
	});

	const archivedCount = await prisma.testimonial.count({
		where: {
			userId: userData?.id,
			status: "ARCHIVED",
		},
	});
	const publishCount = await prisma.testimonial.count({
		where: {
			userId: userData?.id,
			status: "PUBLISHED",
		},
	});
	const draftCount = await prisma.testimonial.count({
		where: {
			userId: userData?.id,
			status: "DRAFT",
		},
	});

	console.log(publishCount);
	return (
		<div className='w-full h-auto '>
			<Testimoni
				archivedCount={archivedCount.toString() ?? "0"}
				draftCount={draftCount.toString() ?? "0"}
				publishCount={publishCount.toString() ?? "0"}
				testimoniCount={testimoniCount.toString() ?? "0"}
				data={DataTestimoni && DataTestimoni}
			/>
		</div>
	);
}
