"use client";
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
import { contactSchema } from "@/types/tsContact";
import WhatsAppChat from "../whatapps";

interface kontol {
	numberPhone: string;
	message: string;
	id: string;
}

interface dataContactProps {
	contact: kontol[] | null;
}

interface DataToSubmit {
	numberPhone: string;
	message: string;
	id?: string; // Make id optional
}

export const CreateContact = ({ contact }: dataContactProps) => {
	const [edit, setEdit] = useState(false);
	const form = useForm<z.infer<typeof contactSchema>>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			nomor: (contact && contact[0]?.numberPhone) ?? "",
			pesan: (contact && contact[0]?.message) ?? "",
		},
	});

	const onSubmit: SubmitHandler<z.infer<typeof contactSchema>> = async (
		values,
		event: any
	) => {
		try {
			let dataToSubmit: DataToSubmit = {
				numberPhone: values.nomor,
				message: values.pesan,
			};

			if (contact && contact.length > 0 && edit) {
				dataToSubmit.id = contact[0]?.id;
			}

			let apiEndpoint = "/api/contact";
			if (contact && contact.length > 0 && edit) {
				apiEndpoint = "/api/contact/update";
			}

			const response = await fetch(apiEndpoint, {
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
			window.location.reload();
		} catch (error) {
			console.error("Error:", error);
		}
		revalidatePath("/admin/product");
		redirect("/admin/product");
	};

	const dataNomor = form.watch("nomor");
	const dataPesan = form.watch("pesan");
	return (
		<>
			{contact && contact.length === 0 ? (
				<div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
							<FormField
								control={form.control}
								name='nomor'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nomor</FormLabel>
										<FormControl>
											<Input placeholder='Contoh +62:' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='pesan'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Template Pesan</FormLabel>
										<FormControl>
											<Input placeholder='Title' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<WhatsAppChat numberPhone={dataNomor} message={dataPesan} />
							<Button type='submit'>Submit</Button>
						</form>
					</Form>
				</div>
			) : edit ? (
				<div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
							<FormField
								control={form.control}
								name='nomor'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nomor</FormLabel>
										<FormControl>
											<Input placeholder='Contoh +62:' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='pesan'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Template Pesan</FormLabel>
										<FormControl>
											<Input placeholder='Title' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<WhatsAppChat numberPhone={dataNomor} message={dataPesan} />
							<Button type='submit'>Submit</Button>
						</form>
					</Form>
				</div>
			) : (
				<div className='flex flex-row '>
					<div className='w-[80%]'>
						<div>{contact && contact[0].numberPhone}</div>
						<div>{contact && contact[0].message}</div>
						<WhatsAppChat
							numberPhone={
								(contact && (contact[0]?.numberPhone! as string)) ?? "adad"
							}
							message={(contact && (contact[0]?.message! as string)) ?? ""}
						/>
					</div>
					<button
						onClick={() => {
							setEdit(!edit);
						}}
						className='w-[80%]'>
						Edit
					</button>
				</div>
			)}
		</>
	);
};
