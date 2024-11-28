import {type baseResponse, type listDataType, type paramsType, useAxios} from "@/api/index";


export interface messageParams extends paramsType {
    nickName?: string;
}

export interface messageType {
    avatar: string
    count: number
    nickName: string
    userID: number
    userName: string
}

export interface messageRecordType {
    content: string
    created_at: string
    message_count: number
    rev_user_avatar: string
    rev_user_id: number
    rev_user_nick_name: string
    send_user_avatar: string
    send_user_id: number
    send_user_nick_name: string
    isMe: boolean //手动加上的
}

export function messageUserListApi(params?: messageParams): Promise<baseResponse<listDataType<messageType>>> {
    return useAxios.get("/api/messages_users", {params: params})
}

export function messageUserListByUserApi(userID: number): Promise<baseResponse<listDataType<messageType>>> {
    return useAxios.get("/api/messages_users/user", {params: {userID}})
}

export function messageUserRecordApi(sendUserID: number, revUserID: number): Promise<baseResponse<listDataType<messageRecordType>>> {
    return useAxios.get("/api/messages_users/record", {params: {sendUserID, revUserID}})
}

// 我的消息列表
export function messageUserListByMeApi(): Promise<baseResponse<listDataType<messageType>>> {
    return useAxios.get("/api/messages_users/me")
}

export interface userRecordRequestType extends paramsType {
    userID: number
}

// 我与某个用户的聊天记录
export function messageUserMeRecordApi(params: userRecordRequestType): Promise<baseResponse<listDataType<messageRecordType>>> {
    return useAxios.get("/api/messages_users/record/me", {params})
}
// 先添加了send_user_id，还在排查问题中 ***
export interface messagePublishType {
    content: string
    rev_user_id: number
    send_user_id: number;
}

// 发送消息
export function messagePublishApi(data: messagePublishType): Promise<baseResponse<string>> {
    return useAxios.post("/api/messages", data)

}
