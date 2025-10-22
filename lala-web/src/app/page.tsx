"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import Header from "@/components/header";

export default function HomePage () {

  const [isScrolled, setIsScrolled] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = () => {
  const targetElement = document.getElementById('profilePage');
  targetElement?.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start' 
  });
};
  
  return(
    <main className="overflow-x-hidden w-screen h-screen">
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
          <header className={`absolute top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-[#0E395D]' : 'bg-transparent'}`}>
            <Header />
          </header>

          {/* HERO */}
            <div className="absolute top-[50vh] left-1/2 -translate-x-1/2 -translate-y-1/2 
                          w-[80vw] md:w-[60vw] lg:w-[42vw] 
                          flex flex-col justify-center items-center gap-8 md:gap-12">

              {/* TAGLINE */}
              <h1 className="font-century-gothic-regular 
                           text-3xl md:text-5xl lg:text-6xl 
                           text-[#FFF1E8] text-center leading-tight lowercase">
                nutritious foods at your fingertips
              </h1>

              {/* BUTTONS CONTAINER */}
              <div className="w-full h-full flex justify-center items-center gap-[-10]">

                {/* CATERING */}
                <div className="relative w-[350px] h-[112px] md:w-[450px] md:h-[144px] lg:w-[600px] lg:h-[192px]">
                  <Image
                    src={"assets/hero/catering.svg"}
                            alt="Catering Button"
                            fill
                            className="object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={() => router.push("/catering")}
                  />
                </div>

                {/* ONLINE ORDER */ }
                <div className="relative w-[350px] h-[112px] md:w-[450px] md:h-[144px] lg:w-[600px] lg:h-[192px]">
                  <Image
                    src={"assets/hero/onlineorder.svg"}
                            alt="Catering Button"
                            fill
                            className="object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={() => router.push("/order")}
                  />
                </div>

              </div>

            </div>

        </div>

        {/* EXPLORE MORE BUTTON */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[10vh] z-[100]">
          <button
            onClick={() => scrollToSection()}
            type="button"
            className="relative flex items-center justify-center 
                     px-8 py-3 
                     rounded-full border-2 border-[#4CB8A2] 
                     text-[#FFF1E8] font-sao-torpes
                     overflow-hidden
                     group">
            <span className="absolute inset-0 w-0 bg-[#4CB8A2] rounded-full
                     transition-all duration-300 ease-out
                     group-hover:w-full"></span>
            <span className="relative z-10">Explore Now</span>
          </button>
        </div>

      </div>

      {/* PROFILE SECTION */}
      <div
        id="profilePage"
        className="w-screen h-screen overflow-x-hidden overflow-y-hidden">
        
        {/* CATERING */}
        <div className="w-full h-[50vh] bg-[#EF6C6C] flex items-center justify-center">
          <button
            onClick={() => router.push('/catering')}
            type="button"
            className="relative flex items-center justify-center px-10 py-5 rounded-full border-2 border-[#4CB8A2] text-[#FFF1E8] font-century-gothic-bold overflow-hidden group">
            <span className="absolute inset-0 w-0 bg-[#4CB8A2] rounded-full transition-all duration-300 ease-out group-hover:w-full"></span>
            <span className="relative z-10 text-2xl md:text-4xl">subscribe</span>
          </button>
        </div>

        {/* ONLINE ORDER */}
        <div className="w-full h-[50vh] bg-[#F9A94E] flex justify-center items-center">
          <button
            onClick={() => router.push('/order')}
            type="button"
            className="relative flex items-center justify-center px-10 py-5 rounded-full border-2 border-[#F4F3F6] text-[#2F4F7F] font-century-gothic-bold overflow-hidden group">
            <span className="absolute inset-0 w-0 bg-[#F4F3F6] rounded-full transition-all duration-300 ease-out group-hover:w-full"></span>
            <span className="relative z-10 text-2xl md:text-4xl">order now</span>
          </button>
        </div>

      </div>

    </main>
  )
}