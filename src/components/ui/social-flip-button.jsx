"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
    FaPhone,
    FaEnvelope,
    FaLinkedin,
    FaGithub,
    FaInstagram,
    FaFacebook,
    FaWhatsapp,
} from "react-icons/fa";

const defaultItems = [
    { letter: "C", icon: <FaPhone />, label: "Call Me", href: "tel:+916382097752", ariaLabel: "Call Me" },
    { letter: "O", icon: <FaEnvelope />, label: "Email", href: "mailto:deenaofficial1507@gmail.com", ariaLabel: "Send Email" },
    { letter: "N", icon: <FaLinkedin />, label: "LinkedIn", href: "https://www.linkedin.com/in/deena-v-b95a63327", ariaLabel: "Open LinkedIn" },
    { letter: "T", icon: <FaGithub />, label: "GitHub", href: "https://github.com/deena303", ariaLabel: "Open GitHub" },
    { letter: "A", icon: <FaInstagram />, label: "Instagram", href: "https://www.instagram.com/mr.freakdeena?igsh=M3RkZXdjaWM0aTht", ariaLabel: "Open Instagram" },
    { letter: "C", icon: <FaFacebook />, label: "Facebook", href: "https://www.facebook.com/share/1B1m99G5Lv/", ariaLabel: "Open Facebook" },
    { letter: "T", icon: <FaWhatsapp />, label: "WhatsApp", href: "https://wa.me/916382097752", ariaLabel: "Open WhatsApp" },
];

const SocialFlipNode = ({
    item,
    index,
    isHovered,
    setTooltipIndex,
    tooltipIndex,
    itemClassName,
    frontClassName,
    backClassName
}) => {
    const Wrapper = item.href ? "a" : "div";
    const wrapperProps = item.href
        ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
        : { onClick: item.onClick };

    return (
        <Wrapper
            {...wrapperProps}
            aria-label={item.ariaLabel}
            className={cn("relative h-10 w-10 md:h-12 md:w-12 cursor-pointer group/node shrink-0", itemClassName)}
            style={{ perspective: "1000px" }}
            onMouseEnter={() => setTooltipIndex(index)}
            onMouseLeave={() => setTooltipIndex(null)}>
            <AnimatePresence>
                {isHovered && tooltipIndex === index && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
                        animate={{ opacity: 1, y: -50, scale: 1, x: "-50%" }}
                        exit={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-1/2 z-50 whitespace-nowrap rounded-lg bg-[#111111] border border-[#ff2a2a]/30 px-3 py-1.5 text-xs font-semibold text-white shadow-[0_0_15px_rgba(255,42,42,0.3)]">
                        {item.label}
                        {/* Arrow */}
                        <div
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-[#111111] border-r border-b border-[#ff2a2a]/30" />
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                className="relative h-full w-full"
                initial={false}
                animate={{ rotateY: isHovered ? 180 : 0 }}
                transition={{
                    duration: 0.8,
                    type: "spring",
                    stiffness: 120,
                    damping: 15,
                    delay: index * 0.08,
                }}
                style={{ transformStyle: "preserve-3d" }}>
                {/* Front - Letter */}
                <div
                    className={cn(
                        "absolute inset-0 flex items-center justify-center rounded-lg bg-[#1a1a1a] text-lg font-bold text-white border border-white/10 transition-transform duration-300 group-hover/node:scale-105 group-hover/node:shadow-[0_0_15px_rgba(255,42,42,0.4)] group-hover/node:border-[#ff2a2a]/50",
                        frontClassName
                    )}
                    style={{ backfaceVisibility: "hidden" }}>
                    {item.letter}
                </div>

                {/* Back - Icon */}
                <div
                    className={cn(
                        "absolute inset-0 flex items-center justify-center rounded-lg bg-[#ff2a2a] text-lg text-white shadow-[0_0_20px_rgba(255,42,42,0.5)]",
                        backClassName
                    )}
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}>
                    {item.icon}
                </div>
            </motion.div>
        </Wrapper>
    );
};

export default function SocialFlipButton({
    items = defaultItems,
    className,
    itemClassName,
    frontClassName,
    backClassName
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [tooltipIndex, setTooltipIndex] = useState(null);

    return (
        <div className={cn("flex items-center justify-center p-4 w-full", className)}>
            <div
                className="group relative flex flex-nowrap items-center justify-center gap-2 md:gap-3 rounded-2xl bg-transparent border border-white/10 p-4 md:p-5 shadow-sm max-w-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setTooltipIndex(null);
                }}>
                {/* Border Lines Container - Clipped */}
                <div
                    className="absolute -inset-[1px] overflow-hidden rounded-2xl pointer-events-none">
                    {/* Animated Top Border Line */}
                    <motion.div
                        className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#ff2a2a] to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "linear",
                        }} />

                    {/* Animated Bottom Border Line */}
                    <motion.div
                        className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#ff2a2a] to-transparent"
                        animate={{ x: ["100%", "-100%"] }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "linear",
                        }} />
                </div>

                {items.map((item, index) => (
                    <SocialFlipNode
                        key={index}
                        item={item}
                        index={index}
                        isHovered={isHovered}
                        setTooltipIndex={setTooltipIndex}
                        tooltipIndex={tooltipIndex}
                        itemClassName={itemClassName}
                        frontClassName={frontClassName}
                        backClassName={backClassName} />
                ))}
            </div>
        </div>
    );
}
