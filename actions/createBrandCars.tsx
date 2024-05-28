"use server";
import { AuthError } from "next-auth";
import { auth, signIn, signOut } from "@/libs/auth";
import { loginUserSchema } from "@/types/signin";
import prisma from "@/libs/db";
import { getUserFromDb } from "@/libs/credentials";
import { redirect } from "next/navigation";
import { createCarsBrands } from "@/types/createCarsBrand";
import { findUserByEmail } from "@/libs/email";
import S3 from "aws-sdk/clients/s3.js";

interface brandCarsState {
	errors: {
		name?: string[];
		logo?: string[];
		_form?: string[];
	};
	success?: boolean;
}

export async function createBrands(
	formState: brandCarsState,
	formData: FormData
): Promise<brandCarsState> {
	const name = formData.get("name") as string;
	const logo = formData.get("logo") as string;

	const validatedFields = createCarsBrands.safeParse({
		name: name,
		logo: logo,
	});

	console.log(logo.toString());
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			success: false,
		};
	}

	try {
		const user = await auth();

		if (!user?.user?.email) {
			throw new AuthError("Email not found in user data");
		}

		const userData = await findUserByEmail(user.user.email);

		if (!userData) {
			throw new Error("User data not found");
		}

		const createData = await prisma.carBrand.create({
			data: {
				name: name,
				userId: userData.id,
				logo: logo,
			},
		});

		return { success: true, errors: {} };
	} catch (error) {
		console.error("Login error:", error);
		return {
			errors: { _form: ["An error occurred during login."] },
			success: false,
		};
	}
}
