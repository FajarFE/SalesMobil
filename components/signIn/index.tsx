'use client';

// Importing necessary dependencies
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { redirect } from 'next/navigation';
import { authenticate } from '@/libs/email'; // Asumsi server action untuk email
import { signIn } from 'next-auth/react'; // Gunakan signIn dari next-auth/react untuk client component
import Image from 'next/image';
import { FaGoogle } from 'react-icons/fa6';

export default function Form() {
  // 1. Form state untuk login email/password
  const [formState, action] = useFormState(authenticate, undefined);

  // Hook untuk mendapatkan status pending dari form
  const { pending } = useFormStatus();

  // Redirect jika email belum terverifikasi (dari server action email/password)
  if (formState?.startsWith('EMAIL_NOT_VERIFIED')) {
    redirect(`/email/verify/send?email=${formState.split(':')[1]}`);
  }

  // Server Action khusus untuk Google Sign-In, diletakkan di dalam `formAction`
  const googleSignInAction = async () => {
    // Kita tidak perlu "use server" di sini karena signIn dari 'next-auth/react'
    // akan menangani prosesnya di client-side, yang kemudian berkomunikasi ke server.
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

      <div className="hidden md:block md:col-span-8"></div>

      {/* Form container */}
      <div className="col-span-12 md:col-span-4 bg-gray-50 flex items-center justify-center p-6 sm:p-10 z-10">
        <div className="w-full max-w-md">
          {/* 
            Satu Form untuk semua aksi. 
            'action' utama adalah untuk email/password.
          */}
          <form action={action} className="space-y-6">
            <h1 className="text-2xl font-semibold text-center text-gray-900">
              Please log in to continue.
            </h1>

            {/* Input fields untuk Email & Password */}
            <div>
              {/* Email Input Field */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              {/* Password Input Field */}
              <div className="mt-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Menampilkan pesan error dari login email */}
            {formState && !formState.startsWith('EMAIL_NOT_VERIFIED') && (
              <div className="text-sm text-red-600 text-center">
                {formState}
              </div>
            )}

            {/* Tombol Login untuk Email/Password */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
              disabled={pending}
            >
              Login {pending ? '...' : ''}
            </button>

            {/* Pemisah */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* 
              !!! KUNCI PERUBAHAN !!!
              Tombol ini juga `type="submit"`, tapi menggunakan `formAction`
              untuk memicu server action yang berbeda.
            */}
            <button
              type="submit"
              formAction={googleSignInAction}
              className="w-full flex justify-center items-center gap-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaGoogle size={20} />
              <span>Sign in with Google</span>
            </button>

            {/* Link ke halaman Sign Up */}
            <div className="text-sm text-center">
              <p className="text-gray-600">
                Don&apos;t have an account? 
                <Link
                  href="/register"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
