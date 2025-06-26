'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import Link from "next/link";
import he from "he";

function QuizAnswers({ currentQuestion, activeIndex, quizLength, allAnswers }) {
    const [quizFinished, setQuizFinished] = useState(false);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (!allAnswers) return;
        // Shuffle only on the client, when question changes
        setShuffledAnswers([...allAnswers].sort(() => 0.5 - Math.random()));
    }, [allAnswers, currentQuestion]);

    function nextQuestion(newIndex) {
        const searchParams = new URLSearchParams(window.location.search);
        // Update the index param
        searchParams.set('index', String(newIndex === 0 ? newIndex : Number(searchParams.get('index')) + 1));
        // Push the new URL with updated params
        router.push(`/quiz?${searchParams.toString()}`);
        setQuizFinished(false);
    }

    function validateAnswer(e) {
        e.preventDefault();
        const chosenAnswer = e.nativeEvent.submitter;
        const correctAnswer = Array.from(e.target.children).find(element => element.value === currentQuestion.correct_answer);

        chosenAnswer.classList.add('border-ac-red');
        chosenAnswer.classList.remove('border-pr-purple');
        correctAnswer.classList.remove('border-pr-purple');
        correctAnswer.classList.remove('border-ac-red');
        correctAnswer.classList.add('border-ac-green');

        setTimeout(() => {
            if (Number(activeIndex) + 1 === quizLength) {
                setQuizFinished(true);
                return;
            };

            nextQuestion();

            chosenAnswer.classList.remove('border-ac-red');
            correctAnswer.classList.remove('border-ac-green');
            correctAnswer.classList.add('border-pr-purple');
            chosenAnswer.classList.add('border-pr-purple');
        }, 3000);
    }

    return (
        <>
            {!quizFinished && (
                <form onSubmit={validateAnswer} className="flex flex-col gap-6 items-center mt-10">
                    {shuffledAnswers?.map((answer, index) => (
                        <button key={index} type="submit" className="border-2 border-pr-purple rounded-2xl px-4 py-3 w-3/4" name="answer" id={`answer-${index + 1}`} value={answer}>{he.decode(answer || '')}</button>
                    ))}
                </form>
            )}
            {quizFinished && (
                <div className="flex flex-col items-center gap-2 mt-10">
                    <p className="capitalize font-medium">quiz over!</p>
                    <Link href='/' className="capitalize flex justify-between items-center bg-ac-blue text-secondary text-sm p-2 w-45 rounded-lg">return to home <FaHome size={16} /></Link>
                    <button onClick={() => nextQuestion(0)} className="capitalize flex justify-between items-center bg-ac-light-purple text-secondary text-sm p-2 w-45 rounded-lg">try again <FaArrowRotateLeft size={16} /></button>
                </div>
            )}
        </>
    );
}

export default QuizAnswers;