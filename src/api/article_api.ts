import {type baseResponse, type listDataType, type paramsType, useAxios} from "@/api/index";
import type {optionType} from "@/types";

export interface articleType {
    abstract: string
    banner_id: number
    banner_url: string
    category: string
    collects_count: number
    comment_count: number
    created_at: string
    digg_count: number
    id: string
    link: string
    look_count: number
    source: string
    tags: string[]
    title: string
    updated_at: string
    user_avatar: string
    user_id: number
    user_nick_name: string
}

export interface articleItemType {
    abstract: string
    banner_id?: number
    banner_url: string
    category: string
    collects_count: number
    comment_count: number
    created_at: string
    digg_count: number
    id: string
    link?: string
    look_count: number
    source?: string
    tags?: string[]
    title: string
    updated_at?: string
    user_avatar?: string
    user_id?: number
    user_nick_name?: string
}

export interface articleDataType {
    collects_count: number
    comment_count: number
    created_at: string
    digg_count: number
    look_count: number

}

export function articleListApi(params: paramsType): Promise<baseResponse<listDataType<articleType>>> {
    return useAxios.get("/api/articles", {params: params})
}

export function articleCategoryListApi(): Promise<baseResponse<optionType[]>> {
    return useAxios.get("/api/categorys")
}

export interface articleUpdateType {
    abstract?: string
    banner_id?: number,
    category?: string
    content?: string
    id?: string
    link?: string
    source?: string
    tags?: string[]
    title?: string

    banner_url?: string
}

export function articleUpdateApi(data: articleUpdateType): Promise<baseResponse<string>> {
    return useAxios.put("/api/articles", data)
}
export function articleCreateApi(data: articleUpdateType): Promise<baseResponse<string>> {
    return useAxios.post("/api/articles", data)
}


// 接口不对，后端没写
export function articleContentApi(id:string): Promise<baseResponse<string>> {
    return useAxios.get("/api/articles/content/"+id)
}