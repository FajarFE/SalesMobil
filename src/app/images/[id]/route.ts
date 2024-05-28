"use server";
import { NextResponse } from "next/server";
import { s3Client } from "@/libs/getR2";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const imageId = params.id;
		const result = await getSignedUrl(
			s3Client,
			new GetObjectCommand({ Bucket: process.env.BUCKET_NAME!, Key: imageId }),
			{ expiresIn: 3600 }
		);

		// Fetch image from S3
		const response = await fetch(result);
		if (!response.ok) {
			throw new Error("Failed to fetch image");
		}
		const contentType = response.headers.get("Content-Type");
		const body = await response.arrayBuffer();

		return new Response(body, {
			headers: {
				"Content-Type": contentType || "application/octet-stream",
			},
		});
	} catch (error) {
		console.error("Error fetching image:", error);
		return new Response("Image not found", { status: 404 });
	}
}
