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
	const { customer, image, testimoni, carBrandId, status } = await req.json();

	try {
		const user = await auth();
		if (!user?.user?.email) {
			throw new AuthError("Email not found in user data");
		}
		const createData = await prisma.testimonial.create({
			data: {
				customer: customer,
				image: image,
				testimoni: testimoni,
				carBrandId: carBrandId,
				status: status,
			},
		});
		return NextResponse.json({ message: "berhasil" });
	} catch (err: any) {
		return NextResponse.json({ message: err.error });
		console.log(err.message, "kontol");
	}
}
