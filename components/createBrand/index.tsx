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
import { AlertDialogAction, AlertDialogCancel } from "../ui/alert-dialog";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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

export default function FormCreateBrands() {
	const [uploadProgressLogo, setUploadProgressLogo] = useState<number>(0);
	const form = useForm<z.infer<typeof createCarsBrands>>({
		resolver: zodResolver(createCarsBrands),
		defaultValues: {
			logo: "",
			name: "",
		},
	});

	const [logo, setLogo] = useState("");

	const handleFileChangeLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		event.stopPropagation();
		handleUploadFiles(
			event,
			(newFiles) => {
				form.setValue("logo", newFiles);
			},
			(progress) => {
				setUploadProgressLogo(progress);
			}
		);
	};

	const handleFileDropLogo = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		handleDropsFiles(
			event,
			(newFiles) => {
				form.setValue("logo", newFiles);
			},
			(progress) => {
				setUploadProgressLogo(progress);
			}
		);
	};

	const handleRemoveFileLogo = (e: any) => {
		e.preventDefault();
		e.stopPropagation();
		form.setValue("logo", "");
	};

	const onSubmit: SubmitHandler<z.infer<typeof createCarsBrands>> = async (
		values,
		event: any // Changed 'e' to 'event' for consistency
	) => {
		event.preventDefault();
		event.stopPropagation();
		try {
			const dataToSubmit = {
				logo: values.logo,
				name: values.name,
			};
			console.log(dataToSubmit);

			const response = await fetch(`/api/brand`, {
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
		} catch (error) {
			console.error("Error:", error); // Removed "waodkoakdoakdo" from error message
		}
		revalidatePath("/admin/product");
		redirect("/admin/product");
	};

	const dataLogo = form.watch("logo");
	console.log(logo);
	const { pending } = useFormStatus();
	return (
		<div className='space-y-3 items-center'>
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
						name='logo'
						multiple={false}
						data={dataLogo}
						progress={uploadProgressLogo}
						handleFileChange={handleFileChangeLogo}
						handleRemoveSingleFile={handleRemoveFileLogo}
						handleFileDrops={handleFileDropLogo}
						control={form.control}
					/>
					<Button type='submit'>Submit</Button>
				</form>
			</Form>
		</div>
	);
}
