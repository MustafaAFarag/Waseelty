"use client";

import Footer from "./Footer";
import MessagingDrawer from "./MessagingDrawer";
import Navbar from "./Navbar";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <MessagingDrawer />
    </div>
  );
};

export default BaseLayout;
