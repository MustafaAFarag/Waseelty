"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const schema = yup.object().shape({
	name: yup.string().required("Name is required"),
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup
		.string()
		.min(8, "Password must be at least 8 characters")
		.required("Password is required"),
});

type SignupFormData = {
	name: string;
	email: string;
	password: string;
};

export default function SignupPage() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupFormData>({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: SignupFormData) => {
		setIsLoading(true);
		try {
			// Here you would typically handle the signup API call
			console.log("Form data:", data);
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			// Navigate to onboarding page instead of opening questionnaire modal
			router.push("/onboarding");
		} catch (error) {
			console.error("Signup error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleSignup = () => {
		setIsLoading(true);
		try {
			// Implement Google OAuth signup
			console.log("Google signup clicked");
			// Simulate API call
			setTimeout(() => {
				// Navigate to onboarding page instead of opening questionnaire modal
				router.push("/onboarding");
				setIsLoading(false);
			}, 1000);
		} catch (error) {
			console.error("Google signup error:", error);
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-muted flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
					Create your account
				</h2>
				<p className="mt-2 text-center text-sm text-foreground/70">
					Or{" "}
					<Link
						href="/login"
						className="font-medium text-primary hover:text-primary/80"
					>
						sign in to your account
					</Link>
				</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-foreground"
							>
								Full Name
							</label>
							<div className="mt-1">
								<input
									id="name"
									type="text"
									{...register("name")}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
								/>
								{errors.name && (
									<p className="mt-1 text-sm text-red-600">
										{errors.name.message}
									</p>
								)}
							</div>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-foreground"
							>
								Email address
							</label>
							<div className="mt-1">
								<input
									id="email"
									type="email"
									{...register("email")}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
								/>
								{errors.email && (
									<p className="mt-1 text-sm text-red-600">
										{errors.email.message}
									</p>
								)}
							</div>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-foreground"
							>
								Password
							</label>
							<div className="mt-1">
								<input
									id="password"
									type="password"
									{...register("password")}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
								/>
								{errors.password && (
									<p className="mt-1 text-sm text-red-600">
										{errors.password.message}
									</p>
								)}
							</div>
						</div>

						<div>
							<button
								type="submit"
								disabled={isLoading}
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isLoading ? "Signing up..." : "Sign up"}
							</button>
						</div>
					</form>

					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-foreground/70">
									Or continue with
								</span>
							</div>
						</div>

						<div className="mt-6">
							<button
								onClick={handleGoogleSignup}
								disabled={isLoading}
								className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-foreground bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<Image
									src="/google.svg"
									alt="Google logo"
									width={20}
									height={20}
									className="mr-2"
								/>
								{isLoading
									? "Signing up with Google..."
									: "Sign up with Google"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
