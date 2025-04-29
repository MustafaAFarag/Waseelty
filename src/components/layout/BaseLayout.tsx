"use client";

import Footer from "./Footer";
import MessagingDrawer from "./MessagingDrawer";
import Navbar from "./Navbar";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-row">
      {/* Sidebar */}
      <div className="w-64 min-h-screen border-r">
        <Navbar />
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
      <MessagingDrawer />
    </div>
  );
};

export default BaseLayout;
