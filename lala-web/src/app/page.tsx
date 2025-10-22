"use client";

import { useState, useEffect } from "react";

import Header from "@/components/header";

export default function HomePage () {

  const [isScrolled, setIsScrolled] = useState(false);
  
  return(
    <main className="overflow-x-hidden max-w-screen">
      <div className="bg-[#EF6C6C] relative w-full min-h-screen max-w-full">

        {/*HERO BG */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/bg/herobg.svg')",
          }}
        />
        {/* Bg Darken */}
        <div className="absolute inset-0 bg-black opacity-50" />

        {/* CONTENT OVERLAY */}
        <div className="relative w-full h-full max-w-full px-[5vw]">

          {/* HEADER */}
          <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-[#0E395D]' : 'bg-transparent'}`}>
            <Header />
          </header>

          {/* HERO */}
          <div className="absolute top-[27vh] left-1/2 -translate-x-1/2 w-full text-center text-white">
            <p className="font-century-gothic-regular text-7xl lg:text-8xl mb-4">
              nutrious food
            </p>
            <p className="font-century-gothic-regular text-7xl lg:text-8xl">
              at your fingertips
            </p> 
          </div>
        </div>
      </div>
    </main>
  )
}