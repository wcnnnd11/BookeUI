import {type baseResponse, type listDataType, type paramsType, useAxios} from "@/api/index";

export interface logRequest extends paramsType {
    level?: number  // 1 2 3 info warn error
    type?: number // 1 2 3 登录 操作 运行
    ip?: string
    userID?: number
    addr?: string
    date?: string
    status?: boolean | ""  // 1 2 成功 失败
    userName?: string
}

export type logLevel= "info"| "warning" | "error"

export interface logType {
    readonly id: number
    created_at: string
    updated_at: string
    ip: string
    addr: string
    level: logLevel  // 日志等级
    title: string
    content: string
    userID: number
    userName: string
    serviceName: string
    status: boolean
    type: string // 日志类型
    readStatus: boolean
}


export function logListApi(params: logRequest): Promise<baseResponse<listDataType<logType>>> {
    return useAxios.get("/api/logs/v2", {params:params})
}

export function logReadApi(id:number): Promise<baseResponse<string>> {
    return useAxios.get("/api/logs/v2/read", {params:{id:id}})
}
