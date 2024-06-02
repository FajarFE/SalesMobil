"use server";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ECommerce from "@/components/Product";
import { auth } from "@/libs/auth";
import { findUserByEmail } from "@/libs/email";
import prisma from "@/libs/db";
import FormEditProducts from "@/components/editProduct";
import { Profile } from "@/components/profile";

export default async function Home() {
	const user = await auth();

	const userData = await prisma.user.findFirst({
		where: { email: user?.user?.email as string },
		select: {
			image: true,
			name: true,
			id: true,
		},
	});

	console.log(userData);

	return (
		<div className='w-full h-auto '>
			<Profile
				id={userData?.id as string}
				name={userData?.name as string}
				image={userData?.image as string}
			/>
		</div>
	);
}
