import {createRouter, createWebHistory} from 'vue-router'
import {Message} from "@arco-design/web-vue";
import type {RouteMeta} from "vue-router";
import {useStore} from "@/stores";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'web',
            component: () => import('../views/web/web.vue'),
            children: [
                {
                    path: "",
                    name: "index",
                    component: () => import('../views/web/index.vue'),
                }
            ]
        },
        {
            path: "/login",
            name: "login",
            component: () => import('../views/login/index.vue'),
        },
        {
            path: "/admin",
            name: "admin",
            component: () => import('../views/admin/index.vue'),
            meta: {
                title: "首页",
                isLogin: true,
            },
            children: [
                {
                    path: "",
                    name: "home",
                    meta: {
                        title: "home",
                    },
                    component: () => import('../views/admin/home/index.vue'),
                },

                {
                    path: "user_center",
                    name: "user_center",
                    meta: {
                        title: "个人中心",
                    },
                    children: [
                        {
                            path: "user_info",
                            name: "user_info",
                            meta: {
                                title: "我的信息",
                            },
                            component: () => import('../views/admin/user_center/user_info.vue'),
                        }
                    ]
                },
                {
                    path: "article",
                    name: "article",
                    meta: {
                        title: "文章管理",
                        isAdmin: true,
                        ifTourist: true,


                    },
                    children: [
                        {
                            path: "article_list",
                            name: "article_list",
                            meta: {
                                title: "文章列表",
                            },
                            component: () => import('../views/admin/article/article_list.vue'),
                        }
                    ]
                },
                {
                    path: "users",
                    name: "users",
                    meta: {
                        title: "用户管理",
                        isAdmin: true,
                        ifTourist: true,

                    },
                    children: [
                        {
                            path: "user_list",
                            name: "user_list",
                            meta: {
                                title: "用户列表",
                            },
                            component: () => import('../views/admin/users/user_list.vue'),
                        }
                    ]
                },
                {
                    path: "chat_group",
                    name: "chat_group",
                    meta: {
                        title: "群聊管理",
                        isAdmin: true,
                        ifTourist: true,

                    },
                    children: [
                        {
                            path: "chat_list",
                            name: "chat_list", meta: {
                                title: "聊天记录",
                            },
                            component: () => import('../views/admin/chat_group/chat_list.vue'),
                        }
                    ]
                },
                {
                    path: "system",
                    name: "system",
                    meta: {
                        title: "系统管理",
                        isAdmin: true,
                        ifTourist: false,
                    },
                    children: [
                        {
                            path: "menu_list",
                            name: "menu_list",
                            meta: {
                                title: "菜单列表",
                            },
                            component: () => import('../views/admin/system/menu_list.vue'),
                        },
                        {
                            path: "log_list",
                            name: "log_list",
                            meta: {
                                title: "系统日志",
                            },
                            component: () => import('../views/admin/system/log_list.vue'),
                        }

                    ]
                },
            ]
        }
    ]
})

export default router


router.beforeEach((to, from, next) => {
    const store = useStore()
    const meta = to.meta
    if (meta.isLogin && !store.isLogin) {
        Message.warning("需要登录")
        router.push({name: from.name as string})
        return
    }

    /*
    isLogin 登录了就能看
    isAdmin 管理员能看
    isTourist 游客能看，管理员也能看
     */
    //如果我是普通用户，那我就不能访问admin或者游客权限的页面
    if (store.userInfo.role===2 && (meta.isAdmin || meta.isTourist)){
        Message.warning("权限不足1")
                router.push({name: from.name as string})
                return
    }
    //如果我是游客，那我就不能访问游客权限为false的
    if (store.isAdmin && meta.isTourist){
        Message.warning("权限不足2")
        router.push({name: from.name as string})
        return
    }

    // 弃用，逻辑不清晰
    // if (meta.isAdmin) {
    //     // 需要管理员权限
    //     // 管理员能看，游客也能看
    //     if (meta.isTourist && !store.isTourist && !store.isAdmin) {
    //         // 身份不是游客
    //         Message.warning("权限不足2")
    //         router.push({name: from.name as string})
    //         return
    //     }
    //     if (!meta.isTourist && !store.isAdmin) {
    //         // 游客不能看，并且不是管理员
    //         Message.warning("权限不足1")
    //         router.push({name: from.name as string})
    //         return
    //
    //     }
    //
    // }


    next()
})
