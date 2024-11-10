import {type baseResponse, useAxios} from "@/api/index";

export interface imageIdType {
    id: number
    path: string
    name: string
}

export function imageIdListApi():Promise<baseResponse<imageIdType>> {
    return useAxios.get("/api/images_names")
}