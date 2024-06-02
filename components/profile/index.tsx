"use client";
import { profileSchema } from "@/types/tsProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { profile } from "console";
import { useState } from "react";
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
import { InputImage } from "../InputImage";
import { Button } from "../ui/button";
import { watch } from "fs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Image from "next/image";

const handleUploadFiles = async (
	event: React.ChangeEvent<HTMLInputElement>,
	callback: (file: any) => void,
	onProgress: (progress: number) => void
) => {
	event.preventDefault();
	event.stopPropagation();
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
	event.stopPropagation();
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

interface user {
	id: string | null;
	name: string | null;
	image: string | null;
}

export const Profile = ({ id, name, image }: user) => {
	const baseUrl = process.env.BASE_URL || "http://localhost:3000";

	const form = useForm<z.infer<typeof profileSchema>>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: name ?? "",
			image: image ?? "",
		},
	});
	const [uploadProgressImage, setUploadProgressImage] = useState<number>(0);
	const handleFileChangeImage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		event.preventDefault();
		event.stopPropagation();
		handleUploadFiles(
			event,
			(newFiles) => {
				form.setValue("image", newFiles);
			},
			(progress) => {
				setUploadProgressImage(progress);
			}
		);
	};

	const handleFileDropImage = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		handleDropsFiles(
			event,
			(newFiles) => {
				form.setValue("image", newFiles);
			},
			(progress) => {
				setUploadProgressImage(progress);
			}
		);
	};

	const handleRemoveFileImage = (e: any) => {
		e.preventDefault();
		e.stopPropagation();
		form.setValue("image", "");
	};

	const [edit, setEdit] = useState<boolean>(false);
	const onSubmit: SubmitHandler<z.infer<typeof profileSchema>> = async (
		values,
		event: any // Changed 'e' to 'event' for consistency
	) => {
		event.preventDefault();
		event.stopPropagation();
		try {
			const dataToSubmit = {
				image: values.image,
				name: values.name,
				id: id,
			};
			console.log(dataToSubmit);

			const response = await fetch(`/api/profile`, {
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
			console.log("Success:", result);
			setEdit(!edit);
		} catch (error) {
			console.error("Error:", error); // Removed "waodkoakdoakdo" from error message
		}
		revalidatePath("/admin/profile");
		redirect("/admin/profile");
	};
	const dataImage = form.watch("image");
	return (
		<>
			{edit ? (
				<div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
							<FormField
								control={form.control}
								name='name'
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
							<InputImage
								label='Image Logo'
								name='image'
								multiple={false}
								data={dataImage}
								progress={uploadProgressImage}
								handleFileChange={handleFileChangeImage}
								handleRemoveFile={handleRemoveFileImage}
								handleFileDrops={handleFileDropImage}
								control={form.control}
							/>
							<Button type='submit'>Submit</Button>
						</form>
					</Form>
				</div>
			) : (
				<div className='flex justify-betweem flex-col gap-20 items-center'>
					<div>
						{image === null ? (
							<div className='flex flex-col gap-10 justify-center items center'>
								<div className='justify-center items center flex w-full'>
									Gambar Profile
								</div>
								<div className='w-[200px] h-[200px] rounded-full overflow-hidden'>
									<Image
										src='https://www.pngkey.com/png/detail/21-213224_unknown-person-icon-png-download.png'
										alt={`uploaded Image`}
										width='200'
										height={100}
										className='rounded-lg w-full h-full object-cover'
									/>
								</div>
							</div>
						) : (
							<div>
								<div>Gambar Profile</div>
								<div className='w-[200px] h-[200px] rounded-full overflow-hidden'>
									<Image
										src={`http://localhost:3000/images/${image}`}
										alt={`uploaded Image`}
										width='100'
										height={100}
										className='rounded-lg w-full h-full object-cover'
									/>
								</div>
							</div>
						)}
					</div>
					<div className='flex flex-col gap-10 text-2xl justify-center items-center'>
						<div>Nama</div>
						<div className='font-bold'>{name}</div>
					</div>
					<Button
						onClick={() => {
							setEdit(!edit);
						}}>
						Edit
					</Button>
				</div>
			)}
		</>
	);
};
