"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

const skills = [
	"Web Development",
	"Mobile Development",
	"UI/UX Design",
	"Content Writing",
	"Digital Marketing",
	"Data Science",
	"Project Management",
	"Graphic Design",
	"Video Editing",
	"Social Media Management",
];

const experienceLevels = ["Entry Level", "Intermediate", "Expert", "Senior"];

const workTypes = ["Full-time", "Part-time", "Contract", "Freelance"];

const availabilityOptions = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

const onboardingSchema = z.object({
	skills: z.array(z.string()).min(1, "Select at least one skill"),
	experienceLevel: z.string().min(1, "Select your experience level"),
	workType: z.string().min(1, "Select your preferred work type"),
	bio: z
		.string()
		.min(50, "Bio must be at least 50 characters")
		.max(500, "Bio must be less than 500 characters"),
	hourlyRate: z.number().min(1, "Hourly rate must be greater than 0"),
	availability: z.array(z.string()).min(1, "Select at least one availability"),
	portfolioUrl: z.string().url("Invalid portfolio URL"),
});

type OnboardingForm = z.infer<typeof onboardingSchema>;

export default function OnboardingPage() {
	const [step, setStep] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<OnboardingForm>({
		resolver: zodResolver(onboardingSchema),
		defaultValues: {
			skills: [],
			hourlyRate: 0,
			availability: [],
		},
	});

	const onSubmit = async (data: OnboardingForm) => {
		setIsLoading(true);
		try {
			// Here you would typically make an API call to save the onboarding data
			console.log("Onboarding data:", data);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			router.push("/dashboard");
		} catch (error) {
			console.error("Onboarding failed:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const nextStep = () => {
		setStep(step + 1);
	};

	const prevStep = () => {
		setStep(step - 1);
	};

	return (
		<div className="min-h-screen bg-muted py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<div className="bg-white shadow sm:rounded-lg">
					<div className="px-4 py-5 sm:p-6">
						<div className="mb-8">
							<div className="flex items-center justify-between">
								<h2 className="text-2xl font-bold text-foreground">
									Complete Your Profile
								</h2>
								<span className="text-sm text-foreground/70">
									Step {step} of 3
								</span>
							</div>
							<div className="mt-4">
								<div className="relative pt-1">
									<div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
										<div
											style={{ width: `${(step / 3) * 100}%` }}
											className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"
										/>
									</div>
								</div>
							</div>
						</div>

						<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
							{step === 1 && (
								<div className="space-y-6">
									<div>
										<label className="block text-sm font-medium text-foreground">
											Skills
										</label>
										<div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3">
											{skills.map((skill) => (
												<label
													key={skill}
													className="relative flex items-start"
												>
													<div className="flex items-center h-5">
														<input
															type="checkbox"
															{...register("skills")}
															value={skill}
															className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
														/>
													</div>
													<div className="ml-3 text-sm">
														<span className="text-foreground">
															{skill}
														</span>
													</div>
												</label>
											))}
										</div>
										{errors.skills && (
											<p className="mt-2 text-sm text-red-600">
												{errors.skills.message}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-foreground">
											Experience Level
										</label>
										<select
											{...register("experienceLevel")}
											className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
										>
											<option value="">
												Select experience level
											</option>
											{experienceLevels.map((level) => (
												<option key={level} value={level}>
													{level}
												</option>
											))}
										</select>
										{errors.experienceLevel && (
											<p className="mt-2 text-sm text-red-600">
												{errors.experienceLevel.message}
											</p>
										)}
									</div>
								</div>
							)}

							{step === 2 && (
								<div className="space-y-6">
									<div>
										<label className="block text-sm font-medium text-foreground">
											Preferred Work Type
										</label>
										<select
											{...register("workType")}
											className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
										>
											<option value="">Select work type</option>
											{workTypes.map((type) => (
												<option key={type} value={type}>
													{type}
												</option>
											))}
										</select>
										{errors.workType && (
											<p className="mt-2 text-sm text-red-600">
												{errors.workType.message}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-foreground">
											Hourly Rate ($)
										</label>
										<div className="mt-1 relative rounded-md shadow-sm">
											<input
												type="number"
												{...register("hourlyRate", {
													valueAsNumber: true,
												})}
												className="block w-full pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-primary focus:border-primary"
												placeholder="0.00"
											/>
											<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
												<span className="text-gray-500 sm:text-sm">
													USD
												</span>
											</div>
										</div>
										{errors.hourlyRate && (
											<p className="mt-2 text-sm text-red-600">
												{errors.hourlyRate.message}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-foreground">
											Availability
										</label>
										<div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3">
											{availabilityOptions.map((option) => (
												<label
													key={option}
													className="relative flex items-start"
												>
													<div className="flex items-center h-5">
														<input
															type="checkbox"
															{...register("availability")}
															value={option}
															className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
														/>
													</div>
													<div className="ml-3 text-sm">
														<span className="text-foreground">
															{option}
														</span>
													</div>
												</label>
											))}
										</div>
										{errors.availability && (
											<p className="mt-2 text-sm text-red-600">
												{errors.availability.message}
											</p>
										)}
									</div>
								</div>
							)}

							{step === 3 && (
								<div className="space-y-6">
									<div>
										<label className="block text-sm font-medium text-foreground">
											Professional Bio
										</label>
										<div className="mt-1">
											<textarea
												{...register("bio")}
												rows={4}
												className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
												placeholder="Tell us about yourself and your professional experience..."
											/>
										</div>
										{errors.bio && (
											<p className="mt-2 text-sm text-red-600">
												{errors.bio.message}
											</p>
										)}
									</div>

									<div>
										<label className="block text-sm font-medium text-foreground">
											Portfolio URL
										</label>
										<div className="mt-1">
											<input
												type="url"
												{...register("portfolioUrl")}
												className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
												placeholder="https://your-portfolio.com"
											/>
										</div>
										{errors.portfolioUrl && (
											<p className="mt-2 text-sm text-red-600">
												{errors.portfolioUrl.message}
											</p>
										)}
									</div>
								</div>
							)}

							<div className="flex justify-between pt-5">
								{step > 1 && (
									<button
										type="button"
										onClick={prevStep}
										className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-foreground bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
									>
										Previous
									</button>
								)}
								{step < 3 ? (
									<button
										type="button"
										onClick={nextStep}
										className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
									>
										Next
									</button>
								) : (
									<button
										type="submit"
										disabled={isLoading}
										className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
									>
										{isLoading ? "Saving..." : "Complete Profile"}
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
