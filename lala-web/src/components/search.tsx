"use client"

import React, { ChangeEvent, useState } from 'react';
import { IoSearch } from 'react-icons/io5';

const Search = () => {
  const [value, setValue] = useState('');

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const performSearch = (query: string) => {
    console.log("Searching:", query);
  }

  const onClickIcon = () => {
    performSearch(value);
  }

  return (
    <div className='flex items-center px-5'
        style={{width:'500px', height: '60px',
                background: '#FFFFFF', border: '2px solid #E5713A', borderRadius: '20px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

      <input type="search" placeholder='Cari menu hari ini...'
              value={value}
              onChange={searchHandler}
              style={{fontWeight: 400, fontSize: '20px',
              lineHeight: '24px', letterSpacing: '0.05em', color: '#5B5B5B',
              width: '100%', height: '24px', flexGrow:'1', outline:'none'}} />
      
      <IoSearch size={24} color={"#E5713A"}
                className='font-bold'
                style={{marginLeft:'10px', cursor:'pointer'}}
                onClick={onClickIcon} />
    </div>
  )
}

export default Search;


