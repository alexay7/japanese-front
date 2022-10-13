export interface QuestionParams {
    year?:number,
    period?:string,
    timer?:boolean,
    category?:string,
    sections?:string[],
    questionNum?:number,
    level?:string,
    type?:testTypes
}

export enum testTypes {
    normal = "normal",
    retry = "retry",
    real = "real"
}