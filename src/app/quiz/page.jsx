import { IoClose } from "react-icons/io5";
import QuizAnswers from "../components/quiz-answers";
import he from "he";

async function QuizPage({ searchParams }) {
    const category = (await searchParams).category;
    const difficulty = (await searchParams).difficulty;
    const amount = (await searchParams).amount;
    const activeIndex = (await searchParams).index;

    const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`);
    const quiz = await response.json();

    console.log(quiz.results);

    let activeQuestionIndex = activeIndex;

    const currentQuestion = quiz?.results[activeIndex];

    return (
        <>
            <main className="p-6">
                {currentQuestion && (
                    <>
                        <IoClose size={28} className="fill-pr-white" />
                        <h1 className="text-2xl font-medium text-center text-secondary my-6">{currentQuestion?.category}</h1>
                        <section className="flex flex-col items-center gap-3 py-3 px-6 bg-pr-whiterounded-2xl shadow-[0px_4px_4px_#FBECFF]">
                            <div className="flex justify-between w-full">
                                <p className="text-green text-sm font-bold flex gap-1 items-center after:h-1 after:w-8 after:bg-ac-green after:rounded-full after:block">5</p>
                                <p className="text-3xl text-purple font-bold bg-pr-white py-3 px-4 border-4 border-ac-purple border-l-transparent rounded-full -mt-12">18</p>
                                <p className="text-red text-sm font-bold flex gap-1 items-center before:h-1 before:w-8 before:bg-ac-red before:rounded-full before:block">7</p>
                            </div>
                            <p className="flex capitalize text-purple font-bold">question {Number(activeQuestionIndex) + 1}/{amount}</p>
                            <h2 className="text-center font-medium">{he.decode(currentQuestion?.question || "")}</h2>
                        </section>
                        <QuizAnswers currentQuestion={currentQuestion} activeQuestionIndex={activeQuestionIndex} quizLength={quiz?.length} />
                    </>
                )}
            </main>
        </>
    );
}

export default QuizPage;