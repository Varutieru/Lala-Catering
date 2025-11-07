"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";

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
          <div className="w-full h-[50vh] bg-[#EF6C6C] flex items-center">
            <div className="w-full h-[50vh] bg-[#EF6C6C] relative overflow-hidden">
            {/* Catering Image */}
            <div className="items-end absolute -top-20 -left-[5vw] w-[70vw] md:w-[60vw] lg:w-[50vw] h-[60vh] md:h-[70vh] lg:h-[94.805vh] -translate-x-[10vw] lg:translate-x-0">
              <Image
                src="/assets/catering/catering.svg"
                alt="Catering Items"
                fill
                className="object-contain"
                priority
              />
            </div>

              {/* Text and Button Container */}
            <div className="relative w-full h-full flex items-center justify-end px-6 md:px-12">
              <div className="flex flex-col items-start lg:items-end gap-6">
                <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <button
                  onClick={() => router.push('/catering')}
                  type="button"
                  className="relative flex items-center justify-center px-10 py-5 rounded-full border-2 border-[#4CB8A2] text-[#FFF1E8] font-century-gothic-bold overflow-hidden group">
                    <span className="absolute inset-0 w-0 bg-[#4CB8A2] rounded-full transition-all duration-300 ease-out group-hover:w-full"></span>
                    <span className="relative z-10 text-2xl">subscribe</span>
                  </button>
                </div>
            <div className="flex justify-start w-full lg:hidden z-10">
                  <button
                    onClick={() => router.push('/catering')}
                    type="button"
                    className="relative flex items-center justify-center px-6 py-3 md:px-8 md:py-4 rounded-full border-2 border-[#4CB8A2] text-[#FFF1E8] font-century-gothic-bold overflow-hidden group">
                    <span className="absolute inset-0 w-0 bg-[#4CB8A2] rounded-full transition-all duration-300 ease-out group-hover:w-full"></span>
                    <span className="relative z-10 text-lg md:text-xl">subscribe</span>
                  </button>
                </div>

                {/* Text Content */}
                  <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="flex flex-col items-start lg:items-end relative"
                >
                  <div className="relative">
                    <h2 className="text-5xl md:text-[170px] lg:text-[280px] text-[#4CB8A2] font-luthon-southard-script absolute top-0 md:-top-15 lg:-top-45 left-0 lg:left-auto mt-2 lg:right-0 z-0">
                      Catering
                    </h2>
                    <h3 className=" text-[25px] md:text-8xl lg:text-[120px] font-sao-torpes text-white relative z-10 mt-8 lg:mt-0">
                      CATERING
                    </h3>
                  </div>
                  <div className="w-[40vw]">
                  <p className="text-sm md:text-2xl lg:text-[30px] font-century-gothic-regular lg:font-century-gothic-bold mt-4 text-right leading-tight z-10">
                    Subscribe to our daily-scheduled meal with the customizable plan and price
                  </p></div>
                </motion.div>      
                </div>
              </div>
            </div>
          </div>

          {/* ONLINE ORDER */}
          <div className="w-full h-[50vh] bg-[#F9A94E] relative">
            {/*Image Container*/}
              <div className="absolute -top-[30vw] md:-top-[30vw] md:left-[15vw] lg:-top-[30vw] lg:-left-[45vw] w-[180vw] h-[120vh] md:w-[160vw] md:h-[120vh] lg:w-[237.7vw] lg:h-[216.575vh] lg:translate-x-[10vw]">
                <Image
                  src="/assets/order/order.svg"
                  alt="Online Order Items"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            {/* Content Container */}
            <div className="relative w-full h-full flex items-center px-6 md:px-12">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="flex flex-col"
                >
                  <div className="relative -top-15 md:-top-25 lg:-left-10 lg:-top-15  w-[40vw] h-[42vh]">
                    <Image
                      src="/assets/order/ordertext.svg"
                      alt="Online Order Items"
                      fill
                      className="object-contain"
                      priority
                    />
                    
                  </div>
                  <div className="relative -top-40  lg:w-[40vw] lg:left-10 lg:-top-15">
                  <p className="flex lg:text-[30px] left-10 text-sm md:text-xl lg:text-2xl text-[#2F4F7F]/90 font-century-gothic-bold max-w-[280px] md:max-w-md lg:max-w-lg ">
                    Order your favorite menu for any occasion
                  </p></div>
                </motion.div>   
                <div className="flex justify-start lg:hidden top-88 absolute">
                  <button
                    onClick={() => router.push('/order')}
                    type="button"
                    className="relative flex items-center justify-center px-6 py-3 md:px-8 md:py-4 rounded-full border-2 border-[#F4F3F6] text-[#2F4F7F] font-century-gothic-bold overflow-hidden group">
                    <span className="absolute inset-0 w-0 bg-[#F4F3F6] rounded-full transition-all duration-300 ease-out group-hover:w-full"></span>
                    <span className="relative z-10 text-lg md:text-xl">order now</span>
                  </button>
                </div>
                <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <button
                  onClick={() => router.push('/order')}
                  type="button"
                  className="relative flex items-center justify-center px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 rounded-full border-2 border-[#F4F3F6] text-[#2F4F7F] font-century-gothic-bold overflow-hidden group lg:mr-8"
                >
                  <span className="absolute inset-0 w-0 bg-[#F4F3F6] rounded-full transition-all duration-300 ease-out group-hover:w-full"></span>
                  <span className="relative z-10 text-lg md:text-xl lg:text-2xl">order now</span>
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT US SECTION */}
        <div className="w-full flex min-h-screen bg-[#4CB8A2] relative overflow-hidden">
          {/* Content Container */}


          {/* Main Container with Background */}
          <div className="w-full h-full items-center relative overflow-hidden bg-[#4CB8A2]/10 ">

          {/* Content Container */}
          <div className="w-full h-full ml-40 mt-20 flex items-center">
            {/* Section Title */}
            <h2 className="text-5xl flex z-10 md:text-7xl lg:text-9xl translate-x-1/5 text-white font-sao-torpes items-center w-full h-full mb-12">
              ABOUT US
            </h2>
          </div>

            {/* Background Image */}
            <div className="absolute flex inset-0 w-[90vw] h-[70vh] ml-24 mt-55">
              <Image
              src="/assets/bg/aboutbg.svg"
              alt="Background pattern"
              fill
              className="object-cover object-none rounded-4xl brightness-65"
              />
            </div>

    
            {/* Image Container */}
            <div className="relative flex flex-row lg:-top-43 lg:-right-20 lg:w-[30vw] h-[30vh] lg:h-[85vh]">
              <Image
                src="/assets/about/bulala.svg"
                alt="Ms. Lala"
                fill
                className="object-contain items-end"
                priority
              />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full px-6 md:px-12 py-8 md:py-12 flex flex-col lg:flex-row items-center gap-8 translate-x-1/2 -top-180 -left-40">
              
              {/* Text Content */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-3xl md:text-4xl lg:text-5xl text-white mb-4">
                  <span className="font-century-gothic-bold">Hello, I am </span>
                  <span className="font-luthon-southard-script text-8xl text-[#EF6C6C]">Ms Lala</span>
                </h3>

                <p className="text-white/90 text-lg md:text-xl lg:text-3xl mb-6 font-century-gothic-regular">
                  <span className="">Curious about our kitchen and our web-development team? Feel free to explore more at our </span>
                  <span className="font-century-gothic-bold">About Us</span>
                  <span className=""> page!</span>
                </p>

                <button
                  onClick={() => router.push('/catering')}
                  type="button"
                  className="relative flex items-center justify-center px-10 py-5 rounded-full border-2 border-[#F4F3F6] text-[#EF6C6C] font-century-gothic-bold overflow-hidden group">
                    <span className="absolute inset-0 w-0 bg-[#F4F3F6] rounded-full transition-all duration-300 ease-out group-hover:w-full"></span>
                    <span className="relative z-10 text-2xl">about us</span>
                  </button>
              </div>
            </div>
          </div>
      </div>
    </main>
  )
}
