import {type baseResponse, cacheRequest, useAxios} from "@/api/index";
import type {optionType} from "@/types";

// 标签名称列表
// export function tagOptionsApi(): Promise<baseResponse<optionType[]>> {
//     return useAxios.get("/api/tag_names")
// }

export const tagOptionsApi: () =>Promise<baseResponse<optionType[]>> = cacheRequest(() => useAxios.get("/api/tag_names"))