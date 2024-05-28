"use client";
import { createProduct, uploadFileToS3 } from "@/actions/createProductPost";
// Importing necessary modules and components
import Link from "next/link";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { PostProductFrontSchema } from "@/types/createPostProduct";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { MdDelete, MdFileUpload } from "react-icons/md";
import { InputImage } from "../InputImage";
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
import FormCreateBrands from "../createBrand";
import { revalidatePath } from "next/cache";
import { redirect, useRouter } from "next/navigation";

export interface carBrand {
	id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	logo: string;
	userId: string;
}

export interface dataCategory {
	data: carBrand[];
}

const handleUploadFiles = async (
	event: React.ChangeEvent<HTMLInputElement>,
	callback: (files: any[]) => void,
	onProgress: (progress: number) => void
) => {
	const files = event.target.files;
	if (files) {
		const uploadedFiles: any[] = [];
		const totalFiles = files.length;
		let totalSize = 0;
		let uploadedSize = 0;

		// Calculate total file size
		for (const file of Array.from(files)) {
			totalSize += file.size;
		}

		for (const file of Array.from(files)) {
			try {
				const formData = new FormData();
				formData.append("name", file);

				const xhr = new XMLHttpRequest();

				// Set event listener to track upload progress
				xhr.upload.addEventListener("progress", (event) => {
					if (event.lengthComputable) {
						uploadedSize += event.loaded;
						const progress = Math.round((uploadedSize / totalSize) * 100);
						onProgress(progress);
					}
				});

				xhr.open("POST", `/images/change`);

				xhr.onload = function () {
					if (xhr.status === 200) {
						const responseData = JSON.parse(xhr.responseText);
						uploadedFiles.push(responseData.data);
						if (uploadedFiles.length === totalFiles) {
							callback(uploadedFiles);
						}
					} else {
						console.error("Request failed with status:", xhr.status);
					}
				};

				xhr.send(formData);
			} catch (error) {
				console.error("Error uploading image:", error);
			}
		}
	}
};
const handleDropsFiles = async (
	event: React.DragEvent<HTMLDivElement>,
	callback: (files: any[]) => void,
	onProgress: (progress: number) => void
) => {
	event.preventDefault();
	event.stopPropagation();
	const files = event.dataTransfer.files;

	if (files) {
		const uploadedFiles: any[] = [];
		const totalFiles = files.length;
		let totalSize = 0;
		let uploadedSize = 0;

		// Calculate total file size
		for (const file of Array.from(files)) {
			totalSize += file.size;
		}

		for (const file of Array.from(files)) {
			try {
				const formData = new FormData();
				formData.append("name", file);

				const xhr = new XMLHttpRequest();

				// Set event listener to track upload progress
				xhr.upload.addEventListener("progress", (event) => {
					if (event.lengthComputable) {
						uploadedSize += event.loaded;
						const progress = Math.round((uploadedSize / totalSize) * 100);
						onProgress(progress);
					}
				});

				xhr.open("POST", `/images/change`);

				xhr.onload = function () {
					if (xhr.status === 200) {
						const responseData = JSON.parse(xhr.responseText);
						uploadedFiles.push(responseData.data);
						if (uploadedFiles.length === totalFiles) {
							callback(uploadedFiles);
						}
					} else {
						console.error("Request failed with status:", xhr.status);
					}
				};

				xhr.send(formData);
			} catch (error) {
				console.error("Error uploading image:", error);
			}
		}
	}
};

export default function FormCreateProducts({ data }: dataCategory) {
	const [uploadProgressPerformance, setUploadProgressPerformance] =
		useState<number>(0);
	const [uploadProgressInterior, setUploadProgressInterior] =
		useState<number>(0);
	const [uploadProgressExterior, setUploadProgressExterior] =
		useState<number>(0);
	const [uploadProgressSafety, setUploadProgressSafety] = useState<number>(0);
	const [uploadProgressTechno, setUploadProgressTechno] = useState<number>(0);
	const router = useRouter();
	const form = useForm<z.infer<typeof PostProductFrontSchema>>({
		resolver: zodResolver(PostProductFrontSchema),
		defaultValues: {
			title: "",
			desc: "",
			price: "",
			carBrandId: "",
			performance: [],
			status: "DRAFT",
		},
	});

	const handleFileChangePerformance = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		handleUploadFiles(
			event,
			(newFiles) => {
				form.setValue("performance", newFiles);
			},
			(progress) => {
				setUploadProgressPerformance(progress);
			}
		);
	};

	const handleFileDropPerformance = (
		event: React.DragEvent<HTMLDivElement>
	) => {
		event.preventDefault();
		event.stopPropagation();
		handleDropsFiles(
			event,
			(newFiles) => {
				form.setValue("performance", newFiles);
			},
			(progress) => {
				setUploadProgressPerformance(progress);
			}
		);
	};

	const handleRemoveFilePerformance = (index: number, e: any) => {
		e.preventDefault();
		const currentPerformance = form.getValues("performance");
		if (currentPerformance) {
			const updatedPerformance = currentPerformance.filter(
				(_, idx) => idx !== index
			);
			form.setValue("performance", updatedPerformance);
		}
	};
	const handleFileChangeInterior = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		handleUploadFiles(
			event,
			(newFiles) => {
				form.setValue("interior", newFiles);
			},
			(progress) => {
				setUploadProgressInterior(progress);
			}
		);
	};
	const handleFileDropInterior = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		handleDropsFiles(
			event,
			(newFiles) => {
				form.setValue("interior", newFiles);
			},
			(progress) => {
				setUploadProgressInterior(progress);
			}
		);
	};

	const handleRemoveFileInterior = (index: number, e: any) => {
		e.preventDefault();
		const currentInterior = form.getValues("interior");
		if (currentInterior) {
			const updatedInterior = currentInterior.filter((_, idx) => idx !== index);
			form.setValue("interior", updatedInterior);
		}
	};
	const handleFileChangeExterior = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		handleUploadFiles(
			event,
			(newFiles) => {
				form.setValue("exterior", newFiles);
			},
			(progress) => {
				setUploadProgressExterior(progress);
			}
		);
	};
	const handleFileDropExterior = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		handleDropsFiles(
			event,
			(newFiles) => {
				form.setValue("exterior", newFiles);
			},
			(progress) => {
				setUploadProgressExterior(progress);
			}
		);
	};

	const handleRemoveFileExterior = (index: number, e: any) => {
		e.preventDefault();
		const currentExterior = form.getValues("exterior");
		if (currentExterior) {
			const updatedExterior = currentExterior.filter((_, idx) => idx !== index);
			form.setValue("exterior", updatedExterior);
		}
	};
	const handleFileChangeSafety = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		handleUploadFiles(
			event,
			(newFiles) => {
				form.setValue("safety", newFiles);
			},
			(progress) => {
				setUploadProgressSafety(progress);
			}
		);
	};

	const handleFileDropSafety = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		handleDropsFiles(
			event,
			(newFiles) => {
				form.setValue("safety", newFiles);
			},
			(progress) => {
				setUploadProgressSafety(progress);
			}
		);
	};
	const handleRemoveFileSafety = (index: number, e: any) => {
		e.preventDefault();
		const currentSafety = form.getValues("safety");
		if (currentSafety) {
			const updatedSafety = currentSafety.filter((_, idx) => idx !== index);
			form.setValue("safety", updatedSafety);
		}
	};
	const handleFileChangeTechno = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		handleUploadFiles(
			event,
			(newFiles) => {
				form.setValue("technology", newFiles);
			},
			(progress) => {
				setUploadProgressTechno(progress);
			}
		);
	};

	const handleFileDropTechno = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		handleDropsFiles(
			event,
			(newFiles) => {
				form.setValue("technology", newFiles);
			},
			(progress) => {
				setUploadProgressTechno(progress);
			}
		);
	};

	const handleRemoveFileTechno = (index: number, e: any) => {
		e.preventDefault();
		const currentTechnology = form.getValues("technology");
		if (currentTechnology) {
			const updatedTechnology = currentTechnology.filter(
				(_, idx) => idx !== index
			);
			form.setValue("technology", updatedTechnology);
		}
	};

	console.log(data);
	const onSubmit: SubmitHandler<
		z.infer<typeof PostProductFrontSchema>
	> = async (values) => {
		try {
			const dataToSubmit = {
				title: values.title,
				status: values.status,
				description: values.desc,
				category: values.carBrandId,
				interiorImage: values.interior,
				exteriorImage: values.exterior,
				safety: values.safety,
				technology: values.technology,
				performance: values.performance,
				price: values.price,
			};
			console.log(dataToSubmit);

			const response = await fetch(`/api/product`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataToSubmit),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const result = await response.json();
			console.log("Success:", result);

			// Redirect after successful response
			revalidatePath("/admin/product");
		} catch (error) {
			console.error("Error:", error);
			// Handle error here, if necessary
		}
		router.push("/admin/product");
	};

	const dataPerformance = form.watch("performance");
	const dataSafety = form.watch("safety");
	const dataInterior = form.watch("interior");
	const dataExterior = form.watch("exterior");
	const dataTechnology = form.watch("technology");
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder='Title' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='desc'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input placeholder='Description' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='price'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price</FormLabel>
							<FormControl>
								<Input placeholder='Price' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<InputImage
					label='Image Performance'
					name='performance'
					multiple={true}
					data={dataPerformance}
					progress={uploadProgressPerformance}
					handleFileChange={handleFileChangePerformance}
					handleRemoveFile={handleRemoveFilePerformance}
					handleFileDrops={handleFileDropPerformance}
					control={form.control}
				/>
				<InputImage
					label='Image Interior'
					name='interior'
					data={dataInterior}
					multiple={true}
					progress={uploadProgressInterior}
					handleFileChange={handleFileChangeInterior}
					handleRemoveFile={handleRemoveFileInterior}
					handleFileDrops={handleFileDropInterior}
					control={form.control}
				/>
				<InputImage
					label='Image Exterior'
					name='exterior'
					data={dataExterior}
					multiple={true}
					progress={uploadProgressExterior}
					handleFileChange={handleFileChangeExterior}
					handleRemoveFile={handleRemoveFileExterior}
					handleFileDrops={handleFileDropExterior}
					control={form.control}
				/>
				<InputImage
					label='Image Safety'
					name='safety'
					data={dataSafety}
					multiple={true}
					progress={uploadProgressSafety}
					handleFileChange={handleFileChangeSafety}
					handleRemoveFile={handleRemoveFileSafety}
					handleFileDrops={handleFileDropSafety}
					control={form.control}
				/>
				<InputImage
					label='Image Technology'
					name='technology'
					data={dataTechnology}
					multiple={true}
					progress={uploadProgressTechno}
					handleFileChange={handleFileChangeTechno}
					handleRemoveFile={handleRemoveFileTechno}
					handleFileDrops={handleFileDropTechno}
					control={form.control}
				/>
				<FormField
					control={form.control}
					name='status'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
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
				{data && data.length === 0 ? (
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
											{data &&
												data.map((brand: any, index: number) => (
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
	);
}
