import React, {lazy, Suspense} from "react";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import {TestProvider} from "./contexts/TestContext";

import "react-toastify/dist/ReactToastify.css";

const Home = lazy(()=>import("./pages/Home/Home"));
const Quiz = lazy(()=>import("./pages/Quiz/Quiz"));
const Results = lazy(()=>import("./pages/Results/Results"));

function App():React.ReactElement {

    const stats = window.localStorage.getItem("stats");
    if (!stats) {
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
    }

    const wrong = window.localStorage.getItem("wrong");
    if (!wrong) {
        window.localStorage.setItem("wrong", `{
            "N1":{
                "kanji":[],
                "contexto":[],
                "parafrases":[],
                "uso":[],
                "gramaticafrases":[],
                "ordenar":[]
            },
            "N2":{
                "kanji":[],
                "contexto":[],
                "parafrases":[],
                "uso":[],
                "gramaticafrases":[],
                "ordenar":[]
            },
            "N3":{
                "kanji":[],
                "contexto":[],
                "parafrases":[],
                "uso":[],
                "gramaticafrases":[],
                "ordenar":[]
            },
            "N4":{
                "kanji":[],
                "contexto":[],
                "parafrases":[],
                "uso":[],
                "gramaticafrases":[],
                "ordenar":[]
            },
            "N5":{
                "kanji":[],
                "contexto":[],
                "parafrases":[],
                "uso":[],
                "gramaticafrases":[],
                "ordenar":[]
            }
        }`);
    }

    return (
        <div className="App bg-gray-300">
            <BrowserRouter>
                <ToastContainer/>
                <Suspense>
                    <TestProvider>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/quiz" element={<Quiz/>}/>
                            <Route path="/results" element={<Results/>}/>
                        </Routes>
                    </TestProvider>
                </Suspense>
            </BrowserRouter>
        </div>
    );
}

export default App;
