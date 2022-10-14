import React, {useEffect, useState} from "react";

import PageContainer from "../../components/PageContainer/PageContainer";
import {useTest} from "../../contexts/TestContext";
import {Question} from "../../types/question";
import {SectionStats, Stats} from "../../types/stats";

function Quiz():React.ReactElement {
    const [questions, setQuestions] = useState<Question[]>([]);
    const {params} = useTest();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(()=>{
        async function getQuestions():Promise<void> {
            setLoading(true);
            const stats = window.localStorage.getItem("stats");
            if (!stats) return;

            if (params?.type === "exercises") {
                if (!params.level || !params.sections || !params.sections[0]) return;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const parsedStats:Stats = JSON.parse(stats);
                const level = params.level as keyof Stats;
                const levelStats = parsedStats[level];
                const section = params.sections[0] as keyof typeof levelStats;
                params.skip = (levelStats[section] as SectionStats).total;
            }
            const body = JSON.stringify(params);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/exercises`, {method:"POST", body:body, headers:{"Content-Type":"application/json"}});
            const data = await response.json() as Question[];
            setQuestions(data);
            setLoading(false);
        }
        void getQuestions();
        return ()=>{
            setQuestions([]);
        };
    }, [params]);

    function handleAnswer(answerIndex:number):void {
        if (showAnswer) return;
        if (params?.type === "exercises") {
            if (!params.level || !params.sections || !params.sections[0]) return;
            const stats = window.localStorage.getItem("stats");
            if (!stats) return;

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const parsedStats:Stats = JSON.parse(stats);
            const level = params.level as keyof Stats;
            const levelStats = parsedStats[level];
            const section = params.sections[0] as keyof typeof levelStats;

            (levelStats[section] as SectionStats).total += 1;
            if (answerIndex + 1 === questions[currentQuestion].correct) {
                (levelStats[section] as SectionStats).correct += 1;
            } else {
                (levelStats[section] as SectionStats).wrong += 1;
            }
            setShowAnswer(true);
            window.localStorage.setItem("stats", JSON.stringify(parsedStats));
        }
    }

    return (
        <PageContainer>
            <p>Pregunta {currentQuestion + 1} de {questions.length}</p>
            {!loading && (
                <>
                    {questions[currentQuestion].question}
                    <ul>
                        {questions[currentQuestion].answers.map((answer, index)=>(
                            <li key={answer} onClick={()=>handleAnswer(index)}>
                                {answer}
                            </li>
                        ))}
                    </ul>
                    {showAnswer && (
                        <button onClick={()=>{
                            setShowAnswer(false);
                            setCurrentQuestion(currentQuestion + 1);
                        }}
                        >Pregunta siguiente
                        </button>
                    )}
                </>
            )}
        </PageContainer>
    );
}

export default Quiz;