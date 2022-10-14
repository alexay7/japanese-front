import React, {useState} from "react";

import {useNavigate} from "react-router-dom";

import {useTest} from "../../../contexts/TestContext";
import {levelData} from "../../../types/data";
import {SectionStats, Stats} from "../../../types/stats";

export function Exercises():React.ReactElement {
    const {handleParams} = useTest();
    const stats = window.localStorage.getItem("stats");
    const [selectedLevel, setSelectedLevel] = useState("N5");

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parsedStats:Stats = JSON.parse(stats || "");

    const navigate = useNavigate();

    return (
        <div>
            <div className="">
                <select name="" id="" onChange={(e)=>setSelectedLevel(e.target.value)} value={selectedLevel}>
                    <option value="N1">N1</option>
                    <option value="N2">N2</option>
                    <option value="N3">N3</option>
                    <option value="N4">N4</option>
                    <option value="N5">N5</option>
                </select>
            </div>
            <ul>
                {Object.keys(parsedStats[selectedLevel as keyof Stats]).filter((x)=>x !== "passedTimes").map((exerciseType)=>{
                    const exerciseTypes = parsedStats[selectedLevel as keyof Stats];
                    const correctPercentage = ((parsedStats[selectedLevel as keyof Stats][exerciseType as keyof typeof exerciseTypes] as SectionStats)
                        .correct * 100 / (parsedStats[selectedLevel as keyof Stats][exerciseType as keyof typeof exerciseTypes] as SectionStats)
                        .quantity).toFixed(2);
                    const wrongPercentage = ((parsedStats[selectedLevel as keyof Stats][exerciseType as keyof typeof exerciseTypes] as SectionStats)
                        .wrong * 100 / (parsedStats[selectedLevel as keyof Stats][exerciseType as keyof typeof exerciseTypes] as SectionStats)
                        .quantity).toFixed(2);
                    return (
                        <li key={exerciseType} onClick={()=>{
                            handleParams({level:selectedLevel, type:"exercises", skip:0, sections:[exerciseType]});
                            navigate("/quiz");
                        }}
                        >
                            <p>{levelData[exerciseType as keyof typeof levelData].name}</p>
                            <p>{(parsedStats[selectedLevel as keyof Stats][exerciseType as keyof typeof exerciseTypes] as SectionStats).total} de
                                {(parsedStats[selectedLevel as keyof Stats][exerciseType as keyof typeof exerciseTypes] as SectionStats).quantity}
                            </p>
                            <div className="w-3/4 bg-white rounded-full h-4 flex overflow-hidden m-auto">
                                <div className={"h-full bg-green-500 rounded-l-full flex items-center justify-center"} style={{width:`${correctPercentage}%`}}>
                                    <p className="text-xs text-white font-semibold">{(parsedStats[selectedLevel as keyof Stats][exerciseType as keyof typeof exerciseTypes] as SectionStats)
                                        .correct}
                                    </p>
                                </div>
                                <div className={"h-full bg-red-500 rounded-r-full flex items-center justify-center"} style={{width:`${wrongPercentage}%`}}>
                                    <p className="text-xs text-white font-semibold">{(parsedStats[selectedLevel as keyof Stats][exerciseType as keyof typeof exerciseTypes] as SectionStats)
                                        .wrong}
                                    </p>
                                </div>
                                <div className="h-full flex items-center justify-center" style={{width:`${100 - parseInt(wrongPercentage) - parseInt(correctPercentage)}%`}}>
                                    <p className="text-xs text-black font-semibold">{(parsedStats[selectedLevel as keyof Stats][exerciseType as keyof typeof exerciseTypes] as SectionStats)
                                        .quantity -
                                        (parsedStats[selectedLevel as keyof Stats][exerciseType as keyof typeof exerciseTypes] as SectionStats).total}
                                    </p>
                                </div>
                            </div>
                        </li>
                    );
                }
                )}
            </ul>
        </div>
    );
}