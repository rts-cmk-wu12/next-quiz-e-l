'use client';
import { useRouter } from "next/navigation";
import he from "he";

function QuizAnswers({ currentQuestion, activeQuestionIndex, quizLength }) {
    const allAnswers = [...currentQuestion?.incorrect_answers, currentQuestion?.correct_answer];
    const shuffledAnswers = [...allAnswers].sort(() => 0.5 - Math.random());

    const router = useRouter();

    function nextQuestion() {
        if (Number(activeQuestionIndex) === quizLength) return;

        // Get current search params
        const searchParams = new URLSearchParams(window.location.search);
        // Update the index param
        searchParams.set('index', String(Number(searchParams.get('index')) + 1));
        // Push the new URL with updated params
        router.push(`/quiz?${searchParams.toString()}`)
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
            nextQuestion();

            chosenAnswer.classList.remove('border-ac-red');
            chosenAnswer.classList.remove('border-ac-green');
            correctAnswer.classList.remove('border-ac-green');
            correctAnswer.classList.add('border-pr-purple');
            chosenAnswer.classList.add('border-pr-purple');
        }, 3000);
    }

    return (
        <form onSubmit={validateAnswer} className="flex flex-col gap-6 items-center mt-10">
            {shuffledAnswers?.map((answer, index) => (
                <button key={index} type="submit" className="border-2 border-pr-purple rounded-2xl px-4 py-3 w-3/4" name="answer" id={`answer-${index + 1}`} value={answer}>{he.decode(answer || '')}</button>
            ))}
        </form>
    );
}

export default QuizAnswers;