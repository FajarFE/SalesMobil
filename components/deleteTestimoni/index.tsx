// src/components/post-delete.tsx

// this is a client component, because we need to use client-side feature
"use client";
import { MdDelete } from "react-icons/md";
import { deletePost } from "@/actions/deleteProduct";
import { deleteTestimoni } from "@/actions/deleteTestimoni";

interface PostDeleteProps {
	id: string; // The ID of the post to delete.
}

export default function TestimonialDelete({ id }: PostDeleteProps) {
	const deleteAction = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		deleteTestimoni(id);
	};

	return (
		<form onSubmit={deleteAction}>
			<button
				type='submit'
				className='text-sm  px-4 py-2 bg-red-200 text-black rounded-lg'>
				<MdDelete size={25} />
			</button>
		</form>
	);
}
