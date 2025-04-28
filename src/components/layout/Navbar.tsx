import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import * as Avatar from "@radix-ui/react-avatar";
import { FiUser, FiBell } from "react-icons/fi";
import { FC } from "react";

const navVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const linkVariants = {
  hover: { scale: 1.05, color: "#00ADB5" },
};

const Navbar: FC = () => {
  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="w-full  border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={120} height={40} priority />
        </Link>

        <div className="flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {["Projects", "Freelancers", "How it Works", "About"].map((item) => (
            <motion.div key={item} variants={linkVariants} whileHover="hover">
              <Link
                href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-foreground hover:text-primary transition-colors"
          >
            <FiBell size={20} />
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <Avatar.Root className="w-9 h-9 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-primary">
              <Avatar.Fallback className="text-primary">
                <FiUser size={20} />
              </Avatar.Fallback>
            </Avatar.Root>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
