import React from "react";

import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export function DefaultTests():React.ReactElement {
    return (
        <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center w-full gap-4">
                <h2 className="text-white font-bold text-2xl">Generar Test de Nivel</h2>
                <ul className="flex flex-col gap-4 p-4 bg-white mx-4 rounded-xl shadow-xl select-none w-5/6">
                    <li className="duration-500 cursor-pointer text-white py-4 px-8 bg-red-500 border-red-700 border-4 rounded-xl text-center hover:bg-white hover:border-red-600 hover:text-red-600 hover:animate-pulse">
                        <p className="text-xl font-bold">N5</p>
                    </li>
                    <li className="duration-500 cursor-pointer text-white py-4 px-8 bg-orange-500 border-orange-700 border-4 rounded-xl text-center hover:bg-white hover:border-orange-600 hover:text-orange-600 hover:animate-pulse">
                        <p className="text-xl font-bold">N4</p>
                    </li>
                    <li className="duration-500 cursor-pointer text-white py-4 px-8 bg-green-500 border-green-700 border-4 rounded-xl text-center hover:bg-white hover:border-green-600 hover:text-green-600 hover:animate-pulse">
                        <p className="text-xl font-bold">N3</p>
                    </li>
                    <li className="duration-500 cursor-pointer text-white py-4 px-8 bg-blue-500 border-blue-700 border-4 rounded-xl text-center hover:bg-white hover:border-blue-600 hover:text-blue-600 hover:animate-pulse">
                        <p className="text-xl font-bold">N2</p>
                    </li>
                    <li className="duration-500 cursor-pointer text-white py-4 px-8 bg-pink-500 border-pink-700 border-4 rounded-xl text-center hover:bg-white hover:border-pink-600 hover:text-pink-600 hover:animate-pulse">
                        <p className="text-xl font-bold">N1</p>
                    </li>
                </ul>
            </div>
            <div className="bg-white p-4 rounded-xl w-5/6 flex flex-col gap-4">
                <h3 className="text-black font-bold text-2xl text-center">Exámenes Oficiales JLPT</h3>
                <hr />
                <div className="flex justify-center">
                    <FormControl className="w-1/2 text-center" variant="standard">
                        <InputLabel>Nivel JLPT</InputLabel>
                        <Select value="N1">
                            <MenuItem value="N1">N1</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="flex justify-evenly">
                    <FormControl className="w-1/4 text-center" variant="standard">
                        <InputLabel>AÑO</InputLabel>
                        <Select value="N1">
                            <MenuItem value="N1">2022</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className="w-1/4 text-center" variant="standard">
                        <InputLabel>PERIODO</InputLabel>
                        <Select value="N1">
                            <MenuItem value="N1">JULIO</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <button className="w-full bg-blue-500 py-2 px-4 rounded-lg text-white font-semibold">Hacer Test</button>
            </div>
        </div>
    );
}