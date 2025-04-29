import Link from "next/link"
import { Eye } from "lucide-react"
import Image from "next/image"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
  <div className="flex w-full max-w-7xl flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden max-h-[90vh]">
     <div
        className="hidden md:flex md:w-1/2 md:flex-col md:items-center md:justify-center p-8 text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/default.png')" }}
      >
        
      </div>
      {/* Right Column - Signup Form */}
      <div className="flex flex-1 flex-col items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-2">
              <Image src='/logo.png' width={150} height={150} alt='Logo' />
            </div>
          </div>

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Hi! 👋</h1>
            <h1 className="text-3xl font-bold">Welcome to Waseelty dude</h1>
            <h1></h1>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="sr-only">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  defaultValue="Mustafa"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  defaultValue="Ashraf"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                defaultValue="mustafa.ashraf.saad@gmail.com"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-primary"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                defaultValue='mustafapassword12'
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-primary"
              />
              <button type="button" className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <Eye className="h-5 w-5" />
              </button>
            </div>

            <button
              className="w-full rounded-md bg-primary py-2 font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Link href="/login">
              Sign up
              </Link>
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:text-primary">
              Sign In
            </Link>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or with email</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064 5.963 5.963 0 014.123 1.632l2.917-2.917a10.027 10.027 0 00-7.04-2.704 10.056 10.056 0 100 20.112c5.782 0 9.607-4.157 9.607-10.009 0-.672-.069-1.317-.2-1.943h-9.407z"
                    fill="currentColor"
                  />
                </svg>
                Sign up with Google
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"
                    fill="currentColor"
                  />
                </svg>
                Sign up with Apple
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
