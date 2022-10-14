import React, {useState} from "react";

import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {useTest} from "../../../contexts/TestContext";

export function RealTest():React.ReactElement {
    const {handleParams} = useTest();
    const [level, setLevel] = useState("N1");
    const [year, setYear] = useState(2018);
    const [period, setPeriod] = useState("Julio");

    const navigate = useNavigate();

    function handleSubmit(e:React.FormEvent<HTMLFormElement>):void {
        e.preventDefault();
        handleParams({type:"real", level:level, year:year, period:period});
        navigate("/quiz");
    }

    return (
        <form className="bg-white p-4 rounded-xl w-5/6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <h3 className="text-black font-bold text-2xl text-center">JLPT模擬試験</h3>
            <hr />
            <div className="flex justify-center">
                <FormControl className="w-1/2 text-center" variant="standard">
                    <InputLabel>JLPTのレベル</InputLabel>
                    <Select value={level} onChange={(e)=>setLevel(e.target.value)}>
                        <MenuItem value="N1">N1</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="flex justify-evenly">
                <FormControl className="w-1/4 text-center" variant="standard">
                    <InputLabel>年</InputLabel>
                    <Select value={`${year}`} onChange={(e)=>setYear(parseInt(e.target.value))}>
                        <MenuItem value="2018">2018</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className="w-1/4 text-center" variant="standard">
                    <InputLabel>月</InputLabel>
                    <Select value={period} onChange={(e)=>setPeriod(e.target.value)}>
                        <MenuItem value="Julio">７月</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <button type="submit" className="duration-500 w-full bg-blue-500 border-2 border-blue-700 py-2 px-4 rounded-lg text-white font-semibold hover:bg-white hover:text-blue-500 hover:border-blue-500">はじめる</button>
        </form>
    );
}