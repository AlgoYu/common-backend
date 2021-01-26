<template>
    <el-container class="container">
        <el-aside
            class="aside-area transition-animations"
            v-bind:style="{ width: asideWidth }"
        >
            <!-- 头像 -->
            <section class="profile">
                <el-avatar
                    class="transition-animations"
                    icon="el-icon-user-solid"
                    :size="isCollapse ? 35 : 100"
                    :src="account.picture"
                    style="border: #000000 3px solid"
                ></el-avatar>
                <div>
                    <p style="text-align: center">
                        <b>{{ account.name }}</b>
                    </p>
                </div>
            </section>
            <!-- 左侧菜单栏 -->
            <section>
                <el-menu
                    router
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    :unique-opened="true"
                    style="width: auto"
                >
                    <!-- 循环左侧菜单渲染 -->
                    <template v-for="route in routes">
                        <!-- child大于0的菜单组 -->
                        <el-submenu
                            v-if="route.child.length > 0"
                            :index="route.uri"
                        >
                            <template slot="title">
                                <svg
                                    class="icon"
                                    aria-hidden="true"
                                    style="font-size: 20px; margin-right: 10px"
                                >
                                    <use
                                        :xlink:href="'#' + icons.get(route.key)"
                                    ></use>
                                </svg>
                                <span slot="title">{{ route.name }}</span>
                            </template>
                            <!-- 渲染没有子节点的单个菜单 -->
                            <el-menu-item
                                :index="item.uri"
                                v-for="item in route.child"
                            >
                                <svg
                                    class="icon"
                                    aria-hidden="true"
                                    style="font-size: 20px; margin-right: 10px"
                                >
                                    <use
                                        :xlink:href="'#' + icons.get(item.key)"
                                    ></use>
                                </svg>
                                <span slot="title">{{ item.name }}</span>
                            </el-menu-item>
                        </el-submenu>
                        <!-- 渲染没有子节点的单个菜单 -->
                        <el-menu-item v-else :index="route.uri">
                            <svg
                                class="icon"
                                aria-hidden="true"
                                style="font-size: 20px; margin-right: 10px"
                            >
                                <use
                                    :xlink:href="'#' + icons.get(route.key)"
                                ></use>
                            </svg>
                            <span slot="title">{{ route.name }}</span>
                        </el-menu-item>
                    </template>
                </el-menu>
            </section>
        </el-aside>
        <el-container style="width: auto">
            <el-header>
                <div class="main-head">
                    <el-row style="height: 100%">
                        <el-col :span="1" style="height: 100%">
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
                        <el-col :span="18" style="height: 100%">
                            <div class="flex-center">
                                <font
                                    size="5"
                                    color="#1D2F3B"
                                    style="align-self: center"
                                    ><b>{{ title }}</b></font
                                >
                            </div>
                        </el-col>
                        <el-col :span="5" style="height: 100%">
                            <div class="flex-center">
                                <el-input
                                    style="width: 250px"
                                    prefix-icon="el-icon-search"
                                    v-model="search"
                                    placeholder="搜索"
                                ></el-input>
                                <el-dropdown @command="handleCommand">
                                    <el-button
                                        icon="el-icon-menu"
                                        circle
                                        style="margin-left: 10px"
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
                <el-divider style="margin: 10px 0px"></el-divider>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { apiUrl, icons } from "@/global/Global.js";
import AccountApi from "@/api/module/AccountApi.js";
import AuthorityApi from "@/api/module/AuthorityApi.js";
import { createRoutes } from "@/util/RouterUtil.js";
import { logout } from "@/api/module/LoginApi.js";

export default {
    name: "Management",
    data() {
        return {
            title: "MachineGeek",
            isCollapse: false,
            asideWidth: "200px",
            search: "",
            account: {
                username: "MachineGeek",
                picture: "https://store.machine-geek.cn/Administrator.jpg",
            },
            icons: icons,
            routes: [],
        };
    },
    watch: {
        isCollapse(value) {
            this.asideWidth = value ? "70px" : "200px";
        },
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            // 获取用户信息
            AccountApi.getMyInfo((result) => {
                if (result.success) {
                    this.account = result.data;
                    this.account.picture = apiUrl + this.account.picture;
                }
            });
            // 获取用户权限信息以及路由
            AuthorityApi.getMyAuthorities((result) => {
                if (result.success) {
                    this.routes = result.data.routes;
                    // 创建新的路由
                    let temp = createRoutes(result.data.routes);
                    console.log(temp);
                    this.$router.addRoutes(temp);
                }
            });
            // console.log(this.$route);
        },
        handleCommand(command) {
            switch (command) {
                case "logout":
                    this.$confirm("是否退出当前账户?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                        .then(() => {
                            logout(
                                {
                                    refreshToken: this.$store.state.refreshToken
                                },
                                (result) => {
                                    if (result.success) {
                                        this.$store.commit("deleteToken");
                                        this.$router.push({
                                            path: "/Login",
                                        });
                                    }
                                }
                            );
                        })
                        .catch(() => {});
                    break;
            }
        },
    },
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
