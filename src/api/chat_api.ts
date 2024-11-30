import type {baseResponse, listDataType, paramsType} from "@/api/index";
import {useAxios} from "@/api/index";

export interface chatType {
    addr?: string
    avatar: string
    content: string
    created_at: string
    id?: number
    ip?: string
    is_group?: boolean
    msg_type: number // 1系统消息-进入聊天室 2文本消息 0?:7系统消息-离开聊天室
    nick_name: string

    isMe: boolean
}

export function chatRecordApi(params: paramsType): Promise<baseResponse<listDataType<chatType>>> {
    return useAxios.get("/api/chat_groups_records", {params: params})
}

export function chatRemoveApi(id_list: number[]): Promise<baseResponse<listDataType<chatType>>> {
    return useAxios.delete("/api/chat_groups_remove", {data: {id_list}})
}

export interface chatGroupConfigType {
    isAnonymous: boolean
    isShowTime: boolean
    defaultLimit: number
    welcomeTitle: string
    isOnlinePeople: boolean
    isSendImage: boolean
    isSendFile?: boolean
    isPaste: boolean
    isMd?:boolean
    contentLength?:number

}

export interface chatMessageType{
    avatar:string
    content:string
    created_at:string
    msg_type:number
    nick_name:string
    online_count?:number
}