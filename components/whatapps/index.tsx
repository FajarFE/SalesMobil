import React from "react";

interface WhatsAppChatProps {
	phoneNumber: string;
	message: string;
}

const WhatsAppChat: React.FC<WhatsAppChatProps> = ({
	phoneNumber,
	message,
}) => {
	// Hapus karakter non-digit dari nomor telepon
	const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

	// Encode pesan template untuk URL
	const encodedMessage = encodeURIComponent(message);

	// Buat tautan WhatsApp dengan pesan template
	const whatsappLink = `https://wa.me/${cleanedPhoneNumber}?text=${encodedMessage}`;

	return (
		<a
			href={whatsappLink}
			className='w-full flex'
			target='_blank'
			rel='noopener noreferrer'>
			Chat di WhatsApp
		</a>
	);
};

export default WhatsAppChat;
