import type {baseResponse} from "@/api/index";
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


