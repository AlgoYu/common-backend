<template>
	<el-container class="container">
		<el-aside width="auto" class="aside-area">
			<transition name="el-zoom-in-center">
				<section class="profile" v-show="!isCollapse">
					<el-avatar class="image-border" icon="el-icon-user-solid" :size="100" :src="user.picture"></el-avatar>
					<p><b style="color: #909399;">{{user.username}}</b></p>
					<el-button-group>
						<el-button icon="el-icon-edit" size="mini">编辑</el-button>
						<el-button @click="logout" icon="el-icon-s-unfold" size="mini">退出</el-button>
					</el-button-group>
				</section>
			</transition>
			<section>
				<el-menu router :collapse="isCollapse" :collapse-transition="false" :unique-opened="true" style="width: 200px;">
					<div v-for="menu in menus">
						<el-submenu v-if="menu.children.length > 0" :index="menu.id">
							<template slot="title">
								<svg class="icon" aria-hidden="true" style="font-size: 25px;margin-right: 5px;">
									<use :xlink:href="'#'+global.icons.get(menu.key)"></use>
								</svg>
								<span slot="title">{{menu.name}}</span>
							</template>
							<el-menu-item :index="child.id" v-for="child in menu.children">
								<svg class="icon" aria-hidden="true" style="font-size: 25px;margin-right: 5px;">
									<use :xlink:href="'#'+global.icons.get(child.key)"></use>
								</svg>
								<span slot="title">{{child.name}}</span>
							</el-menu-item>
						</el-submenu>
						<el-menu-item v-else :index="menu.id">
							<svg class="icon" aria-hidden="true" style="font-size: 25px;margin-right: 5px;">
								<use :xlink:href="'#'+global.icons.get(menu.key)"></use>
							</svg>
							<span slot="title">{{menu.name}}</span>
						</el-menu-item>
					</div>
				</el-menu>
			</section>
		</el-aside>
		<el-container>
			<el-header>
				<div class="main-head">
					<el-row style="height: 100%;">
						<el-col :span="1" style="height: 100%;">
							<div class="flex-center">
								<el-button icon="el-icon-caret-left" circle class="vertical-center" v-on:click="isCollapse = !isCollapse"></el-button>
							</div>
						</el-col>
						<el-col :span="18" style="height: 100%;">
							<div class="flex-center">
								<font size="5" color="#1D2F3B" style="align-self:center"><b>{{title}}</b></font>
							</div>
						</el-col>
						<el-col :span="5" style="height: 100%;">
							<div class="flex-center">
								<el-input style="width: 250px;" prefix-icon="el-icon-search" v-model="search" placeholder="搜索"></el-input>
								<el-dropdown>
									<el-button icon="el-icon-menu" circle style="margin-left: 10px;"></el-button>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item icon="el-icon-magic-stick">提醒</el-dropdown-item>
										<el-dropdown-item icon="el-icon-attract">链接</el-dropdown-item>
										<el-dropdown-item icon="el-icon-printer">打印机</el-dropdown-item>
										<el-dropdown-item icon="el-icon-brush" disabled>皮肤</el-dropdown-item>
										<el-dropdown-item icon="el-icon-close-notification" divided>关闭通知</el-dropdown-item>
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
	import {
		getCurrent
	} from '../api/SystemUserApi.js';
	import {
		getMenu
	} from '../api/SystemAuthorityApi.js';
	export default {
		name: 'Management',
		data() {
			return {
				title: 'MachineGeek',
				isCollapse: false,
				search: '',
				user: {
					username: 'MachineGeek',
					picture: 'http://store.machine-geek.cn/Administrator.jpg'
				},
				menus: []
			}
		},
		created() {
			this.init();
		},
		methods: {
			init() {
				console.log(this.global.icons.get("SYSTEM"));
				// 获取菜单
				getMenu().then((res) => {
					if (res.data.success) {
						this.menus = res.data.data;
					}
				}).catch((err) => {
					this.$message.error(err);
				});
				// 获取用户信息
				getCurrent().then((res) => {
					if (res.data.success) {
						res.data.data.picture = this.global.apiUrl + res.data.data.picture;
						this.user = res.data.data;
					}
				}).catch((err) => {
					this.$message.error(err);
				});
			},
			modifyTitle(event) {
				console.log(event);
			},
			logout() {
				this.$router.push('login');
			},
			setTitle(title) {
				this.title = title;
			}
		}
	}
</script>

<style>
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
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.image-border {
		border: #000000 solid 4px;
	}

	.main-head {
		width: 100%;
		height: 100%;
	}

	.el-divider--horizontal {
		margin: 14px 0;
	}
</style>
