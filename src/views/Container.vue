<template>
	<el-container class="Container">

		<el-aside width="200px" class="Aside-Area">
			<!-- Profile Start -->
			<section class="Profile">
				<!-- <el-avatar icon="el-icon-user-solid" :size="75" :src="image"></el-avatar> -->
				<img src="../assets/logo.jpg" class="Image" />
				<p><b>AnyDev</b></p>
				<el-button-group>
					<el-button icon="el-icon-edit" size="mini" type="primary">编辑</el-button>
					<el-button icon="el-icon-s-tools" size="mini" type="primary">设置</el-button>
				</el-button-group>
			</section>
			<!-- Profile End -->
			<!-- Menu Start -->
			<section>
				<el-menu default-active="/dashboard" router>
					<el-menu-item index="/dashboard">
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
					<el-menu-item index="/about">
						<i class="el-icon-s-tools"></i>
						<span slot="title">设置</span>
					</el-menu-item>
				</el-menu>
			</section>
			<!-- Menu End -->
		</el-aside>
		<el-main class="Main-Area">
			<router-view></router-view>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		name: 'Container',
		data() {
			return {
				image: '../assets/logo.jpg'
			}
		},
		methods: {
			handleOpen() {
				console.log("打开");
			},
			handleClose() {
				console.log("关闭");
			}
		}
	}
</script>

<style>
	.Container {
		height: 100%;
	}

	.Aside-Area {
		background-color: #FFFFFF;
	}

	.Main-Area {
		background-color: #F4F4EF;
	}

	.Profile {
		text-align: center;
		padding-top: 20px;
		padding-bottom: 10px;
	}

	.Image {
		width: 85px;
		height: 85px;
		border-radius: 50%;
		border: #000000 solid 3px;
	}
</style>
