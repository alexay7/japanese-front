import React, {useEffect, useState} from "react";

import {Link, useNavigate} from "react-router-dom";

import {ReactComponent as BatsuIcon} from "../../assets/icons/batsu.svg";
import {ReactComponent as HomeIcon} from "../../assets/icons/home.svg";
import {ReactComponent as MaruIcon} from "../../assets/icons/maru.svg";
import {ReactComponent as NextIcon} from "../../assets/icons/next.svg";
import {ReactComponent as QuestionIcon} from "../../assets/icons/question.svg";
import PageContainer from "../../components/PageContainer/PageContainer";
import {useTest} from "../../contexts/TestContext";
import {levelData} from "../../types/data";
import {Question} from "../../types/question";
import {SectionStats, Stats} from "../../types/stats";
import {Wrong} from "../../types/wrong";
import AnswerButton from "./components/AnswerButton";

function Quiz():React.ReactElement {
    const [questions, setQuestions] = useState<Question[]>([]);
    const {params, answered, setAnswered} = useTest();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showAnswer, setShowAnswer] = useState(false);
    const [clicked, setClicked] = useState(0);
    const [exerciseType, setExerciseType] = useState<{name:string, spanish_name:string, description:string}>();

    const navigate = useNavigate();

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
            setAnswered(new Array(data?.length).fill(0));
            setQuestions(data);
            setLoading(false);
        }
        void getQuestions();
        return ()=>{
            setQuestions([]);
            setShowAnswer(false);
            setClicked(0);
            setCurrentQuestion(0);
        };
    }, [params, setAnswered]);

    useEffect(()=>{
        if (questions.length > 0) {
            setExerciseType(levelData[questions[currentQuestion].type as keyof typeof levelData]);
        }
    }, [currentQuestion, questions]);

    function handleAnswer(answerIndex:number):void {
        if (showAnswer) return;
        setClicked(answerIndex);
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
            window.localStorage.setItem("stats", JSON.stringify(parsedStats));
        }
        answered[currentQuestion] = answerIndex + 1 === questions[currentQuestion].correct ? 1 : 2;
        if (answered[currentQuestion] === 2) {
            const wrong = window.localStorage.getItem("wrong");
            if (!wrong || !params?.level) return;

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const parsedWrong:Wrong = JSON.parse(wrong);
            parsedWrong[params.level as "N1" | "N2" | "N3" | "N4" | "N5"].push(questions[currentQuestion]._id);
            window.localStorage.setItem("wrong", JSON.stringify(parsedWrong));
        }
        setAnswered(answered);
        setShowAnswer(true);
    }

    function handleKeyPress(e:React.KeyboardEvent<HTMLDivElement>):void {
        switch (e.key) {
            case "1":{
                if (!showAnswer) {
                    handleAnswer(0);
                }
                break;
            }
            case "2":{
                if (!showAnswer) {
                    handleAnswer(1);
                }
                break;
            }
            case "3":{
                if (!showAnswer) {
                    handleAnswer(2);
                }
                break;
            }
            case "4":{
                if (!showAnswer) {
                    handleAnswer(3);
                }
                break;
            }
            case "Enter":
            case " ":{
                if (showAnswer) {
                    if (currentQuestion + 1 !== params?.questionNum) {
                        setClicked(0);
                        setShowAnswer(false);
                        setCurrentQuestion(currentQuestion + 1);
                    } else {
                        navigate("/results");
                    }
                }
                break;
            }
            default:return;

        }
    }

    return (
        <PageContainer onKeyDown={handleKeyPress} tabIndex={0}>
            <div className="bg-white rounded-b-lg p-4 flex items-center gap-2 flex-wrap justify-around">
                {answered.map((q, i)=>{
                    switch (q) {
                        case 1:
                            return (<MaruIcon className="text-green-500 w-1/12" key={i}/>);
                        case 2:
                            return (<BatsuIcon className="text-red-500 w-1/12" key={i}/>);
                        default:
                            return (<QuestionIcon className="text-gray-500 w-1/12" key={i}/>);
                    }
                })}
            </div>
            <div className="w-full py-3 flex justify-center">
                <Link to="/">
                    <HomeIcon className="text-blue-500 w-12 bg-white border-blue-600 border-2 rounded-full p-2"/>
                </Link>
            </div>
            {!loading && (
                <div className="bg-white p-4 rounded-lg shadow-lg w-5/6 m-auto my-4 flex flex-col gap-4">
                    <h3 className="text-3xl font-semibold">問題 {currentQuestion + 1}: <span className="text-xl">{exerciseType?.name}</span></h3>
                    <hr />
                    <p className="text-center text-sm">{exerciseType?.description}</p>
                    <hr />
                    <p className="text-xl text-blue-500 font-semibold text-center">{questions[currentQuestion].question}</p>
                    <ul className="flex flex-col items-center gap-2">
                        {questions[currentQuestion].answers.map((answer, index)=>(
                            <AnswerButton key={answer} text={answer} onClick={()=>handleAnswer(index)}
                                correct={showAnswer && index + 1 === questions[currentQuestion].correct}
                                incorrect={showAnswer && index + 1 !== questions[currentQuestion].correct && index === clicked}
                                disabled={showAnswer && index !== clicked}
                            />
                        ))}
                    </ul>
                    {showAnswer && currentQuestion + 1 !== params?.questionNum && (
                        <button className="flex items-center hover:bg-blue-500 hover:text-white text-xl font-semibold text-blue-500 justify-center gap-2 bg-white border-2 border-blue-500 rounded-lg w-1/2 m-auto py-1"  onClick={()=>{
                            setClicked(0);
                            setShowAnswer(false);
                            setCurrentQuestion(currentQuestion + 1);
                        }}
                        >
                            <p>次の問題へ</p>
                            <NextIcon className="w-7"/>
                        </button>
                    )}
                    {showAnswer && currentQuestion + 1 === params?.questionNum && (
                        <Link className="flex items-center hover:bg-blue-500 hover:text-white text-xl font-semibold text-blue-500 justify-center gap-2 bg-white border-2 border-blue-500 rounded-lg w-1/2 m-auto py-1" to="/results">
                            <p>結果発表</p>
                            <NextIcon className="w-7"/>
                        </Link>
                    )}
                    {showAnswer && questions[currentQuestion].explanation && (
                        <>
                            <hr />
                            <div className="border border-dotted border-gray-400 w-5/6 rounded-lg m-auto p-2 text-sm flex flex-col gap-2 bg-blue-500 text-white">
                                <h4 className="font-semibold text-xl text-center">説明</h4>
                                <hr />
                                <p >{questions[currentQuestion].explanation}</p>
                            </div>
                        </>
                    )}
                </div>
            )}
        </PageContainer>
    );
}

export default Quiz;