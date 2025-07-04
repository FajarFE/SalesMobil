// src/components/signup/form.tsx

// Ensuring client-side code
'use client';

// Importing necessary modules and components
import Link from 'next/link';
import { signUp } from '@/actions/signup'; // Server Action untuk signup email
import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';
import { signIn } from 'next-auth/react'; // Fungsi untuk provider login
import { FaGoogle } from 'react-icons/fa6'; // Ikon Google

export default function Form() {
  // State untuk form pendaftaran email/password
  const [formState, action] = useFormState(signUp, {
    errors: {},
  });

  // Hook untuk status pending dari tombol submit utama
  const { pending } = useFormStatus();

  // Aksi yang akan dipicu oleh tombol Google
  const googleSignInAction = async () => {
    // Memanggil fungsi signIn dari NextAuth untuk provider 'google'
    // CallbackUrl adalah halaman tujuan setelah berhasil sign up/login
    await signIn('google', { callbackUrl: '/admin/product' });
  };

  return (
    <div className="w-full h-screen grid grid-cols-12 bg-black relative">
      <Image
        src="https://s7d1.scene7.com/is/image/hyundai/2024-ev-campaign-hp2-ext-1440-1919?wid=1919&qlt=85,0&fmt=webp"
        alt="Background Mobil"
        layout="fill"
        objectFit="cover"
        className="opacity-50"
      />

      {/* Kolom kosong untuk layout di layar besar */}
      <div className="hidden md:block md:col-span-8"></div>

      {/* Kolom untuk form, dibuat responsif */}
      <div className="col-span-12 md:col-span-4 bg-gray-50 flex items-center justify-center p-6 sm:p-10 z-10">
        <div className="w-full max-w-md">
          {/* Form utama dengan action untuk signup email */}
          <form action={action} className="space-y-4">
            <h1 className="text-2xl font-semibold text-center text-gray-900">
              Create an Account
            </h1>

            {/* Grup input fields */}
            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
                  placeholder="Enter your name"
                  type="text"
                  id="name"
                  name="name"
                />
                {formState?.errors.name && (
                  <div className="text-sm text-red-500 mt-1">
                    {formState.errors.name.join(', ')}
                  </div>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
                  placeholder="Enter your email"
                  type="email"
                  id="email"
                  name="email"
                />
                {formState?.errors.email && (
                  <div className="text-sm text-red-500 mt-1">
                    {formState.errors.email.join(', ')}
                  </div>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
                  placeholder="Enter your password"
                  type="password"
                  id="password"
                  name="password"
                />
                {formState?.errors.password && (
                  <div className="text-sm text-red-500 mt-1">
                    {formState.errors.password.join(', ')}
                  </div>
                )}
              </div>
            </div>

            {/* Tombol Sign Up untuk email/password */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
              disabled={pending}
            >
              Sign Up {pending ? '...' : ''}
            </button>

            {/* Pemisah "OR" */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* 
              !!! KUNCI PERUBAHAN !!!
              Tombol ini juga `type="submit"`, tapi menggunakan `formAction`
              untuk memicu aksi yang berbeda, yaitu login/signup via Google.
            */}
            <button
              type="submit"
              formAction={googleSignInAction}
              className="w-full flex justify-center items-center gap-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaGoogle size={20} />
              <span>Sign Up with Google</span>
            </button>

            {/* Link ke halaman login */}
            <div className="text-sm text-center mt-4">
              <p className="text-gray-600">
                Already have an account? 
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
