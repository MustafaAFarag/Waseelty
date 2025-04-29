import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-background px-6 py-12 text-white md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12">
          {/* Logo */}
          <div className="lg:col-span-2">
              <Image src='/logo-hero.png' height={150} width={150} alt="Logo"/>
          </div>

          {/* Developers Column */}
          <div className="lg:col-span-2 font-medium">
            <h3 className="mb-4 text-sm font-bold text-gray-400">Developers</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/documentation" className="text-sm hover:text-gray-300">
Web Development                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-sm hover:text-gray-300">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/examples" className="text-sm hover:text-gray-300">
Design                </Link>
              </li>
              <li>
                <Link href="/status" className="flex items-center text-sm hover:text-gray-300">
                  Marketing <span className="ml-2 h-1.5 w-1.5 rounded-full bg-green-500"></span>
                </Link>
              </li>
              <li>  
                <Link href="/whats-new" className="text-sm hover:text-gray-300">
Writing                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2 font-medium">
            <h3 className="mb-4 text-sm font-bold text-gray-400">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm hover:text-gray-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm hover:text-gray-300">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm hover:text-gray-300">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-sm hover:text-gray-300">
                  Legal
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Column */}
          <div className="lg:col-span-2 font-medium">
            <h3 className="mb-4 text-sm font-bold text-gray-400">Social</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://twitter.com"
                  className="text-sm hover:text-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="https://instagram.com"
                  className="text-sm hover:text-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com"
                  className="text-sm hover:text-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Boxes */}

          <div className="space-y-4 lg:col-span-2">
            <Link
              href="/contact-sales"
              className="flex items-center justify-between rounded border border-gray-700 p-4 transition-colors hover:border-gray-500"
              >
              <span className="text-sm">Contact Sales</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
             
          </div>

         
          <div className="space-y-4 lg:col-span-2">
            <Link
              href="/contact-support"
              className="flex items-center justify-between rounded border border-gray-700 p-4 transition-colors hover:border-gray-500"
              >
              <span className="text-sm">Contact Support</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          
          </div>
        </div>
      </div>
    </footer>
  )
}
