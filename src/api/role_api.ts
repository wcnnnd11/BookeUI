import {type baseResponse, type paramsType, useAxios} from "@/api/index";
import type {optionType} from "@/types";

export function roleIdListApi(params?: paramsType):Promise<baseResponse<optionType[]>> {
return useAxios.get("/api/role_ids",{params})
}