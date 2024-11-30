import type {baseResponse, paramsType} from "@/api/index";
import {useAxios} from "@/api/index";

export interface LoginDataType {
    date_list: string[]
    login_data: number[]
    sign_data: number[]
}

export interface loginDataRequest {
    date: number
}


export function dataLoginApi(params: loginDataRequest): Promise<baseResponse<LoginDataType>> {
    return useAxios.get("/api/data_login", {params})
}


export interface statisticsType {
    article_count: number
    chat_group_count: number
    // fLow_count:number
    message_count: number
    now_login_count: number
    now_sign_count: number
    user_count: number
}

export function statisticsApi():Promise<baseResponse<statisticsType>>{
    return useAxios.get("/api/data_sum")
}