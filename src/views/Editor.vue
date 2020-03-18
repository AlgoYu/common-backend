<template>
	<el-card class="box-card">
		<div id="editor">
			<p>这里可以输入内容...</p>
		</div>
		<el-button @click="print">XSS过滤并打印到控制台</el-button>
	</el-card>
</template>

<script>
	import Editor from 'wangeditor';
	import Xss from 'xss';
	export default {
		name: 'Editor',
		data(){
			return {
				editor: null
			}
		},
		mounted(){
			this.editor = new Editor("#editor");
			// 设置服务端上传地址
			this.editor.customConfig.uploadImgServer = '/uploadImage';
			// 将图片大小限制为 3M
			this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024
			// 限制一次最多上传 5 张图片
			this.editor.customConfig.uploadImgMaxLength = 5
			// 更多参数看官网https://www.kancloud.cn/wangfupeng/wangeditor3/335782
			this.editor.create();
		},
		methods:{
			print(){
				console.log(Xss(this.editor.txt.html()));
			}
		}
	}
</script>

<style>
</style>
