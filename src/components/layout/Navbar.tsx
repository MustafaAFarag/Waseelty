"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Home,
  LayoutDashboard,
  BarChart,
  Users,
  Layers,
  Settings,
  ChevronRight,

  Globe,
  Mail,
  Webhook,
  FileCode,
  CreditCard,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

type NavItem = {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
  submenu?: {
    icon: React.ReactNode
    label: string
    href: string
  }[]
}

const navItems: NavItem[] = [
  {
    icon: <Home className="h-5 w-5" />,
    label: "Dashboard",
    href: "/dashboard/freelancer",
  },
  {
    icon: <LayoutDashboard className="h-5 w-5" />,
    label: "Jobs",
    href: "/overview",
  },
  {
    icon: <BarChart className="h-5 w-5" />,
    label: "Profile",
    href: "/reporting",
  },
 
  {
    icon: <Users className="h-5 w-5" />,
    label: "My Customers",
    href: "/customers",
  },
  {
    icon: <Layers className="h-5 w-5" />,
    label: "Integrations",
    href: "/integrations",
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: "Preferences",
    href: "/preferences",
    active: true,
    submenu: [
      {
        icon: <Settings className="h-5 w-5" />,
        label: "General",
        href: "/preferences/general",
      },
      {
        icon: <Globe className="h-5 w-5" />,
        label: "Domains",
        href: "/preferences/domains",
      },
      {
        icon: <Mail className="h-5 w-5" />,
        label: "Email automation",
        href: "/preferences/email",
      },
      {
        icon: <Layers className="h-5 w-5" />,
        label: "Integrations",
        href: "/preferences/integrations",
      },
      {
        icon: <Webhook className="h-5 w-5" />,
        label: "Webhooks",
        href: "/preferences/webhooks",
      },
      {
        icon: <FileCode className="h-5 w-5" />,
        label: "API documentation",
        href: "/preferences/api",
      },
      {
        icon: <CreditCard className="h-5 w-5" />,
        label: "Plans and billing",
        href: "/preferences/billing",
      },
      {
        icon: <CreditCard className="h-5 w-5" />,
        label: "Bank details",
        href: "/preferences/bank",
      },
      {
        icon: <Shield className="h-5 w-5" />,
        label: "Security and recovery",
        href: "/preferences/security",
      },
    ],
  },
]

const inboxUsers = [
  {
    name: "Olive Nacelle",
    email: "olive@untitledui.com",
    avatar: "/person1.jpg",
    online: true,
  },
  {
    name: "Amélie Laurent",
    email: "amelie@untitledui.com",
    avatar: "/person2.jpg",
    online: true,
  },
  {
    name: "Amélie Jackson Love",
    email: "jackson@untitledui.com",
    avatar: "/person3.jpg",
    online: false,
  },
  {
    name: "Frankie Sullivan",
    email: "frankie@untitledui.com",
    avatar: "/person4.jpg",
    online: false,
  },
  {
    name: "Lana Steiner",
    email: "lana@untitledui.com",
    avatar: "/person5.jpg",
    online: false,
  },
]

export default function SidebarNavigation() {
  const [collapsed] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

 

  const toggleSubmenu = (label: string) => {
    if (activeSubmenu === label) {
      setActiveSubmenu(null)
    } else {
      setActiveSubmenu(label)
    }
  }

 

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={cn(
          "flex h-full flex-col border-r bg-white transition-all duration-300 z-50",
          collapsed ? "w-[72px]" : "w-[280px]",
        )}
      >
        {/* Logo */}
        <div className="flex  items-center justify-center border-b">
          {collapsed ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
              <div className="h-4 w-4 rounded-full border-2 border-white"></div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Image src='/logo.png' height={150} width={150} alt='Logo' />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100",
                    item.active && "bg-indigo-50 text-primary",
                  )}
                  onClick={(e) => {
                    if (item.submenu) {
                      e.preventDefault()
                      toggleSubmenu(item.label)
                    }
                  }}
                >
                  <span className={cn("flex-shrink-0", item.active && "text-primary")}>{item.icon}</span>
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.submenu && (
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 text-gray-400 transition-transform",
                            activeSubmenu === item.label && "rotate-90",
                          )}
                        />
                      )}
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Inbox Section */}
        {!collapsed && (
          <div className="border-t px-4 py-4">
            <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">Inbox</h3>
            <ul className="space-y-2">
              {inboxUsers.map((user) => (
                <li key={user.email}>
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-md py-1 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                      {user.online && (
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500"></span>
                      )}
                    </div>
                    <div className="flex-1 truncate">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

       


        {/* User Profile */}
        <div className="border-t p-4">
          <Link
            href="/profile"
            className={cn("flex items-center gap-3 rounded-md hover:bg-gray-100", collapsed && "justify-center")}
          >
            <div className="h-8 w-8 overflow-hidden rounded-full">
              <img
                src="/mustafa.jpg"
                alt="Mustafa Ashraf"
                className="h-full w-full object-cover"
              />
            </div>
            {!collapsed && (
              <div className="flex-1">
                <p className="text-sm font-medium">Mustafa Ashraf</p>
                <p className="text-xs text-gray-500">mustafa.ashraf.saad@gmail.com</p>
              </div>
            )}
          </Link>
        </div>
      </div>

      {/* Submenu - Now positioned absolutely */}
      {activeSubmenu && !collapsed && (
        <div className="absolute left-[240px] top-0 h-full w-[280px] border-r bg-white shadow-lg z-40">
          <div className="flex h-16 items-center border-b px-6">
            <h2 className="text-lg font-semibold">{activeSubmenu}</h2>
          </div>
          <nav className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 64px)' }}>
            <ul className="space-y-1">
              {navItems
                .find((item) => item.label === activeSubmenu)
                ?.submenu?.map((subItem) => (
                  <li key={subItem.label}>
                    <Link
                      href={subItem.href}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      <span className="flex-shrink-0">{subItem.icon}</span>
                      <span className="flex-1">{subItem.label}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      )}

    
     
    </div>
  )
}
