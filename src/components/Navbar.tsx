"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
	const pathname = usePathname();
	const router = useRouter();

	// Don't show the navbar on the signup page
	if (pathname === "/signup") {
		return null;
	}

	const handleSignupClick = () => {
		router.push("/signup");
	};

	return (
		<nav className="bg-white shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex">
						<div className="flex-shrink-0 flex items-center">
							<Link
								href="/"
								className="text-xl font-bold text-indigo-600"
							>
								Waseelty
							</Link>
						</div>
					</div>
					<div className="flex items-center">
						<button
							onClick={handleSignupClick}
							className="absolute top-4 right-4 px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors"
						>
							Sign Up
						</button>
						<button className="ml-4 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							Log in
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
