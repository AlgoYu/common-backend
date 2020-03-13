<template>
	<el-container class="container">
		<el-aside width="200px" class="aside-area">
			<!-- Profile Start -->
			<section class="profile">
				<el-avatar class="image-border" icon="el-icon-user-solid" :size="100" :src="image"></el-avatar>
				<p><b style="color: #FFFFFF;">AnyDev</b></p>
				<el-button-group>
					<el-button icon="el-icon-edit" size="mini">编辑</el-button>
					<el-button @click="logout" icon="el-icon-s-unfold" size="mini">退出</el-button>
				</el-button-group>
			</section>
			<!-- Profile End -->
			<!-- Menu Start -->
			<section>
				<el-menu text-color="#ffffff" background-color="transparent" default-active="dashboard" router>
					<el-menu-item index="dashboard">
						<i class="el-icon-menu"></i>
						<span slot="title">数据统计</span>
					</el-menu-item>
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-s-custom"></i>
							<span>账户管理</span>
						</template>
						<el-menu-item-group>
							<template slot="title">账户管理</template>
							<el-menu-item index="1-1">选项1</el-menu-item>
							<el-menu-item index="1-2">选项2</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="分组2">
							<el-menu-item index="1-3">选项3</el-menu-item>
						</el-menu-item-group>
						<el-submenu index="1-4">
							<template slot="title">选项4</template>
							<el-menu-item index="1-4-1">选项1</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-menu-item index="2">
						<i class="el-icon-s-check"></i>
						<span slot="title">角色管理</span>
					</el-menu-item>
					<el-menu-item index="3">
						<i class="el-icon-warning"></i>
						<span slot="title">权限管理</span>
					</el-menu-item>
					<el-menu-item index="map">
						<i class="el-icon-position"></i>
						<span slot="title">地图信息</span>
					</el-menu-item>
					<el-menu-item index="setup">
						<i class="el-icon-s-tools"></i>
						<span slot="title">设置</span>
					</el-menu-item>
				</el-menu>
			</section>
			<!-- Menu End -->
		</el-aside>
		<el-main class="main-area">
			<div class="main-head">
				<el-button icon="el-icon-caret-left" circle></el-button>
				<font size="5" color="#1D2F3B"><b>{{currentPage}}</b></font>
				<el-input style="width: 250px;" prefix-icon="el-icon-search" v-model="search" placeholder="搜索"></el-input>
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
				currentPage: '数据概览',
				search: '',
				image: 'https://wx3.sinaimg.cn/large/0065B4vHgy1gcl0c200ijj30ku0kih4n.jpg'
			}
		},
		mounted(){
			this.$router.push("dashboard");
		},
		methods: {
			modifyTitle(event){
				console.log(event);
			},
			logout(){
				this.$router.push('login');
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
		background-image: linear-gradient(rgb(145,191,191),rgb(188,208,198));
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
		border: #FFFFFF solid 3px;
	}
	
	.main-head{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
