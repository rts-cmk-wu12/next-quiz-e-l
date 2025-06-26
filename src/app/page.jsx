import { GrHistory } from "react-icons/gr";
import { FiMoon } from "react-icons/fi";
import BackgroundImage from './components/background-image';
import QuizSelector from './components/quiz-selector';
import Link from 'next/link';

export default async function HomePage() {
  const response = await fetch('https://opentdb.com/api_category.php');
  const categories = await response.json();

  return (
    <>
      <BackgroundImage />
      <h1 className='text-center text-[3rem] font-bold text-secondary my-[4rem]'>TriviaTap</h1>
      <div className='bg-pr-white mx-[4rem] rounded-3xl p-4 mt text-[1.2rem] shadow-xl'>
        <p className="text-center text-base">Welcome!<br />Choose a category, difficulty, and number of questions to start your quiz.</p>
      </div>
      <main className='mx-[2rem]'>
        <QuizSelector categories={categories.trivia_categories} />
        <Link href='#' className='flex justify-between px-[2rem] items-center my-[1rem] bg-ac-blue text-secondary text-[1.2rem] p-2 rounded-lg'>
          <p>View History</p><GrHistory />
        </Link>
        <button className='flex justify-between px-[2rem] items-center my-[1rem] w-full bg-ac-light-purple text-secondary text-[1.2rem] p-2 rounded-lg'>
          Darkmode <FiMoon />
        </button>
      </main>
    </>
  );
}