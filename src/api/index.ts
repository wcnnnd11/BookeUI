import axios from "axios";
import {useStore} from "@/stores";
import {Message} from "@arco-design/web-vue";
import type {optionType} from "@/types";
import type {userUpdateRequest} from "@/api/user_api";

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



export function userUpdateApi(data:userUpdateRequest):Promise<baseResponse<string>>{
    return useAxios.put("/api/user_role", data)

}

export function cacheRequest<T>(func: () => Promise<T>): () => Promise<T> {
    let lastRequestTime: number = 0; // 存储上次请求的时间戳
    let cacheData: T | null = null; // 上次缓存的数据
    let currentRequest: Promise<T> | null = null;

    return function () {
        const currentTime = Date.now();
        const timeDiff = currentTime - lastRequestTime;

        if (timeDiff < 1000 && cacheData) {
            return Promise.resolve(cacheData); // 直接返回缓存数据
        }

        // 没有缓存数据或者时间超过1s,就发起新的请求
        if (!currentRequest) {
            currentRequest = func().then((res: T) => {
                // 更新之前的数据，时间
                lastRequestTime = currentTime;
                cacheData = res;
                currentRequest = null; // 重置当前请求
                return res;
            });
        }

        return currentRequest; // 始终返回一个 Promise
    };
}

