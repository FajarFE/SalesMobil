"use server";
import { auth } from "@/libs/auth";
import { findUserByEmail } from "@/libs/email";
import { PostProductSchema } from "@/types/createPostProduct";
import { NextResponse } from "next/server";
import { AuthError } from "next-auth";
import prisma from "@/libs/db";
import { Status } from "@prisma/client";
import { z, ZodObject, ZodType } from "zod";

export async function POST(req: Request, res: Response) {
	const {
		title,
		description,
		performance,
		safety,
		exteriorImage,
		interiorImage,
		status,
		category,
		technology,
		price,
	} = await req.json();

	try {
		console.log("kontol");
		const user = await auth();

		if (!user?.user?.email) {
			throw new AuthError("Email not found in user data");
		}

		const userData = await findUserByEmail(user.user.email);

		if (!userData) {
			throw new Error("User data not found");
			console.log(userData);
		}

		const createData = await prisma.postProduct.create({
			data: {
				title: title,
				userId: userData.id,
				description: description,
				performance: performance as string[],
				safety: safety as string[],
				technology: technology as string[],
				interiorImage: interiorImage as string[],
				exteriorImage: exteriorImage as string[],
				status: status as Status,
				carBrandId: category as string,
				price: price,
			},
		});

		console.log(createData, "anjay");

		return NextResponse.json({ message: "berhasil" });
	} catch (err: any) {
		return NextResponse.json({ message: err.error });
		console.log(err.message, "kontol");
	}
}
