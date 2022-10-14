import React, {createContext, useContext, useState} from "react";

import {QuestionParams} from "../types/params";

interface TestContextProps {
    children:React.ReactNode
}

export type TestContextType = {
    params:QuestionParams | undefined,
    handleParams:(value:QuestionParams)=>void,
};

export const TestContext = createContext<TestContextType>({} as TestContextType);

export function useTest():TestContextType {
    return useContext(TestContext);
}

export function TestProvider(props:TestContextProps):React.ReactElement {
    const {children} = props;
    const [params, setParams] = useState<QuestionParams>({
        questionNum:10,
        timer:false,
        type:"normal",
        level:"N5"
    });

    function handleParams(newparams:QuestionParams):void {
        setParams({...params, ...newparams});
    }

    return (
        <TestContext.Provider value={{params:params, handleParams:handleParams}}>
            {children}
        </TestContext.Provider>
    );
}