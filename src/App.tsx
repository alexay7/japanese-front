import React, {lazy, Suspense} from "react";

import {BrowserRouter, Route, Routes} from "react-router-dom";

import {TestProvider} from "./contexts/TestContext";

const Home = lazy(()=>import("./pages/Home/Home"));
const Quiz = lazy(()=>import("./pages/Quiz/Quiz"));

function App():React.ReactElement {
    return (
        <div className="App bg-gray-300">
            <BrowserRouter>
                <Suspense>
                    <TestProvider>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                        </Routes>
                        <Routes>
                            <Route path="/quiz" element={<Quiz/>}/>
                        </Routes>
                    </TestProvider>
                </Suspense>
            </BrowserRouter>
        </div>
    );
}

export default App;
