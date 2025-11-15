"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import Header from "@/components/layout/header";

export default function HomePage() {
    return (
        <main className="overflow-x-hidden w-screen h-screen bg-[#002683] flex justify-center items-center">
            {/* COMPONENTS CONTAINER */}
            <div
                className="w-full h-full 
                         xs:mx-[30px] 
                         tablet:mx-[60px] 
                         md:mx-[80px] 
                         lg:mx-[100px] 
                         xl:mx-[130px] 
                         desk:mx-[150px]">
                {/* HEADER */}
                <div className="w-full">
                    <Header />
                </div>
            </div>
        </main>
    );
}
