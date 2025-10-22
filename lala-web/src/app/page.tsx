"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import Header from "@/components/header";

export default function HomePage () {

  const [isScrolled, setIsScrolled] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  
  return(
    <main className="overflow-x-hidden max-w-screen h-screen">
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
            <div className="absolute -translate-x-1/2 -translate-y-1/2 
                          w-[80vw] md:w-[60vw] lg:w-[42vw] 
                          flex flex-col justify-center items-center gap-8 md:gap-12">

              {/* TAGLINE */}
              <h1 className="font-century-gothic-regular 
                           text-3xl md:text-5xl lg:text-6xl 
                           text-[#FFF1E8] text-center leading-tight lowercase">
                nutritious foods at your fingertips
              </h1>

              {/* BUTTONS CONTAINER */}
              <div className="w-full flex justify-around items-center gap-4">

                {/* CATERING */}
                <div className="relative w-[200px] h-[80px] md:w-[250px] md:h-[100px] lg:w-[300px] lg:h-[120px]">
                  <Image
                    src={"assets/hero/catering.svg"}
                            alt="Catering Button"
                            fill
                            className="object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={() => router.push("/catering")}
                  />
                </div>

                {/* ONLINE ORDER */ }
                <div className="relative w-[200px] h-[80px] md:w-[250px] md:h-[100px] lg:w-[300px] lg:h-[120px]">
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
      </div>
    </main>
  )
}