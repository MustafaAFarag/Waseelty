"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const schema = yup.object().shape({
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup.string().required("Password is required"),
});

type LoginFormData = {
	email: string;
	password: string;
};

export default function LoginPage() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: LoginFormData) => {
		setIsLoading(true);
		try {
			// Here you would typically handle the login API call
			console.log("Login data:", data);
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			// Navigate to dashboard or home page after successful login
			router.push("/");
		} catch (error) {
			console.error("Login error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleLogin = () => {
		setIsLoading(true);
		try {
			// Implement Google OAuth login
			console.log("Google login clicked");
			// Simulate API call
			setTimeout(() => {
				// Navigate to dashboard or home page after successful login
				router.push("/");
				setIsLoading(false);
			}, 1000);
		} catch (error) {
			console.error("Google login error:", error);
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-muted flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
					Sign in to your account
				</h2>
				<p className="mt-2 text-center text-sm text-foreground/70">
					Or{" "}
					<Link
						href="/signup"
						className="font-medium text-primary hover:text-primary/80"
					>
						create a new account
					</Link>
				</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember-me"
									name="remember-me"
									type="checkbox"
									className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
								/>
								<label
									htmlFor="remember-me"
									className="ml-2 block text-sm text-foreground"
								>
									Remember me
								</label>
							</div>

							<div className="text-sm">
								<a
									href="#"
									className="font-medium text-primary hover:text-primary/80"
								>
									Forgot your password?
								</a>
							</div>
						</div>

						<div>
							<button
								type="submit"
								disabled={isLoading}
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isLoading ? "Signing in..." : "Sign in"}
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
								onClick={handleGoogleLogin}
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
									? "Signing in with Google..."
									: "Sign in with Google"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
