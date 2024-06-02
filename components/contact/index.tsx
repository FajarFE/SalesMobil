"use client";
import Image from "next/image";
import Link from "next/link";

interface WhatsAppChatProps {
	numberPhone: string;
	message: string;
}

export const Contact: React.FC<WhatsAppChatProps> = ({
	numberPhone,
	message,
}) => {
	// Hapus karakter non-digit dari nomor telepon
	const cleanedPhoneNumber = numberPhone?.replace(/\D/g, "");

	// Encode pesan template untuk URL
	const encodedMessage = encodeURIComponent(message);

	// Buat tautan WhatsApp dengan pesan template
	const whatsappLink = `https://wa.me/${cleanedPhoneNumber}?text=${encodedMessage}`;
	return (
		<>
			<div className='w-full h-screen max-w-[1960px] max-h-[780px] flex overflow-hidden justify-center items-center relative '>
				<div className='absolute top-[60px] z-50 w-full flex justify-center items-center flex-col gap-10'>
					<div className='text-6xl px-[500px] w-full justify-center items-center flex text-center font-bold uppercase'>
						Hubungi Kami untuk Detail Mobil Impian Anda{" "}
					</div>
					<Link
						href={whatsappLink}
						className=' bg-black text-2xl px-4 py-3 rounded-full text-white'>
						Contact Sales
					</Link>
				</div>

				<span className='absolute top-0 bg-gradient-to-b   from-[#E2DDD6] from-30% to-transparent  w-full h-[340px] '></span>
				<Image
					alt='aowkdoado'
					src='https://s7d1.scene7.com/is/image/hyundai/2025-tucson-post-reveal-desktop-tout-2up:1-1?wid=1640&hei=700&qlt=85,0&fmt=webp&quot'
					width='2040'
					height='600'
				/>
				<span className='absolute bottom-0 bg-gradient-to-t    from-[#000000] from-20% to-transparent  w-full h-[200px] '></span>
			</div>
		</>
	);
};
