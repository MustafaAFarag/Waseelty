"use client";

import Link from "next/link";

export default function TestPage() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
			<h1 className="text-3xl font-bold mb-8">Test Navigation</h1>
			<div className="space-y-4">
				<Link
					href="/signup"
					className="block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
				>
					Go to Signup Page
				</Link>
				<Link
					href="/"
					className="block px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
				>
					Go to Home Page
				</Link>
			</div>
		</div>
	);
}
