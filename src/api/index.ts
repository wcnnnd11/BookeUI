import axios from "axios";
import {useStore} from "@/stores";
import {Message} from "@arco-design/web-vue";
import type {optionType} from "@/types";

export const useAxios = axios.create({
    baseURL: ""
})

export interface baseResponse<T> {
    code: number
    data: T
    msg: string
}


export interface listDataType<T> {
    count: number
    list: T[]
}


export interface paramsType {
    page?: number
    limit?: number
    key?: string
    sort?: string
}

useAxios.interceptors.request.use((config) => {
    const store = useStore()
    config.headers["token"] = store.userInfo.token
    return config
})

useAxios.interceptors.response.use((response) => {
    if (response.status !== 200) {
        // 失败的
        console.log("服务失败", response.status)
        Message.error(response.statusText)
        return Promise.reject(response.statusText)
    }
    return response.data
}, (err) => {
    console.log("服务错误", err)
    Message.error(err.message)
    return Promise.reject(err.message)
})


export function defaultDeleteApi<T extends number | string>(url: string, idList: T[]): Promise<baseResponse<string>> {
    return useAxios.delete(url, {
        data: {
            id_list: idList,
        }
    })
}

export function defaultOptionApi(url: string, params?: paramsType): Promise<baseResponse<optionType>> {
    return useAxios.get(url, {params})
}

export interface userCreateRequest {
    nick_name: string
    password: string
    role: number
    user_name: string
}

export function userCreateApi(data: userCreateRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/users", data)
}

export interface userUpdateRequest {
    role: number,
    nick_name: string,
    user_id: number,
}

export function userUpdateApi(data:userUpdateRequest):Promise<baseResponse<string>>{
    return useAxios.put("/api/user_role", data)

}
