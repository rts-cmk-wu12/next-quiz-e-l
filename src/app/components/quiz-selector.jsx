'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function QuizSelector({categories}) {
    const router = useRouter();
    const [amountValue, setAmountValue] = useState(5);

    // Handler for the range input change
    function handleAmountChange(e) {
        setAmountValue(e.target.value);
    };

    // Form submission handler
    function handleSubmit(e) {
        e.preventDefault();

        const amountValue = e.target.amount.value;
        const categoryValue = e.target.category.value;
        const difficultyValue = e.target.difficulty.value;

        if (!amountValue || categoryValue === 'Category' || difficultyValue === 'Difficulty') {
            alert('Please fill in all fields.');
            return;
        }

        // Redirect to quiz page with query parameters
        router.push(`/quiz?amount=${amountValue}&category=${categoryValue}&difficulty=${difficultyValue}`);
    };

    return (
        <>
         <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
          <select 
            name="category" 
            id="category" 
            className='text-[1.2rem] p-2 rounded-lg border-[2px] border-pr-purple'
            required
          >
            <option className='text-[1rem] p-2 border-[2px] bg-ac-light-purple'>Category</option>
            {categories.map((category) => (
              <option 
                key={category.id} 
                value={category.id} 
                className='text-[1rem] p-2 border-[2px] bg-ac-light-purple'
              >
                {category.name}
              </option>
            ))}
          </select>
          <select 
            name="difficulty" 
            id="difficulty" 
            className='text-[1.2rem] p-2 rounded-lg border-[2px] border-pr-purple'
            required
          >
            <option className='text-[1rem] p-2 border-[2px] bg-ac-light-purple'>Difficulty</option>
            <option value="easy" className='text-[1rem] p-2 border-[2px] bg-ac-light-purple'>Easy</option>
            <option value="medium" className='text-[1rem] p-2 border-[2px] bg-ac-light-purple'>Medium</option>
            <option value="hard" className='text-[1rem] p-2 border-[2px] bg-ac-light-purple'>Hard</option>
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
                className='w-full h-2 bg-pr-purple rounded-lg appearance-none cursor-pointer'
                required
              />
              <span id="amount-value">{amountValue}</span>
            </div>
          </div>
          <button 
            type="submit"
            className='bg-pr-purple text-secondary text-[1.2rem] p-2 rounded-lg text-center'
          >
            Start Quiz
          </button>
        </form>
        </>
    );
}

export default QuizSelector;