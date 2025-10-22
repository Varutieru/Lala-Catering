"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const navItems = [
    { label: "CATERING", href: "/catering"},
    { label: "ORDER", href: "/order"},
    { label: "ABOUT US", href: "/about"},
    { label: "CONTACT", href: "/contact"},
]

export const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    
    const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    };

    return (
        <>
        {/* HEADER */}
        <header className="w-full min-h-[40px] sm:min-h-[40px] md:min-h-[90px] lg:min-h-[120px] min-pt-[2vw] px-[5vw] gap-auto flex justify-between items-center box-border">
            
            {/* HEADER CONTAINER*/}
            <div className="w-full flex justify-between items-center">
                
                {/* LOGO */}
                <div className="sm:min-w-[53px] lg:min-w-[213px] min-h-[30px] sm:min-h-[30px] md:min-h-[55px] lg:min-h-[80px] relative
                                flex justify-start items-center"
                >
                    <button>
                        <Image
                            src={"assets/header/logo.svg"}
                            alt="Lala Catering Logo"
                            fill
                            className="object-contain cursor-pointer"
                            onClick={() => router.push("/")}
                        />
                    </button>
                </div>
                
                {/* NAVBAR */ }
                <nav
                    aria-label="Primary Navigation"
                    className="hidden md:flex max-w-[56.25vw] sm:min-h-[30px] md:min-h-[55px] lg:min-h-[80px] items-center justify-between gap-20"
                >
                    {navItems.map((item, index) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={item.href === "/" ? handleHomeClick : undefined}
                            className="relative inline-block group
                                    text-[#FFF1E8] font-century-gothic-regular text-base sm:text-sm md:text-md lg:text-lg
                                    after:content-[''] after:absolute after:bottom-0 after:left-0 
                                    after:w-0 after:h-[1px] after:rounded-full after:bg-[#FFF1E8]
                                    after:transition-all after:duration-300 after:ease-out
                                    hover:after:w-full"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* SIGN IN BUTTON */}
                <div className="sm:min-w-[53px] lg:min-w-[213px] min-h-[30px] sm:min-h-[30px] md:min-h-[55px] lg:min-h-[80px] relative
                                flex justify-end items-center"
                >
                <button
                    onClick={() => router.push('/signin')}
                    className="hidden md:flex items-center justify-center px-6 lg:px-8 py-2 lg:py-3 
                               rounded-full border-2 border-[#EF6C6C] text-[#FFF1E8] 
                               text-xs sm:text-sm md:text-base lg:text-lg
                               hover:bg-[#EF6C6C] hover:text-white transition-all duration-300
                               whitespace-nowrap flex-shrink-0"
                    style={{ fontFamily: 'Century Gothic, sans-serif' }}
                >
                    Sign In
                </button>
                </div>

            </div>

        </header>
        </>
    )
}

export default Header;