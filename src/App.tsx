import React, {lazy, Suspense} from "react";

import {BrowserRouter, Route, Routes} from "react-router-dom";

import {TestProvider} from "./contexts/TestContext";

const Home = lazy(()=>import("./pages/Home/Home"));

function App():React.ReactElement {
    return (
        <div className="App bg-gray-300">
            <BrowserRouter>
                <Suspense>
                    <TestProvider>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                        </Routes>
                    </TestProvider>
                </Suspense>
            </BrowserRouter>
        </div>
    );
}

export default App;
