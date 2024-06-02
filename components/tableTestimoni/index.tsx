import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
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
interface Product {
	title: string;
	id: string;
	description: string;
	price: string;
	status: string;
	exteriorImage: string[];
	interiorImage: string[];
	technology: string[];
	safety: string[];
	performance: string[];
}
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import { deletePost } from "@/actions/deleteProduct";
import { useFormState } from "react-dom";
import PostDelete from "../deleteProduct";
import { IoImages } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { carBrand } from "../createProduct";
import TestimonialDelete from "../deleteTestimoni";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export interface Testimoni {
	testimoni: string;
	id: string;
	image: string;
	customer: string;
	status: string;
	carBrand: carBrand | null;
}

export interface DataTestimoni {
	data: Testimoni[];
}

export const TableTestimoni = ({ data }: DataTestimoni) => {
	const baseUrl = process.env.BASE_URL || "http://localhost:3000";

	const [index, setIndex] = useState<number | null>(null);
	const [open, setOpen] = useState<boolean>(false);

	const handleOpenIndex = (newIndex: number) => {
		if (newIndex === index) {
			// Jika index yang sama ditekan lagi, tutup tab
			setIndex(null);
			setOpen(false);
		} else {
			// Jika index berbeda, buka tab baru
			setIndex(newIndex);
			setOpen(true);
		}
	};

	const deleteAction = (
		event: React.FormEvent<HTMLFormElement>,
		index: string
	) => {
		event.preventDefault();
		deletePost(index);
	};
	console.log(open);
	return (
		<div className='rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:py-10 lg:py-10'>
			<div className='flex flex-row justify-between items-center pr-10'>
				<h4 className='mb-6 text-xl font-semibold text-black  dark:text-white'>
					TESTIMONI POST
				</h4>
				<div className='flex flex-row gap-5 justify-center items-center'>
					<Dialog>
						<DialogTrigger className='flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base'>
							<IoMdAdd />
							<div>Category</div>
						</DialogTrigger>
						<DialogContent>
							<FormCreateBrands />
						</DialogContent>
					</Dialog>
					<Link
						className='bg-slate-400 flex flex-row justify-center items-center gap-2 text-white rounded-md px-4 py-2'
						href='/admin/testimoni/create'>
						<IoMdAdd />
						<div>Testimoni</div>
					</Link>
				</div>
			</div>
			<div className='flex flex-col'>
				<div className='grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-12 lg:grid-cols-12'>
					<div className='p-2.5 xl:p-5 col-span-3 '>
						<h5 className='text-sm font-medium uppercase xsm:text-base'>
							Customer
						</h5>
					</div>
					<div className='p-2.5 text-center col-span-3 xl:p-5'>
						<h5 className='text-sm font-medium uppercase xsm:text-base'>
							Testimoni
						</h5>
					</div>
					<div className='p-2.5 text-center col-span-2 xl:p-5'>
						<h5 className='text-sm font-medium uppercase xsm:text-base'>
							Status
						</h5>
					</div>
					<div className='p-2.5 text-center col-span-1 xl:p-5'>
						<h5 className='text-sm font-medium uppercase xsm:text-base'>
							Brand
						</h5>
					</div>
					<div className='hidden p-2.5 col-span-1 text-center sm:block xl:p-5'>
						<h5 className='text-sm font-medium uppercase xsm:text-base'>
							Edit
						</h5>
					</div>
					<div className='hidden col-span-1 p-2.5 text-center sm:block xl:p-5'>
						<h5 className='text-sm font-medium uppercase xsm:text-base'>
							Hapus
						</h5>
					</div>
					<div className='hidden col-span-1 p-2.5 text-center sm:block xl:p-5'>
						<h5 className='text-sm font-medium uppercase xsm:text-base'>
							Image
						</h5>
					</div>
				</div>

				{data.map((product, key) => (
					<div className='flex flex-col' key={key}>
						<div
							className={`grid grid-cols-12  sm:grid-cols-12 lg:grid-cols-12 
							}`}>
							<div className='flex items-center col-span-3 gap-3 p-2.5 xl:p-5'>
								<p className='hidden text-black dark:text-white sm:block'>
									{product.customer}
								</p>
							</div>
							<div className='flex items-center col-span-3 justify-center p-2.5 xl:p-5'>
								<p className='text-black dark:text-white'>
									{product.testimoni}
								</p>
							</div>
							<div className='flex items-center col-span-2 justify-center p-2.5 xl:p-5'>
								<p className='text-meta-3'>{product.status}</p>
							</div>
							<div className='flex items-center col-span-1 justify-center p-2.5 xl:p-5'>
								<p className='text-meta-3'>
									{product.carBrand && product.carBrand.name}
								</p>
							</div>
							<div className='col-span-1 flex justify-center items-center'>
								<Link
									className='bg-cyan-200 text-black rounded-lg py-2 px-4 flex justify-center items-center'
									href={`/admin/testimoni/edit/${product.id}`}>
									<MdEdit size={25} />
								</Link>
							</div>
							<div className='col-span-1 flex justify-center items-center '>
								<TestimonialDelete id={product.id} />
							</div>
							<div className='col-span-1 w-full h-auto flex justify-center items-center'>
								<button
									className=' bg-purple-200 text-black rounded-lg py-2 px-4 flex justify-center items-center'
									onClick={() => {
										handleOpenIndex(key);
									}}>
									<IoImages size={25} />
								</button>
							</div>
						</div>
						<div
							className={`w-full h-auto border-b border-stroke dark:border-strokedark flex justify-center items-center
								`}>
							{open && index === key && (
								<div
									className='relative col-span-3'
									style={{ minWidth: "100px", minHeight: "100px" }}>
									<Image
										src={`http://localhost:3000/images/${data}`}
										alt={`uploaded Image`}
										width='100'
										height={100}
										className='rounded-lg w-full h-full'
									/>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
