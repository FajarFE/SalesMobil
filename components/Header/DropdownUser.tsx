'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { signOut } from 'next-auth/react'; // Gunakan dari 'next-auth/react' di client component

// 1. Perbaiki interface: Hapus `children2`
interface DropdownUserProps {
  name: string | null;
  image: string | null;
  children1: React.ReactNode; // Tetap pertahankan untuk konten dialog
}

const DropdownUser = ({ name, children1, image }: DropdownUserProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // Efek untuk menutup dropdown tetap sama
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  // 2. Tambahkan fungsi untuk menangani Sign Out
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' }); // Arahkan ke halaman login setelahnya
  };

  return (
    <div className="relative">
      <button // Menggunakan button agar lebih aksesibel
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {name ?? 'Guest'}
          </span>
          <span className="block text-xs">Admin</span>
        </span>

        <span className="h-10 w-10 rounded-full flex justify-center items-center overflow-hidden">
          {/* Logika gambar disederhanakan */}
          <Image
            src={image || '/images/user/default-avatar.png'} // Gunakan gambar dari prop atau gambar default
            alt="User Avatar"
            width={40}
            height={40}
            className="object-cover"
          />
        </span>
      </button>

      {/* Dropdown Menu */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              href="/admin/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              My Profile
            </Link>
          </li>
          <li>
            {/* children1 untuk konten 'My Contacts' tetap di sini */}
            <Dialog onOpenChange={(open) => !open && setDropdownOpen(false)}>
              <DialogTrigger className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                My Contacts
              </DialogTrigger>
              <DialogContent>{children1}</DialogContent>
            </Dialog>
          </li>
        </ul>

        {/* 
          3. Ganti {children2} dengan tombol Log Out fungsional
          Ini adalah perubahan kunci untuk menghindari nested form
        */}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          {/* Anda bisa menambahkan ikon di sini jika mau */}
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DropdownUser;
