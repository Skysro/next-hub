'use client'
import React, { useState, useEffect } from 'react'
import { fetchData } from '../api/quotes/quotes'

const Quotes = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    let isMounted = true; // Add a flag to check if the component is still mounted

    async function getQuote() {
      const data = await fetchData();
      if (data && data.length > 0 && isMounted) {
        setQuote(data[0].quote);
        setAuthor(data[0].author);
      }
    }
    getQuote();

    return () => {
      isMounted = false; // Cleanup function to set the flag to false when the component unmounts
    };
  }, []);
  
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-white p-4 rounded-md shadow-md'>
        <h1 className='text-2xl font-bold'>Quote of the Day</h1>
        <p className='text-lg'>{quote}</p>
        <p className='text-lg'>{author}</p>
      </div>
    </div>
  )
}

export default Quotes;