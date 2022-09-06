import React, {useState} from "react";

import {DefaultTests} from "./components/DefaultTests";

function Home():React.ReactElement {
    const [mode, setMode] = useState("default");

    return (
        <div className="w-full h-full bg-gradient-to-t from-blue-900 to-blue-400 max-w-lg m-auto lg:border-x-4 lg:border-black pb-8">
            <div className="w-full flex font-semibold p-4 shadow-xl bg-white">
                <button className={`w-1/2 border-r p-3 rounded-full ${mode === "default" ? "bg-blue-600 text-white" : "text-black bg-white"}`} onClick={()=>setMode("default")}>Predeterminados</button>
                <button className={`w-1/2 border-r p-3 rounded-full ${mode === "custom" ? "bg-blue-600 text-white" : "text-black bg-white"}`}  onClick={()=>setMode("custom")}>Personalizados</button>
            </div>
            <hr className="border-2 mb-6"/>
            {mode === "default" ? <DefaultTests/> : <></>}
        </div>
    );
}

export default Home;