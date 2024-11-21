import {type baseResponse, type listDataType, useAxios} from "@/api/index";

export interface siteInfoType {
    addr: string
    bei_an: string
    bilibili_url: string
    created_at: string
    email: string
    gitee_url: string
    github_url: string
    job: string
    name: string
    qq_image: string
    slogan: string
    slogan_en: string
    title: string
    version: string
    web: string
    wechat_image: string
}

// 后端没有，但有个相似的，爽爆了
export function siteInfoApi(): Promise<baseResponse<listDataType<siteInfoType>>> {
    return useAxios.get("/api/settings/site")
}

// 更新不可以
export function siteInfoUpdateApi(data: siteInfoType): Promise<baseResponse<listDataType<siteInfoType>>> {
    return useAxios.put("/api/settings/site", data)
}

export interface emailType {
    host: string
    port: number
    user: string
    password: string
    default_from_email: string
    use_ssl: boolean
    user_tls: boolean
}

export interface qqType {
    app_id: string
    key: string
    redirect: string
}

export interface jwtType {
    secret: string
    expires: number
    issuer: string
}

export interface qiniuType {
    enable: boolean
    access_key: string
    secret_key: string
    bucket: string
    cdn: string
    zone: string
    prefix: string
    size: number
}


export type settingsName = "qq" | "email" | "qiniu" | "jwt"

export type settingsType = emailType | qqType | qiniuType | jwtType

export function settingsInfoApi(name: settingsName): Promise<baseResponse<settingsType>> {
    return useAxios.get("/api/settings/" + name.toString())
}


export function settingsInfoUpdateApi(name: settingsName,data: settingsType ): Promise<baseResponse<string>> {
    return useAxios.put("/api/settings/" + name.toString(),data)
}

export interface helpType {
    title: string
    abs?: string
    content?: string
}