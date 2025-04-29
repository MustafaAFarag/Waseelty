"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    router.push("/dashboard/freelancer");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
  <div className="flex w-full max-w-7xl flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden max-h-[90vh]">
      {/* Left Column - Login Form */}
      <div className="flex flex-1 flex-col p-20 ">
        <div className="flex justify-center mb-5">
          
            <Link
              href="/dashboard/freelancer"
              className="flex justify-center items-center gap-2 text-primary"
            >
              <Image src="/logo.png" height={150} width={150} alt="logo" />
            </Link>
          
        </div>

        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="mt-2 text-gray-500">
              Enter your email and password to access your account.
            </p>
          </div>

          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue="fekra-x@company.com"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    defaultValue="Sellostore"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember Me
                </label>
              </div>
              <div className="text-sm">
                <span className="font-medium text-primary hover:text-cyan-500 cursor-pointer">
                  Forgot Your Password?
                </span>
              </div>
            </div>

            <div>
              <button
                onClick={handleLogin}
                className="group relative flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Log In
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or Login With
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm hover:bg-gray-100"
              >
                <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                  <path
                    d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064 5.963 5.963 0 014.123 1.632l2.917-2.917a10.027 10.027 0 00-7.04-2.704 10.056 10.056 0 100 20.112c5.782 0 9.607-4.157 9.607-10.009 0-.672-.069-1.317-.2-1.943h-9.407z"
                    fill="currentColor"
                  />
                </svg>
                <span className="ml-2">Google</span>
              </button>

              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm hover:bg-gray-100"
              >
                <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                  <path
                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"
                    fill="currentColor"
                  />
                </svg>
                <span className="ml-2">Apple</span>
              </button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            Don&apos;t Have An Account?{" "}
            <Link
              href="/signup"
              className="font-medium text-primary hover:text-primary"
            >
              Register Now
            </Link>
            .
          </div>
        </div>

        <div className="mt-auto flex justify-between pt-8 text-xs text-gray-500">
          <div>Copyright © 2025 Fekra-X Enterprises LTD.</div>
          <Link href="/privacy" className="hover:text-gray-700">
            Privacy Policy
          </Link>
        </div>
      </div>

      {/* Right Column - Image */}
      <div
        className="hidden md:flex md:w-1/2 md:flex-col md:items-center md:justify-center p-8 text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/bird.webp')" }}
      >
        
      </div>
    </div>
    </div>

  );
}
