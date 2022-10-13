import React, {createContext, useContext, useState} from "react";

import {QuestionParams, testTypes} from "../types/params";

interface TestContextProps {
    children:React.ReactNode
}

export type TestContextType = {
    testType:string,
    setTestType:(value:testTypes)=>void,

    level:string,
    setLevel:(value:string)=>void,

    params:QuestionParams | undefined,
    handleParams:(value:QuestionParams)=>void,
};

export const TestContext = createContext<TestContextType>({} as TestContextType);

export function useTest():TestContextType {
    return useContext(TestContext);
}

export function TestProvider(props:TestContextProps):React.ReactElement {
    const {children} = props;
    const [testType, setTestType] = useState<testTypes>(testTypes.normal);
    const [level, setLevel] = useState("");
    const [params, setParams] = useState<QuestionParams>({
        questionNum:10,
        timer:false
    });

    function handleParams(newparams:QuestionParams):void {
        setParams({...params, ...newparams});
    }

    return (
        <TestContext.Provider value={{testType:testType, level:level,
            params:params, setTestType:setTestType, setLevel:setLevel, handleParams:handleParams}}
        >
            {children}
        </TestContext.Provider>
    );
}