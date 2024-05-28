import { Control, FieldValues } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { MdDelete, MdFileUpload } from "react-icons/md";
import Image from "next/image";
import { Input } from "../ui/input";
import { useState } from "react";

interface propsInputImage {
	data: string[] | undefined | string;
	control: Control<any>;
	handleFileDrops?: (event: React.DragEvent<HTMLDivElement>) => void;
	handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleRemoveFile: (
		index: number,
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => void;
	name: string;
	multiple: boolean;
	progress: number;
	label: string;
}

export const InputImage = ({
	data,
	control,
	label,
	handleFileDrops,
	handleRemoveFile,
	progress,
	multiple,
	handleFileChange,
	name,
}: propsInputImage) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field: { value, onChange, ...field } }) => {
				return (
					<FormItem>
						<FormLabel>{label}</FormLabel>
						<FormControl>
							<div className='h-auto flex justify-center items-center flex-col gap-10 rounded-xl border-2 border-slate-400 p-10'>
								<div
									className={`rounded-xl w-full ${
										data && data.length > 0 ? "h-auto" : "h-[300px]"
									} flex flex-col justify-center p-4 items-center border-2 border-slate-200 border-dotted`}
									onDrop={handleFileDrops}
									onDragOver={(event) => event.preventDefault()}>
									<div className='flex flex-col justify-center items-center text-2xl gap-2'>
										<div>DROP IMAGE HERE</div>
										<MdFileUpload size={100} />
									</div>

									<div className='grid grid-cols-12 w-full gap-5 m-5'>
										{data &&
											(Array.isArray(data) ? (
												data.map((item, index) => (
													<div
														className='relative col-span-3'
														key={index}
														style={{ minWidth: "100px", minHeight: "100px" }}>
														<Image
															src={`http://localhost:3000/images/${item}`}
															alt={`uploaded Image`}
															width='100'
															height={100}
															className='rounded-lg w-full h-full'
														/>
														<button
															className='absolute top-0 right-0'
															onClick={(e) => handleRemoveFile(index, e)}>
															<MdDelete size={25} className='text-slate-200' />
														</button>
													</div>
												))
											) : (
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
													<button
														className='absolute top-0 right-0'
														onClick={(e) => handleRemoveFile(0, e)}>
														<MdDelete size={25} className='text-slate-200' />
													</button>
												</div>
											))}
									</div>
								</div>
								<div className='flex flex-row w-full justify-center items-center gap-5'>
									<div className='w-full flex flex-row justify-center items-center gap-5'>
										<div className='relative w-full bg-slate-200 h-4 rounded-full'>
											<div
												className='h-full bg-violet-500 rounded-full absolute'
												style={{
													width: `${Math.min(progress, 100)}%`,
												}}></div>
										</div>
										<div>{Math.min(progress, 100)}%</div>
									</div>
									<Input
										type='file'
										onChange={handleFileChange}
										multiple={multiple === true}
										placeholder='Masukan File'
										{...field}
										className='w-[15%]'
									/>
								</div>
							</div>
						</FormControl>
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
};
