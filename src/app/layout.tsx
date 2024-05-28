import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/libs/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

// Now, let's build our Root Layout component
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// This Root Layout serves as the canvas for our application's visual structure
	return (
		<html lang='en'>
			<body className={inter.className}>
				<main>
					<Providers>{children}</Providers>
				</main>
				<Toaster />
			</body>
		</html>
	);
}