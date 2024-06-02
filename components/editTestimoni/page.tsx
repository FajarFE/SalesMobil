// src/components/signup/form.tsx

// Ensuring client-side code
"use client";

import { createBrands } from "@/actions/createBrandCars";
import { createCarsBrands } from "@/types/createCarsBrand";
import { zodResolver } from "@hookform/resolvers/zod";
// Importing necessary modules and components
import Link from "next/link";
import { useState } from "react";

import { useFormState, useFormStatus } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { InputImage } from "../InputImage";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { TestimonialsSchema } from "@/types/tsTestimoni";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { dataCategory } from "../createProduct";
import FormCreateBrands from "../createBrand";
import { Status } from "@prisma/client";
import { carBrand } from "../editProduct";

const handleUploadFiles = async (
	event: React.ChangeEvent<HTMLInputElement>,
	callback: (file: any) => void,
	onProgress: (progress: number) => void
) => {
	event.preventDefault();
	const files = event.target.files;
	console.log(files);
	if (files && files.length > 0) {
		const file = files[0];
		let uploadedSize = 0;
		const totalSize = file.size;
		try {
			const formData = new FormData();
			formData.append("name", file);

			const xhr = new XMLHttpRequest();

			// Set event listener to track upload progress
			xhr.upload.addEventListener("progress", (event) => {
				if (event.lengthComputable) {
					const progress = Math.round((event.loaded / totalSize) * 100);
					onProgress(progress);
				}
			});

			xhr.open("POST", `/images/change`);

			xhr.onload = function () {
				if (xhr.status === 200) {
					const responseData = JSON.parse(xhr.responseText);
					callback(responseData.data);
				} else {
					console.error("Request failed with status:", xhr.status);
				}
			};

			xhr.send(formData);
		} catch (error) {
			console.error("Error uploading image:", error);
		}
	}
};

const handleDropsFiles = async (
	event: React.DragEvent<HTMLDivElement>,
	callback: (file: any) => void,
	onProgress: (progress: number) => void
) => {
	event.preventDefault();
	const files = event.dataTransfer.files;
	if (files && files.length > 0) {
		const file = files[0];
		let uploadedSize = 0;
		const totalSize = file.size;

		try {
			const formData = new FormData();
			formData.append("file", file);

			const xhr = new XMLHttpRequest();

			// Set event listener to track upload progress
			xhr.upload.addEventListener("progress", (event) => {
				if (event.lengthComputable) {
					const progress = Math.round((event.loaded / totalSize) * 100);
					onProgress(progress);
				}
			});

			xhr.open("POST", `/images/change`);

			xhr.onload = function () {
				if (xhr.status === 200) {
					const responseData = JSON.parse(xhr.responseText);
					callback(responseData.data);
				} else {
					console.error("Request failed with status:", xhr.status);
				}
			};

			xhr.send(formData);
		} catch (error) {
			console.error("Error uploading image:", error);
		}
	}
};

interface Testimonial {
	testimoni: string;
	customer: string;
	image: string;
	carBrandId: string | null;
	status: Status;
}

interface CarBrand {
	id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	logo: string;
	userId: string;
}

interface DataTestimoniProps {
	data: Testimonial | null;
	dataCategory: CarBrand[];
	id: string;
}
export default function FormEditTestimoni({
	data,
	dataCategory,
	id,
}: DataTestimoniProps) {
	const [uploadProgressImage, setUploadProgressImage] = useState<number>(0);
	const form = useForm<z.infer<typeof TestimonialsSchema>>({
		resolver: zodResolver(TestimonialsSchema),
		defaultValues: {
			customer: data?.customer ?? "",
			image: data?.image ?? "",
			testimoni: data?.testimoni ?? "",
			status: data?.status ?? "",
			carBrandId: data?.carBrandId ?? "",
		},
	});
	const handleFileChangeImage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		event.preventDefault();
		handleUploadFiles(
			event,
			(newFiles) => {
				form.setValue("image", "");
				form.setValue("image", newFiles);
			},
			(progress) => {
				setUploadProgressImage(progress);
			}
		);
	};

	const handleFileDropImage = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		handleDropsFiles(
			event,
			(newFiles) => {
				form.setValue("image", "");
				form.setValue("image", newFiles);
			},
			(progress) => {
				setUploadProgressImage(progress);
			}
		);
	};

	const handleRemoveFileImage = (e: any) => {
		e.preventDefault();
		form.setValue("image", "");
	};

	const onSubmit: SubmitHandler<z.infer<typeof TestimonialsSchema>> = async (
		values,
		event: any
	) => {
		try {
			const dataToSubmit = {
				image: values.image,
				customer: values.customer,
				testimoni: values.testimoni,
				carBrandId: values.carBrandId,
				status: values.status,
			};
			console.log(dataToSubmit);

			const response = await fetch(`/api/testimoni/update`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataToSubmit),
			});

			if (!response.ok) {
				throw new Error("Failed to submit data. Network response was not ok.");
			}

			const result = await response.json();
		} catch (error) {
			console.error("Error:", error); // Removed "waodkoakdoakdo" from error message
		}
		revalidatePath("/admin/testimoni");
		redirect("/admin/testimoni");
	};

	const dataImage = form.watch("image");

	const { pending } = useFormStatus();
	return (
		<div className='space-y-2 items-center'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='customer'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nama Customer</FormLabel>
								<FormControl>
									<Input placeholder='Title' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='testimoni'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Testimoni Customer</FormLabel>
								<FormControl>
									<Input placeholder='Title' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<InputImage
						label='Image Customer'
						name='image'
						multiple={false}
						data={dataImage}
						progress={uploadProgressImage}
						handleFileChange={handleFileChangeImage}
						handleRemoveSingleFile={handleRemoveFileImage}
						handleFileDrops={handleFileDropImage}
						control={form.control}
					/>
					<FormField
						control={form.control}
						name='status'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Status</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select status' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='PUBLISHED'>Publish</SelectItem>
										<SelectItem value='ARCHIVED'>Archived</SelectItem>
										<SelectItem value='DRAFT'>Draft</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					{dataCategory && dataCategory.length === 0 ? (
						<>
							<AlertDialog>
								<AlertDialogTrigger>Open</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Tambahkan Category Brand Mobil
										</AlertDialogTitle>
										<AlertDialogDescription>
											<FormCreateBrands />
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction>Continue</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</>
					) : (
						<>
							<FormField
								control={form.control}
								name='carBrandId'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Car Brand</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select car brand' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{dataCategory &&
													dataCategory.map((brand: any, index: number) => (
														<SelectItem key={index} value={brand.id}>
															{brand.name}
														</SelectItem>
													))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					)}
					<Button type='submit'>Submit</Button>
				</form>
			</Form>
		</div>
	);
}
