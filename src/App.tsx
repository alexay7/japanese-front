import React, {lazy, Suspense} from "react";

import {BrowserRouter, Route, Routes} from "react-router-dom";

const Home = lazy(()=>import("./pages/Home/Home"));

function App():React.ReactElement {
    return (
        <div className="App bg-gray-300">
            <BrowserRouter>
                <Suspense>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </div>
    );
}

export default App;
