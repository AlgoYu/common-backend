<template>
	<el-container class="container">
		<el-aside width="200px" class="aside-area">
			<!-- Profile Start -->
			<section class="profile">
				<el-avatar class="image-border" icon="el-icon-user-solid" :size="100" :src="image"></el-avatar>
				<p><b style="color: #909399;">AnyDev</b></p>
				<el-button-group>
					<el-button icon="el-icon-edit" size="mini">编辑</el-button>
					<el-button @click="logout" icon="el-icon-s-unfold" size="mini">退出</el-button>
				</el-button-group>
			</section>
			<!-- Profile End -->
			<!-- Menu Start -->
			<section>
				<el-menu background-color="transparent" default-active="dashboard" router>
					<el-menu-item index="dashboard" @click="setTitle('数据统计')">
						<i class="el-icon-s-data"></i>
						<span slot="title">数据统计</span>
					</el-menu-item>
					<el-submenu index="">
						<template slot="title">
							<i class="el-icon-s-custom"></i>
							<span>账户管理</span>
						</template>
						<el-menu-item-group>
							<template slot="title">账户管理</template>
							<el-menu-item index="">选项1</el-menu-item>
							<el-menu-item index="">选项2</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="分组2">
							<el-menu-item index="1-3">选项3</el-menu-item>
						</el-menu-item-group>
						<el-submenu index="">
							<template slot="title">选项4</template>
							<el-menu-item index="1-4-1">选项1</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-menu-item index="">
						<i class="el-icon-s-check"></i>
						<span slot="title">角色管理</span>
					</el-menu-item>
					<el-menu-item index="">
						<i class="el-icon-warning"></i>
						<span slot="title">权限管理</span>
					</el-menu-item>
					<el-menu-item index="table" @click="setTitle('数据表格')">
						<i class="el-icon-document"></i>
						<span slot="title">数据表格</span>
					</el-menu-item>
					<el-menu-item index="editor" @click="setTitle('文本编辑')">
						<i class="el-icon-edit-outline"></i>
						<span slot="title">文本编辑</span>
					</el-menu-item>
					<el-menu-item index="map" @click="setTitle('地图信息')">
						<i class="el-icon-map-location"></i>
						<span slot="title">地图信息</span>
					</el-menu-item>
					<el-menu-item index="setup" @click="setTitle('系统设置')">
						<i class="el-icon-s-tools"></i>
						<span slot="title">系统设置</span>
					</el-menu-item>
				</el-menu>
			</section>
			<!-- Menu End -->
		</el-aside>
		<el-main class="main-area">
			<div class="main-head">
				<el-button icon="el-icon-caret-left" circle></el-button>
				<font size="5" color="#1D2F3B" style="align-self:center"><b>{{title}}</b></font>
				<div>
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
			</div>
			<el-divider></el-divider>
			<router-view></router-view>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		name: 'Management',
		data() {
			return {
				title: '数据概览',
				search: '',
				image: 'https://wx3.sinaimg.cn/large/0065B4vHgy1gcl0c200ijj30ku0kih4n.jpg'
			}
		},
		mounted() {
			this.$router.push("dashboard");
		},
		methods: {
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
		background-color: #F4F4EF;
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
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
