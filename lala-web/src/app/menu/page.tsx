"use client"

import Header from '@/components/header';
import Search from '@/components/search';
import DropdownFilter from '@/components/dropdownFilter'
import React, { useState } from "react";

const Page = () => {
    const [selectedHari, setSelectedHari] = useState<string | null>(null);
  return (
    <div>
      <Search />
      <DropdownFilter
        name='Hari'
        options={['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']}
        value={selectedHari}
        onSelect={setSelectedHari} />

    </div>
  );
};

export default Page;