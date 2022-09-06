import React from "react";

import {Checkbox} from "@mui/material";

export function Popup():React.ReactElement {
    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-gray-800 bg-opacity-70 flex justify-center items-center z-10">
            <div className="bg-white rounded-xl shadow-xl p-5 w-3/4 flex flex-col">
                <div className="flex justify-end">
                    <button className="text-red-800 font-semibold text-lg w-10 h-10 border-red-800 border-2 rounded-lg hover:bg-red-800 hover:text-white duration-300">X</button>
                </div>
                <hr className="my-4"/>
                <div className="flex flex-col gap-4 items-start">
                    <h3 className="text-xl font-semibold text-center w-full">Generar Test del N5</h3>
                    <div className="flex items-center justify-center select-none gap-2">
                        <Checkbox id="timer"/>
                        <label htmlFor="timer">Con Temporizador</label>
                    </div>
                    <button className="w-full text-lg bg-blue-500 border-blue-800 border-2 px-4 py-2 rounded-xl text-white font-semibold">¡Comenzar Test!</button>
                    <button className="w-3/4 m-auto text-base bg-orange-500 border-orange-800 border-2 px-4 py-2 rounded-xl text-white font-semibold">Preguntas Difíciles</button>
                </div>
            </div>
        </div>
    );
}