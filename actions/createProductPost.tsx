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

import { Status } from "@prisma/client";

import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { z, ZodObject, ZodType } from "zod";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/libs/getR2";

export async function uploadFileToS3(
	file: Buffer,
	fileName: string
): Promise<string> {
	const hashBuffer = await crypto.subtle.digest("SHA-256", file);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");

	const fileBuffer = await sharp(file)
		.jpeg({ quality: 100 })
		.resize(1200, 400)
		.toBuffer();

	const params = {
		Bucket: process.env.BUCKET_NAME!,
		Key: hashHex,
		Body: fileBuffer,
		ContentType: "image/jpeg",
	};

	const command = new PutObjectCommand(params);
	console.log(command);

	try {
		const response = await s3Client.send(command);
		console.log("File uploaded successfully:", hashHex);
		return hashHex;
	} catch (error) {
		console.error("Error uploading file:", error);
		throw error;
	}
}

export async function uploadSingleImage(image: File): Promise<string> {
	const imageBuffer = Buffer.from(await image.arrayBuffer());
	const fileName = await uploadFileToS3(imageBuffer, image.name);
	return fileName;
}

interface productState {
	errors: {
		title?: string[];
		description?: string[];
		headline?: string[];
		performance?: string[];
		image?: string[];
		safety?: string[];
		technology?: string[];
		exteriorImage?: string[];
		interiorImage?: string[];
		status?: string[];
		price?: string[];
		_form?: string[];
	};
	success?: boolean;
}
const SingleImageSchema: ZodObject<{
	performance: ZodType<string[], any, string[]>;
	technology: ZodType<string[], any, string[]>;
	safety: ZodType<string[], any, string[]>;
	exteriorImage: ZodType<string[], any, string[]>;
	interiorImage: ZodType<string[], any, string[]>;
	title: ZodType<string, any, string>;
	description: ZodType<string, any, string>;
	status: ZodType<string, any, string>;
	price: ZodType<string, any, string>;
}> = z.object({
	performance: z.array(z.string()),
	technology: z.array(z.string()),
	safety: z.array(z.string()),
	exteriorImage: z.array(z.string()),
	interiorImage: z.array(z.string()),
	title: z.string().min(1, "Tolong Isi"),
	description: z.string().min(1, "Tolong Isi"),
	status: z.string().min(1, "Tolong Isi"),
	price: z.string().min(1, "Tolong Isi"),
});

export async function createProduct(
	formState: productState,
	formData: FormData
): Promise<productState> {
	const title = formData.get("title") as string;
	const brand = formData.get("brand") as string;
	const description = formData.get("description") as string;
	const performance = formData.getAll("performance");
	const safety = formData.getAll("safety");
	const technology = formData.getAll("technology");
	const exteriorImage = formData.getAll("exteriorImage");
	const interiorImage = formData.getAll("interiorImage");
	const status = formData.get("status") as Status;
	const price = formData.get("price") as string;

	console.log(Performance);

	const validatedFields = SingleImageSchema.safeParse({
		title: title,
		description: description,
		performance: performance,
		safety: safety,
		technology: technology,
		carBrandId: brand,
		exteriorImage: exteriorImage,
		interiorImage: interiorImage,
		status: status as Status,
		price: price,
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			success: false,
		};
		console.log("asu");
	}

	try {
		const user = await auth();

		if (!user?.user?.email) {
			throw new AuthError("Email not found in user data");
			console.log("awodkoawdoado");
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
				carBrandId: "clwjoai1g0001rdrjgryuff8r",
				price: price,
			},
		});
		console.log(createData, "anjay");
		return { success: true, errors: {} };
	} catch (error) {
		console.log(error);
		return {
			errors: { _form: ["An error occurred during login."] },
			success: false,
		};
	}
}
