import React, {useState} from "react";

import {FormControl, MenuItem, Select} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {useTest} from "../../../contexts/TestContext";
import {levelData} from "../../../types/data";
import {SectionStats, Stats} from "../../../types/stats";

export function Exercises():React.ReactElement {
    const {handleParams} = useTest();
    const stats = window.localStorage.getItem("stats");
    const [selectedLevel, setSelectedLevel] = useState(window.localStorage.getItem("lastlevel") || "N5");

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parsedStats:Stats = JSON.parse(stats || "");

    const navigate = useNavigate();

    return (
        <div>
            <div className="flex justify-center bg-white rounded-lg w-2/3 m-auto">
                <FormControl className="flex justify-center text-center rounded-lg w-full" variant="outlined" >
                    <Select onChange={(e)=>{
                        window.localStorage.setItem("lastlevel", e.target.value);
                        setSelectedLevel(e.target.value);
                    }} value={selectedLevel}
                    >
                        <MenuItem value="N1">N1</MenuItem>
                        <MenuItem value="N2">N2</MenuItem>
                        <MenuItem value="N3">N3</MenuItem>
                        <MenuItem value="N4">N4</MenuItem>
                        <MenuItem value="N5">N5</MenuItem>
                    </Select>
                </FormControl>
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
                        <li key={exerciseType}
                            className={`w-4/5 flex flex-col border-${selectedLevel} items-center bg-white rounded-xl p-2 border-4 hover:border-${selectedLevel} duration-100`}
                        >
                            <div className="w-full flex justify-center flex-col items-center cursor-pointer" onClick={()=>{
                                handleParams({level:selectedLevel, type:"exercises", skip:0, sections:[exerciseType]});
                                navigate("/quiz");
                            }}
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
                                <div className="flex gap-2 py-2">
                                    <p className="text-green-500 font-semibold">正解: {(parsedStats[selectedLevel as keyof Stats][exerciseType as keyof typeof exerciseTypes] as SectionStats)
                                        .correct}
                                    </p>
                                    <p className="text-red-500 font-semibold">不正解: {(parsedStats[selectedLevel as keyof Stats][exerciseType as keyof typeof exerciseTypes] as SectionStats)
                                        .wrong}
                                    </p>
                                </div>
                            </div>
                            <hr  className="w-full my-2"/>
                            <button className="m-auto text-sm bg-red-500 border-red-800 border-2 px-4 z-10 py-1 rounded-xl text-white font-semibold mt-2" onClick={()=>{
                                handleParams({level:selectedLevel, type:"retry", sections:[exerciseType]});
                                navigate("/quiz");
                            }}
                            >弱点克服
                            </button>
                        </li>
                    );
                }
                )}
            </ul>
            <div className="w-full flex justify-center">
                <button className="border-2 border-red-500 bg-white text-red-500 px-4 py-2 rounded-lg my-4 hover:bg-red-500 hover:text-white" onClick={()=>{
                    if (confirm("Are you sure?")) {
                        window.localStorage.setItem("stats", `{
                            "N1":{
                                "kanji":{"correct":0, "wrong":0,"total":0,"quantity":596},
                                "contexto":{"correct":0, "wrong":0,"total":0,"quantity":203},
                                "parafrases":{"correct":0, "wrong":0,"total":0,"quantity":176},
                                "uso":{"correct":0, "wrong":0,"total":0,"quantity":171},
                                "gramaticafrases":{"correct":0, "wrong":0,"total":0,"quantity":597},
                                "ordenar":{"correct":0, "wrong":0,"total":0,"quantity":173},
                                "passedTimes":0
                            },
                            "N2":{
                                "kanji":{"correct":0, "wrong":0,"total":0,"quantity":233},
                                "ortografia":{"correct":0, "wrong":0,"total":0,"quantity":238},
                                "formacion":{"correct":0, "wrong":0,"total":0,"quantity":120},
                                "contexto":{"correct":0, "wrong":0,"total":0,"quantity":304},
                                "parafrases":{"correct":0, "wrong":0,"total":0,"quantity":198},
                                "uso":{"correct":0, "wrong":0,"total":0,"quantity":108},
                                "gramaticafrases":{"correct":0, "wrong":0,"total":0,"quantity":451},
                                "ordenar":{"correct":0, "wrong":0,"total":0,"quantity":115},
                                "passedTimes":0
                            },
                            "N3":{
                                "kanji":{"correct":0, "wrong":0,"total":0,"quantity":338},
                                "ortografia":{"correct":0, "wrong":0,"total":0,"quantity":317},
                                "contexto":{"correct":0, "wrong":0,"total":0,"quantity":238},
                                "parafrases":{"correct":0, "wrong":0,"total":0,"quantity":199},
                                "uso":{"correct":0, "wrong":0,"total":0,"quantity":79},
                                "gramaticafrases":{"correct":0, "wrong":0,"total":0,"quantity":541},
                                "ordenar":{"correct":0, "wrong":0,"total":0,"quantity":204},
                                "passedTimes":0
                            },
                            "N4":{
                                "kanji":{"correct":0, "wrong":0,"total":0,"quantity":333},
                                "ortografia":{"correct":0, "wrong":0,"total":0,"quantity":237},
                                "contexto":{"correct":0, "wrong":0,"total":0,"quantity":177},
                                "parafrases":{"correct":0, "wrong":0,"total":0,"quantity":203},
                                "uso":{"correct":0, "wrong":0,"total":0,"quantity":44},
                                "gramaticafrases":{"correct":0, "wrong":0,"total":0,"quantity":520},
                                "ordenar":{"correct":0, "wrong":0,"total":0,"quantity":207},
                                "passedTimes":0
                            },
                            "N5":{
                                "kanji":{"correct":0, "wrong":0,"total":0,"quantity":333},
                                "ortografia":{"correct":0, "wrong":0,"total":0,"quantity":237},
                                "contexto":{"correct":0, "wrong":0,"total":0,"quantity":177},
                                "parafrases":{"correct":0, "wrong":0,"total":0,"quantity":203},
                                "gramaticafrases":{"correct":0, "wrong":0,"total":0,"quantity":520},
                                "ordenar":{"correct":0, "wrong":0,"total":0,"quantity":207},
                                "passedTimes":0
                            }
                        }`);
                        window.location.reload();
                    }
                }}
                >Reset Stats
                </button>
            </div>
        </div>
    );
}