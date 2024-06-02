"use server";
import { auth } from "@/libs/auth";
import { findUserByEmail } from "@/libs/email";
import { PostProductSchema } from "@/types/createPostProduct";
import { NextResponse } from "next/server";
import { AuthError } from "next-auth";
import prisma from "@/libs/db";
import { Status } from "@prisma/client";
import { z, ZodObject, ZodType } from "zod";
import { generatePasswordHash } from "@/libs/credentials";

export async function POST(req: Request, res: Response) {
	const { numberPhone, message } = await req.json();
	try {
		const user = await auth();
		if (!user?.user?.email) {
			throw new AuthError("Email not found in user data");
		}
		const userData = await findUserByEmail(user.user.email);

		if (!userData) {
			throw new Error("User data not found");
			console.log(userData);
		}

		const createData = await prisma.myContact.create({
			data: {
				userId: userData.id,
				numberPhone: numberPhone,
				message: message,
			},
		});

		return NextResponse.json({ message: "berhasil" });
	} catch (err: any) {
		return NextResponse.json({ message: err.error });
		console.log(err.message, "kontol");
	}
}
