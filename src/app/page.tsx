"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LenisProvider } from "./components/LenisProvider";
import StorytellingHero from "./components/StorytellingHero";
import LoadingSequence from "./components/LoadingSequence";
import { useRouter } from "next/navigation";

export default function Home() {
	const [showContent, setShowContent] = useState(false);
	const router = useRouter();

	const handleSignupClick = () => {
		router.push("/signup");
	};

	const handleLoginClick = () => {
		router.push("/login");
	};

	return (
		<LenisProvider>
			<div className="relative w-full h-full bg-black">
				<LoadingSequence onComplete={() => setShowContent(true)} />
				<AnimatePresence mode="wait">
					{showContent && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.8, ease: "easeInOut" }}
							className="relative"
						>
							<StorytellingHero />
							<div className="absolute top-4 right-4 flex gap-4">
								<button
									onClick={handleLoginClick}
									className="px-6 py-2 bg-transparent text-white border border-white rounded-full font-medium hover:bg-white/10 transition-colors"
								>
									Log in
								</button>
								<button
									onClick={handleSignupClick}
									className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors"
								>
									Sign Up
								</button>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</LenisProvider>
	);
}
