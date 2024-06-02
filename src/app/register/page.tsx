import Form from "@/components/signUp";
import { signIn } from "@/libs/auth";
import { FaGoogle } from "react-icons/fa";

export default function SignIn() {
	return (
		<>
			<Form>
				<form
					className='w-full px-20 flex justify-center items-center h-auto '
					action={async () => {
						"use server";
						await signIn("google", { redirectTo: "/admin/product" });
					}}>
					<button
						className='bg-slate-400 w-full flex justify-between items-center py-4 px-5 flex-row mx-2 gap-2 rounded-lg text-white'
						type='submit'>
						<FaGoogle size={25} />
						<div>Signin with Google</div>
					</button>
				</form>
			</Form>
		</>
	);
}
