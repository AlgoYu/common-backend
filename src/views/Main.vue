<template>
    <el-container class="container">
        <el-aside
            class="aside-area transition-animations"
            v-bind:style="{ width: asideWidth }"
        >
            <section class="profile">
                <el-avatar
                    class="transition-animations"
                    icon="el-icon-user-solid"
                    :size="isCollapse ? 35 : 100"
                    :src="user.picture"
                    style="border: #000000 3px solid;"
                ></el-avatar>
                <div>
                    <p style="text-align: center;">
                        <b>{{ user.username }}</b>
                    </p>
                </div>
            </section>
            <section>
                <el-menu
                    router
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    :unique-opened="true"
                    style="width: auto;"
                >
                    <template v-for="menu in menus">
                        <el-submenu
                            v-if="menu.children.length > 0"
                            :index="menu.path"
                        >
                            <template slot="title">
                                <svg
                                    class="icon"
                                    aria-hidden="true"
                                    style="font-size: 20px;margin-right: 10px;"
                                >
                                    <use
                                        :xlink:href="
                                            '#' + global.icons.get(menu.key)
                                        "
                                    ></use>
                                </svg>
                                <span slot="title">{{ menu.name }}</span>
                            </template>
                            <el-menu-item
                                :index="child.path"
                                v-for="child in menu.children"
                            >
                                <svg
                                    class="icon"
                                    aria-hidden="true"
                                    style="font-size: 20px;margin-right: 10px"
                                >
                                    <use
                                        :xlink:href="
                                            '#' + global.icons.get(child.key)
                                        "
                                    ></use>
                                </svg>
                                <span slot="title">{{ child.name }}</span>
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else :index="menu.path">
                            <svg
                                class="icon"
                                aria-hidden="true"
                                style="font-size: 20px;margin-right: 10px"
                            >
                                <use
                                    :xlink:href="
                                        '#' + global.icons.get(menu.key)
                                    "
                                ></use>
                            </svg>
                            <span slot="title">{{ menu.name }}</span>
                        </el-menu-item>
                    </template>
                </el-menu>
            </section>
        </el-aside>
        <el-container style="width: auto">
            <el-header>
                <div class="main-head">
                    <el-row style="height: 100%;">
                        <el-col :span="1" style="height: 100%;">
                            <div class="flex-center">
                                <el-button
                                    :icon="
                                        isCollapse
                                            ? 'el-icon-caret-right'
                                            : 'el-icon-caret-left'
                                    "
                                    circle
                                    class="vertical-center"
                                    v-on:click="isCollapse = !isCollapse"
                                ></el-button>
                            </div>
                        </el-col>
                        <el-col :span="18" style="height: 100%;">
                            <div class="flex-center">
                                <font
                                    size="5"
                                    color="#1D2F3B"
                                    style="align-self:center"
                                    ><b>{{ title }}</b></font
                                >
                            </div>
                        </el-col>
                        <el-col :span="5" style="height: 100%;">
                            <div class="flex-center">
                                <el-input
                                    style="width: 250px;"
                                    prefix-icon="el-icon-search"
                                    v-model="search"
                                    placeholder="搜索"
                                ></el-input>
                                <el-dropdown @command="handleCommand">
                                    <el-button
                                        icon="el-icon-menu"
                                        circle
                                        style="margin-left: 10px;"
                                    ></el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item
                                            icon="el-icon-s-fold"
                                            command="logout"
                                            >退出账户</el-dropdown-item
                                        >
                                        <el-dropdown-item icon="el-icon-attract"
                                            >链接</el-dropdown-item
                                        >
                                        <el-dropdown-item icon="el-icon-printer"
                                            >打印机</el-dropdown-item
                                        >
                                        <el-dropdown-item
                                            icon="el-icon-brush"
                                            disabled
                                            >皮肤</el-dropdown-item
                                        >
                                        <el-dropdown-item
                                            icon="el-icon-close-notification"
                                            divided
                                            >关闭通知</el-dropdown-item
                                        >
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <el-divider style="margin: 10px 0px;"></el-divider>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { getLoginInfo } from "../api/SystemUserApi.js";
import { getAuthorityTree } from "../api/SystemAuthorityApi.js";
import { logout } from "../api/LoginApi.js";

export default {
    name: "Management",
    data() {
        return {
            title: "MachineGeek",
            isCollapse: false,
            asideWidth: "200px",
            search: "",
            user: {
                username: "MachineGeek",
                picture: "http://store.machine-geek.cn/Administrator.jpg"
            },
            menus: []
        };
    },
    watch: {
        isCollapse(value) {
            this.asideWidth = value ? "70px" : "200px";
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            if (this.$store.state.user === undefined) {
                this.$router.push({
                    name: "Login"
                });
                return;
            }
            // 获取用户信息
            getLoginInfo(result => {
                if (result.success) {
                    result.data.picture =
                        this.global.apiUrl + res.data.data.picture;
                    this.user = result.data;
                }
            });
            var authorities = this.$store.state.user.authorities;
            authorities.sort((a, b) => {
                return b.sort - a.sort;
            });
            // 获取菜单
            this.menus = this.getChildren(
                this.$store.state.user.authorities,
                "0"
            );
            // 添加路由表
            this.initRoutes();
        },
        initRoutes() {
            var authorities = this.$store.state.user.authorities;
            var routes = new Array();
            authorities.forEach(authority => {
                if (authority.type == 0 && authority.path != null) {
                    routes.push({
                        path: authority.path,
                        name: authority.name,
                        component: () => import("@/views" + authority.path)
                    });
                }
            });
            this.$router.addRoutes([
                {
                    path: "/login",
                    name: "登录界面",
                    component: () => import("../views/Login.vue")
                },
                {
                    path: "/",
                    name: "后台管理",
                    component: () => import("../views/Main.vue"),
                    redirect: "/DataCenter",
                    children: routes
                }
            ]);
        },
        getChildren(authorities, id) {
            var children = new Array();
            authorities.forEach(authority => {
                if (authority.parentId === id) {
                    authority.children = this.getChildren(
                        authorities,
                        authority.id
                    );
                    children.push(authority);
                }
            });
            return children;
        },
        handleCommand(command) {
            switch (command) {
                case "logout":
                    this.$confirm("是否退出当前账户?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                        .then(() => {
                            logout();
                            localStorage.removeItem("accessToken");
                            localStorage.removeItem("refreshToken");
                            localStorage.removeItem("user");
                            this.$router.push({
                                name: "Login"
                            });
                        })
                        .catch(() => {});
                    break;
            }
        }
    }
};
</script>

<style scoped>
.container {
    height: 100%;
    width: 100%;
}

.aside-area {
    /* background-image: linear-gradient(rgb(145,191,191),rgb(188,208,198)); */
}

.main-area {
    /* background-color: #F4F4EF; */
}

.profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
}

.profile-info {
    width: 200px;
}

.main-head {
    width: 100%;
    height: 100%;
}

.el-divider--horizontal {
    margin: 14px 0;
}
</style>
