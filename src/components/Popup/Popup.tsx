import React from "react";

// import {Checkbox} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {useTest} from "../../contexts/TestContext";

interface PopupProps {
    selected:string,
    closePopup:(status:string)=>void;
}

function Popup(props:PopupProps):React.ReactElement {
    const {selected, closePopup} = props;
    const {handleParams, params} = useTest();
    const navigate = useNavigate();

    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-gray-800 bg-opacity-70 flex justify-center items-center z-10">
            <div className="bg-white rounded-xl shadow-xl p-5 md:w-2/5 lg:w-2/5 2xl:w-1/4 flex flex-col w-5/6">
                <div className="flex justify-end" onClick={()=>closePopup("")}>
                    <button className="text-red-800 font-semibold text-lg w-10 h-10 border-red-800 border-2 rounded-lg hover:bg-red-800 hover:text-white duration-300">X</button>
                </div>
                <hr className="my-4"/>
                <div className="flex flex-col gap-4 items-start">
                    <h3 className="text-xl font-semibold text-center w-full">JLPT {selected} 全問</h3>
                    {/* <div className="flex items-center justify-center select-none gap-2 w-full">
                        <label htmlFor="timer">制限時間</label>
                        <Checkbox id="timer"  onChange={(e)=>{
                            handleParams({timer:e.target.checked});
                        }}
                        value={params?.timer}
                        />
                    </div> */}
                    <div className="flex flex-row justify-center w-full gap-2">
                        <label htmlFor="questionum">問題数</label>
                        <input id="questionum" type="number" className=" border-b border-gray-300 w-[4ch]" max={20} min={1} onChange={(e)=>{
                            handleParams({questionNum:parseInt(e.target.value)});
                        }}
                        value={params?.questionNum}
                        />
                    </div>
                    <button className="w-full text-lg bg-blue-500 border-blue-800 border-2 px-4 py-2 rounded-xl text-white font-semibold"
                        onClick={()=>{
                            handleParams({level:selected, type:"normal"});
                            navigate("/quiz");
                        }}
                    >はじめる
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Popup;