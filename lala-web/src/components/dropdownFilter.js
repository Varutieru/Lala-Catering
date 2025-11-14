"use client"

import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const DropdownFilter = ({
    name,
    options,
    value,
    onSelect
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (option) => {
        onSelect(option);
        setIsOpen(false)
    }

  return (
    <div className='relative  w-fit'>
        <button type='button' onClick={toggleDropdown}
                className="w-full h-[60px] px-5 bg-white border-2 border-[#E5713A] rounded-[20px] gap-5 flex justify-between items-center"
        >
            <span className="text-[20px] text-[#E5713A] font-semibold">
                {value ?? name}
            </span>
            <IoChevronDown size={24} color="#E5713A" />
        </button>

        {isOpen && (
        <ul className="absolute z-10 w-full bg-white border-2 border-[#E5713A] rounded-[20px] max-h-48 overflow-auto shadow-md">
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 cursor-pointer hover:bg-[#E5713A] hover:text-white"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DropdownFilter