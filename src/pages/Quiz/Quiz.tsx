import React, {useEffect, useState} from "react";

import PageContainer from "../../components/PageContainer/PageContainer";
import {useTest} from "../../contexts/TestContext";
import {Question} from "../../types/question";

function Quiz():React.ReactElement {
    const [questions, setQuestions] = useState<Question[]>([]);
    const {params} = useTest();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function getQuestions():Promise<void> {
            setLoading(true);
            const body = JSON.stringify(params);
            console.log(params);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/exercises`, {method:"POST", body:body, headers:{"Content-Type":"application/json"}});
            const data = await response.json() as Question[];
            setQuestions(data);
            setLoading(false);
        }
        void getQuestions();
    }, [params]);

    return (
        <PageContainer>
            <p>Pregunta {currentQuestion + 1} de {questions.length}</p>
            {!loading && (
                <>
                    {questions[currentQuestion].question}
                    <ul>
                        {questions[currentQuestion].answers.map((answer)=>(
                            <li key={answer}>
                                {answer}
                            </li>
                        ))}
                    </ul>
                    <button onClick={()=>setCurrentQuestion(currentQuestion + 1)}>Siguiente pregunta</button>
                </>
            )}
        </PageContainer>
    );
}

export default Quiz;