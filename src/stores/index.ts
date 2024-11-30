import {defineStore} from 'pinia'
import {parseToken} from "@/utils/jwt";
import {logoutApi} from "@/api/user_api";
import type {Themes} from "md-editor-v3";

export interface userStoreInfoType {
    user_name: string;
    nick_name: string,
    role: number, // 角色||权限
    user_id: number,
    avatar: string,
    token: string,
    exp: number, // 过期时间，需要*1000

}


const theme = true // true light   false  dark
const collapsed: boolean = false
const userInfo: userStoreInfoType = {
    user_name: "",
    nick_name: "",
    role: 0,
    user_id: 0,
    avatar: "",
    token: "",
    exp: 0,
}

export const useStore = defineStore('counter', {
    state() {
        return {
            theme: theme,
            collapsed: collapsed, // 后台侧边栏的收缩状态，默认展开
            userInfo: userInfo,
        }
    },
    actions: {
        setTheme(localTheme?: boolean) {
            if (localTheme !== undefined) {
                // 我传了
                this.theme = localTheme
            } else {
                this.theme = !this.theme
            }
            document.documentElement.style.colorScheme = this.themeString
            document.body.setAttribute('arco-theme', this.themeString)

            localStorage.setItem("theme", JSON.stringify(this.theme))
        },
        loadTheme() {
            let val = localStorage.getItem("theme")
            if (val === null) {
                return
            }
            try {
                this.theme = JSON.parse(val)
                this.setTheme(this.theme)
            } catch (e) {
                return;
            }
        },
        setCollapsed(collapsed: boolean) {
            this.collapsed = collapsed
        },


        // 设置token
        async setToken(token: string) {
            this.userInfo.token = token
            // 调用用户信息的接口
            // let res =await userInfoApi()
            let info = parseToken(token)
            // 用户信息部分，先不使用，后端不全
            // let data=res.data
            //
            // this.userInfo = {
            //     user_name: data.user_name,
            //     nick_name: data.nick_name,
            //     role: info.role,
            //     user_id: info.user_id,
            //     avatar: data.avatar,
            //     token: token,
            //     exp: info.exp,
            // }

            Object.assign(this.userInfo, info)
            localStorage.setItem("userInfo", JSON.stringify(this.userInfo))
        },
// 加载token
        loadToken() {
            let val = localStorage.getItem("userInfo")
            if (val === null) {
                return
            }
            try {
                this.userInfo = JSON.parse(val)
            } catch (e) {
                this.clearUserInfo()
                return;
            }
            // 判断token是不是过期了
            // 先不启用，方便测试
            // let exp = Number(this.userInfo.exp) * 1000
            // let nowTime = new Date().getTime()
            // if (exp - nowTime <= 0) {
            //     // 过期
            //     Message.warning("登录已过期")
            //     this.clearUserInfo()
            //     return;
            // }
        },
// 注销
        async logout() {
            await logoutApi()
            this.clearUserInfo()
        },
// 清空用户信息
        clearUserInfo() {
            this.userInfo = userInfo
            localStorage.removeItem("userInfo")
        }

    },
    getters: {
        themeString(): Themes {
            return this.theme ? "light" : "dark"
        },
        isLogin(): boolean {
            return this.userInfo.role !== 0
        },
        //判断是不是管理员
        isAdmin(): boolean {
            return this.userInfo.role == 1
        },
        isGeneral(): boolean {
            return this.userInfo.role == 2
        },
        //判断是不是游客
        isTourist(): boolean {
            return this.userInfo.role == 3
        }
    }
})
