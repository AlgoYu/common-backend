<template>
	<div class="container">
		<el-card class="box-card">
			<section v-if="!faceView" class="login-panel">
				<img src="https://wx4.sinaimg.cn/large/0065B4vHgy1g7u65sx5jsj309s08jwek.jpg" style="width: 50px;" class="logo" />
				<h2>后台管理系统</h2>
				<el-form :model="form" :rules="rules" ref="loginForm" label-width="100px">
					<el-form-item prop="username" label="账户名称:">
						<el-input v-model="form.username" placeholder="请输入账户名称" clearable></el-input>
					</el-form-item>
					<el-form-item prop="password" label="账户密码:">
						<el-input v-model="form.password" placeholder="请输入账户密码" type="password" clearable></el-input>
					</el-form-item>
					<el-form-item label="验证:">
						<SwipeVerification v-on:confirmSuccessChanged="confirmSuccessChanged"></SwipeVerification>
					</el-form-item>
					<div class="form-buttons">
						<el-button type="primary" @click="commit('loginForm')">登录</el-button>
						<el-button @click="resetForm('loginForm')">重置</el-button>
					</div>
				</el-form>
			</section>
		</el-card>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	import SwipeVerification from '../components/SwipeVerification.vue';
	import {
		login
	} from '../api/LoginApi.js';

	export default {
		name: 'Login',
		components: {
			SwipeVerification: SwipeVerification
		},
		data() {
			return {
				faceView: false,
				interval: null,
				form: {
					username: '',
					password: ''
				},
				rules: {
					username: [{
							required: true,
							message: '请输入账户名称',
							trigger: 'blur'
						},
						{
							min: 4,
							max: 20,
							message: '长度在 4 到 20 个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入账户名称',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 20,
							message: '长度在 6 到 20 个字符',
							trigger: 'blur'
						}
					]
				},
				confirmSuccess: false
			}
		},
		methods: {
			commit(formName) {
				if (!this.confirmSuccess) {
					this.$message.error('请完成滑动验证！');
					return;
				}
				// 验证表单是否通过
				this.$refs[formName].validate((isValid) => {
					// 通过验证既登录
					if (isValid) {
						login({
							username: this.form.username,
							password: md5(this.form.password).toUpperCase()
						}, (result) => {
							if (result.success) {
								this.$store.commit("updateUserInfo", result.data);
								this.$message({
									message: '登录成功！3秒后跳转至管理界面！',
									type: 'success'
								});
								// 跳转页面
								setTimeout(() => {
									this.$router.push({
										name: 'Main'
									});
								}, 3000);
							}
						});
					}
				});
			},
			confirmSuccessChanged(value) {
				this.confirmSuccess = value;
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.container {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.login-panel {
		width: 500px;
		height: 400px;
		padding-top: 20px;
		padding-bottom: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.form-buttons {
		display: flex;
		justify-content: space-around;
	}
</style>
