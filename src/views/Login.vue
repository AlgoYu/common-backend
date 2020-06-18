<template>
	<div class="container">
		<el-card class="box-card">
			<section class="option-panel">
				<el-button circle @click="changePanel">
					<svg class="icon" aria-hidden="true" style="font-size: 25px;color: #909399;">
						<use xlink:href="#icon-camera-fill"></use>
					</svg>
				</el-button>
			</section>
			<section v-if="!faceView" class="login-panel">
				<img src="https://wx4.sinaimg.cn/large/0065B4vHgy1g7u65sx5jsj309s08jwek.jpg" style="width: 50px;" class="logo" />
				<h2>后台管理系统</h2>
				<el-form :model="form" :rules="rules" ref="loginForm" label-width="100px">
					<el-form-item prop="accountName" label="账户名称:">
						<el-input v-model="form.accountName" placeholder="请输入账户名称" clearable></el-input>
					</el-form-item>
					<el-form-item prop="accountPassword" label="账户密码:">
						<el-input v-model="form.accountPassword" placeholder="请输入账户密码" type="password" clearable></el-input>
					</el-form-item>
					<el-form-item label="验证:">
						<SwipeVerification v-on:confirmSuccessChanged="confirmSuccessChanged"></SwipeVerification>
						<el-switch v-model="form.rememberMe" active-color="#13ce66" inactive-color="#ff4949" active-text="自动登录">
						</el-switch>
					</el-form-item>
					<div class="form-buttons">
						<el-button type="primary" @click="login('loginForm')">登录</el-button>
						<el-button @click="resetForm('loginForm')">重置</el-button>
					</div>
				</el-form>
			</section>
			<section v-if="faceView" class="face-panel">
				<h2 style="margin: 0 auto;">人脸识别</h2>
				<video autoplay="autoplay" class="video-style"></video>
			</section>
		</el-card>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	import SwipeVerification from '../components/SwipeVerification.vue'

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
					accountName: '',
					accountPassword: '',
					rememberMe: true
				},
				rules: {
					accountName: [{
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
					accountPassword: [{
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
		watch: {
			faceView(value) {
				if (value) {
					this.initCamera();
				}else{
					window.clearInterval(this.interval);
				}
			}
		},
		methods: {
			changePanel() {
				this.faceView = !this.faceView;
			},
			initCamera() {
				let self = this;
				navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
				if (navigator.getUserMedia) {
					//调用用户媒体设备, 访问摄像头
					navigator.getUserMedia({
						video: {
							width: 800,
							height: 400
						}
					}, function(stream) {
						var video = document.querySelector('video');
						video.srcObject = stream;
						self.streamPicture = stream; //关闭摄像头需要用
						video.onloadedmetadata = function(e) {
							video.play();
						};
						video.addEventListener('loadeddata', function(){
							var canvas = document.createElement("canvas");
							canvas.width = video.videoWidth;
							canvas.height = video.videoHeight;
							self.interval = window.setInterval(function(){
								canvas.getContext('2d').drawImage(video, 0, 0, canvas.width,canvas.height);
								let url = canvas.toDataURL("image/png");
								console.log(url);
							},3000);
						});
					}, function(err) {
						console.log("访问用户媒体设备失败: " + err.name);
					})
				} else {
					self.$message.error('不支持访问用户媒体');
				}
			},
			login(formName) {
				if (!this.confirmSuccess) {
					this.$message.error('请完成滑动验证！');
					return;
				}
				// 验证表单是否通过
				this.$refs[formName].validate((isValid) => {
					// 通过验证既登录
					if (isValid) {
						this.axios.post('/login', {
								accountName: this.form.accountName,
								accountPassword: md5(this.form.accountPassword)
							})
							.then((response) => {
								// 判断是否登录成功
								if (response.data.data) {
									this.$message({
										message: '登录成功！3秒后跳转至管理界面！',
										type: 'success'
									});
									// 跳转页面
									setTimeout(() => {
										this.$router.push({
											name: 'Management',
											params: {
												accountName: this.form.accountName
											}
										});
									}, 3000);
								} else {
									this.$message({
										message: response.data.message,
										type: 'warning'
									});
								}
							})
							.catch((error) => {
								// 这里是请求失败
								this.$message.error('当前网络不畅，请检查您的网络！' + error);
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
<style>
	.container {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.option-panel {
		display: flex;
		flex-direction: row-reverse;
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

	.face-panel {
		width: 800px;
		height: 500px;
		padding-top: 20px;
		padding-bottom: 20px;
		display: flex;
		flex-direction: column;
	}

	.video-style {
		height: 100%;
		width: 100%;
	}

	.form-buttons {
		display: flex;
		justify-content: space-around;
	}
</style>
