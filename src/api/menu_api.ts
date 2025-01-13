import {type baseResponse, type listDataType, type paramsType, useAxios} from "@/api/index";

export interface bannerType {
    id: number
    path: string
}

export interface menuType {
    title: string,
    path: string,
    slogan: string,
    abstract: string[],
    banner_time: number
    abstract_time: number
    banners: bannerType[]
    created_at: string,
    id: number,
    sort: number,
}

export function menuListApi(params: paramsType): Promise<baseResponse<listDataType<menuType>>> {
    return useAxios.get("/api/menus", {params: params})
}

export interface imageIdSortList {
    image_id: number
    sort: number
}

export interface menuCreateRequest {
    title: string,
    path: string,
    slogan: string,
    abstract: string[],
    banner_time: number
    abstract_time: number
    image_sort_list: imageIdSortList[]
    sort: number,
}

export function menuCreateApi(data: menuCreateRequest): Promise<baseResponse<string>> {
    return useAxios.post("/api/menus", data)
}

export function menuUpdateApi(id: number, data: menuCreateRequest): Promise<baseResponse<string>> {
    return useAxios.put("/api/menus/" + id.toString(), data)
}

export const defaultMenuForm = {
    abstract: [],
    abstract_time: 7,
    banner_time: 7,
    image_sort_list: [],
    path: "",
    slogan: "",
    sort: 1,
    title: "",
    abstractString: "",
    imageIdList: []
}

export interface menuNameType {
    id: number
    title: string
    path: string
}

export function menuNameListApi():Promise<baseResponse<menuNameType[]>> {
    return useAxios.get("/api/menus_names")
}