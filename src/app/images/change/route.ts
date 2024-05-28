"use server";
import { NextResponse } from "next/server";
import { s3Client } from "@/libs/getR2";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request, res: NextApiResponse) {
	try {
		const formData = await req.formData();
		const imageId = formData.get("name") as File;

		const buffer = Buffer.from(await imageId.arrayBuffer());
		const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
		const hashHex = Array.from(new Uint8Array(hashBuffer))
			.map((b) => b.toString(16).padStart(2, "0"))
			.join("");

		const s3Params = {
			Bucket: process.env.BUCKET_NAME!,
			Key: hashHex,
			Body: buffer,
			ContentType: imageId.type,
		};

		await s3Client.send(new PutObjectCommand(s3Params));

		return NextResponse.json({ data: hashHex });
	} catch (error) {
		console.error("Error uploading image:", error);
		return res
			.status(500)
			.json({ success: false, error: "Internal Server Error" });
	}
}
