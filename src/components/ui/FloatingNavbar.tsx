"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface NavItem {
  name: string;
  link: string;
}

export const FloatingNavbar = ({ 
  navItems, 
  className,
  showLogo = true // New prop to control logo visibility
}: { 
  navItems: NavItem[]; 
  className?: string;
  showLogo?: boolean;
}) => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed inset-x-0 top-6 z-50 mx-auto flex max-w-fit items-center justify-center rounded-full border border-white/10 bg-black/60 py-4 px-10 backdrop-blur-xl shadow-2xl",
        className
      )}
    >
      {/* Only show logo if requested */}
      {showLogo && (
        <a href="#" className="absolute left-8 text-2xl font-bold text-amber-300 tracking-wider">
          LUNA
        </a>
      )}

      {/* Nav Links - centered when no logo */}
      <div className={cn("flex items-center space-x-8", showLogo && "ml-32")}>
        {navItems.map((navItem, idx) => (
          <a
            key={idx}
            href={navItem.link}
            className="relative text-neutral-200 hover:text-amber-300 text-lg font-medium transition-colors duration-300"
          >
            {navItem.name}
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 scale-x-0 origin-center transition-transform duration-300 hover:scale-x-100" />
          </a>
        ))}
      </div>

      {/* CTA Button */}
      <a
        href="#reservation"
        className="ml-10 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-3 text-white font-semibold shadow-lg hover:shadow-amber-500/70 transition-all duration-300 hover:scale-105"
      >
        Book a Class
      </a>
    </motion.div>
  );
};