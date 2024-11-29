import type {baseResponse, listDataType, paramsType} from "@/api/index";
import {useAxios} from "@/api/index";

export interface loginEmailType {
    user_name: string
    password: string
}

export function loginEmailApi(request: loginEmailType): Promise<baseResponse<string>> {
    return useAxios.post("/api/email_login", request)
}

export function logoutApi(): Promise<baseResponse<string>> {
    return useAxios.post("/api/logout")
}

// qq登录回调地址有问题。先放着
export function loginQQPathApi(): Promise<baseResponse<string>> {
    return useAxios.post("/api/qq_login_path")
}

export function qqLoginApi(code: string): Promise<baseResponse<string>> {
    return useAxios.post("/api/login", null, {params: {code}})
}

export interface userInfoType {
    id: number,
    created_at: string,
    nick_name: string,
    user_name: string,
    avatar: string,
    email: string,
    tel: string,
    addr: string,
    token: string
    ip: string,
    role: string,
    role_id: number,
    sign_status: string,
    integral: number,  //积分
    sign: string,  //slogan
    link: string  //跳转链接
}

/*
原本的请求api是 /api/user_info
我这里直接使用了另一个接口，用户详细信息
所以会缺少一些数据，如积分、签名、我的博客
 */
export function userInfoApi(): Promise<baseResponse<userInfoType>> {
    return useAxios.get("/api/user/detail")
}

export function userListApi(params: paramsType): Promise<baseResponse<listDataType<userInfoType>>> {
    return useAxios.get("/api/users", {params})
}

export interface userUpdateRequest {
    role: number,
    nick_name: string,
    user_id: number,
}

// 完蛋了，这tm什么时候写的？？？？？？？？？？
export function userUpdateApi(data: userUpdateRequest): Promise<baseResponse<string>> {
    return useAxios.put("/api/user_role", data)
}

export interface userInfoUpdateType {
    link: string
    nick_name: string
    sign: string
    avatar: string
}

export function userInfoUpdateApi(data: userInfoUpdateType): Promise<baseResponse<string>> {
    return useAxios.put("/api/user_info", data)
}


export interface userUpdatePasswordType {
    old_pwd: string
    pwd: string
    re_pwd: string

}

export function userUpdatePasswordApi(data: userUpdatePasswordType) {
    return useAxios.put("/api/user_password", data)
}

export interface userBindEmailType {
    code?: string
    email: string
    password?: string


}

export function userBindEmailApi(data: userBindEmailType): Promise<baseResponse<string>> {
    return useAxios.post("/api/user_bind_email", data)

}