"use client";;
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function CursorCard({
  children,
  image,
  description,
  href = "#",
  className
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e) => {
    x.set(e.clientX - 105); // Center horizontally (width 210 / 2)
    y.set(e.clientY + 20);  // Offset vertically slightly below cursor
  };

  return (
    <>
      <a
        href={href}
        className={cn(
          "relative inline-block font-bold text-neutral-900 dark:text-neutral-100 transition-colors",
          "hover:bg-orange-100 dark:hover:bg-orange-900/40 rounded px-1 -mx-1",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}>
        {children}
      </a>
      {mounted && typeof document !== "undefined" && createPortal(<AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              x: springX,
              y: springY,
            }}
            className={cn(
              "fixed top-0 left-0 pointer-events-none z-50 w-[210px]",
              "bg-neutral-900 p-[10px] shadow-2xl rounded-xl border border-neutral-800"
            )}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt="hover preview"
              className="w-full h-[180px] object-cover rounded-lg mb-2" />
            <p
              className="text-xs leading-5 text-neutral-300 m-0 whitespace-pre-wrap">
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}
    </>
  );
}

export default CursorCard;
