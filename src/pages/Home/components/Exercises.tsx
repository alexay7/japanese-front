/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from "react";

import {FormControl, MenuItem, Select} from "@mui/material";
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
            <div className="flex justify-end">
                {/* <FormControl className="flex justify-center w-1/2 text-center bg-white rounded-lg" variant="outlined">
                    <Select onChange={(e)=>setSelectedLevel(e.target.value)} value={selectedLevel}>
                        <MenuItem value="N1">N1</MenuItem>
                        <MenuItem value="N2">N2</MenuItem>
                        <MenuItem value="N3">N3</MenuItem>
                        <MenuItem value="N4">N4</MenuItem>
                        <MenuItem value="N5">N5</MenuItem>
                    </Select>
                </FormControl> */}
                <button>Cambiar</button>
            </div>
            <ul className="flex flex-col items-center w-full gap-4 mt-4">
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
                        className="w-4/5 flex flex-col items-center bg-white rounded-lg p-2 cursor-pointer border-2 hover:border-gray-600 duration-100"
                        >
                            <p>{levelData[exerciseType as keyof typeof levelData].name} {" "}
                                ({levelData[exerciseType as keyof typeof levelData].spanish_name})
                            </p>
                            <p>{(parsedStats[selectedLevel as keyof Stats][exerciseType as keyof typeof exerciseTypes] as SectionStats).total}/
                                {(parsedStats[selectedLevel as keyof Stats][exerciseType as keyof typeof exerciseTypes] as SectionStats).quantity}
                            </p>
                            <div className="w-3/4 bg-white rounded-full h-4 flex overflow-hidden m-auto border-gray-200 border-2 mt-2">
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