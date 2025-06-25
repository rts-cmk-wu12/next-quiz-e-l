'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import backgroundImage from './assets/background.svg';
import Image from 'next/image';
import { GrHistory } from "react-icons/gr";
import { FiMoon } from "react-icons/fi";
import { useState, useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [amountValue, setAmountValue] = useState(5);
  const [categoryValue, setCategoryValue] = useState('');
  const [difficultyValue, setDifficultyValue] = useState('');
  
  useEffect(() => {
    // Move the fetch to useEffect since we're now in a Client Component
    const fetchCategories = async () => {
      const response = await fetch('https://opentdb.com/api_category.php');
      const data = await response.json();
      setCategories(data.trivia_categories);
    };
    
    fetchCategories();
  }, []);
  
  // Handler for the range input change
  const handleAmountChange = (e) => {
    setAmountValue(e.target.value);
  };

  // Handlers for select inputs
  const handleCategoryChange = (e) => {
    setCategoryValue(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setDifficultyValue(e.target.value);
  };
  
  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Redirect to quiz page with query parameters
    router.push(`/quiz?amount=${amountValue}&category=${categoryValue}&difficulty=${difficultyValue}`);
  };

  return (
    <>
      <div className='absolute z-[-1] w-[90vw] h-[270px] left-[50%] -translate-x-[50%] top-[1rem] rounded-3xl overflow-hidden'>
        <Image
          className='w-full h-full object-cover'
          src={backgroundImage}
          alt="Background image"
        />
      </div>
      <h1 className='text-center text-[3rem] font-bold text-white my-[4rem]'>TriviaTap</h1>
      <div className='bg-white mx-[4rem] rounded-3xl p-4 mt text-[1.2rem] shadow-xl'>
        <p>Velkomstbesked og kort introduktion til quizzen. Velkomstbesked og kort introduktion til quizzen.</p>
      </div>
      <main className='mx-[2rem]'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
          <select 
            name="category" 
            id="category" 
            value={categoryValue}
            onChange={handleCategoryChange}
            className='text-[1.2rem] p-2 rounded-lg border-[2px] border-purple-700'
            required
          >
            <option value="" className='text-[1rem] p-2 border-[2px] bg-purple-200'>Category</option>
            {categories.map((category) => (
              <option 
                key={category.id} 
                value={category.id} 
                className='text-[1rem] p-2 border-[2px] bg-purple-200'
              >
                {category.name}
              </option>
            ))}
          </select>
          <select 
            name="difficulty" 
            id="difficulty" 
            value={difficultyValue}
            onChange={handleDifficultyChange}
            className='text-[1.2rem] p-2 rounded-lg border-[2px] border-purple-700'
            required
          >
            <option value="" className='text-[1rem] p-2 border-[2px] bg-purple-200'>Difficulty</option>
            <option value="easy" className='text-[1rem] p-2 border-[2px] bg-purple-200'>Easy</option>
            <option value="medium" className='text-[1rem] p-2 border-[2px] bg-purple-200'>Medium</option>
            <option value="hard" className='text-[1rem] p-2 border-[2px] bg-purple-200'>Hard</option>
          </select>
          <div className='flex flex-col gap-2'>
            <label htmlFor="amount">Amount of Questions</label>
            <div className='flex items-center gap-2'>
              <input
                type="range"
                id="amount"
                name="amount"
                min="5"
                max="50"
                step="5"
                value={amountValue}
                onChange={handleAmountChange}
                className='w-full h-2 bg-purple-700 rounded-lg appearance-none cursor-pointer'
                required
              />
              <span id="amount-value">{amountValue}</span>
            </div>
          </div>
          <button 
            type="submit"
            className='bg-purple-700 text-white text-[1.2rem] p-2 rounded-lg text-center'
          >
            Start Quiz
          </button>
        </form>
        <Link href='#' className='flex justify-between px-[2rem] items-center my-[1rem] bg-blue-700 text-white text-[1.2rem] p-2 rounded-lg'>
          <p>View History</p><GrHistory />
        </Link>
        <button className='flex justify-between px-[2rem] items-center my-[1rem] w-full bg-purple-200 text-white text-[1.2rem] p-2 rounded-lg'>
          Darkmode <FiMoon />
        </button>
      </main>
    </>
  );
}