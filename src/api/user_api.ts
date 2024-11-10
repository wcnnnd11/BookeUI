import type {baseResponse, listDataType, paramsType} from "@/api/index";
import {useAxios} from "@/api/index";

export interface loginEmailType {
    user_name: string
    password: string
}

export function loginEmailApi(request: loginEmailType): Promise<baseResponse<string>> {
    return useAxios.post("/api/email_login",request)
}
export function logoutApi():Promise<baseResponse<string>>{
    return useAxios.post("/api/logout")
}

// qq登录回调地址有问题。先放着
export function loginQQPathApi():Promise<baseResponse<string>>{
    return useAxios.post("/api/qq_login_path")
}

export function qqLoginApi(code:string):Promise<baseResponse<string>>{
    return useAxios.post("/api/login",null,{params:{code}})
}

export interface userInfoType{
    id:number,
    created_at:string,
    nick_name:string,
    user_name:string,
    avatar:string,
    email:string,
    tel:string,
    addr:string,
    token:string
    ip:string,
    role_id:number,
    sign_status:string,
    integral:number,  //积分
    sign:string,  //slogan
    link:string  //跳转链接
}
export function userInfoApi():Promise<baseResponse<userInfoType>>{
    return useAxios.get("/api/user_info")
}

export function userListApi(params:paramsType):Promise<baseResponse<listDataType<userInfoType>>>{
    return useAxios.get("/api/users",{params})
}