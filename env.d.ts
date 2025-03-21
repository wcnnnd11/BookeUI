/// <reference types="vite/client" />

export interface ImportMetaEnv {
    VITE_APP_ID: string
    VITE_SERVER_URL: string
}

declare global{
    const isLaptops:boolean
}

import 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        isLogin?: boolean
        isAdmin?: boolean
        isTourist?: boolean
        title?: string
    }
}