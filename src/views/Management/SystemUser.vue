<template>
	<div>
		<el-table :data="table.data" style="width: 100%">
			<el-table-column prop="picture" label="头像" align="center">
				<template slot-scope="scope">
					<el-avatar class="transition-animations" icon="el-icon-user-solid" :size="50" :src="global.apiUrl + scope.row.picture" style="border: #000000 2px solid;"></el-avatar>
					<span style="margin-left: 10px">{{ scope.row.date }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="id" label="ID" align="center">
			</el-table-column>
			<el-table-column prop="username" label="姓名" align="center">
			</el-table-column>
			<el-table-column prop="nickname" label="昵称" align="center">
			</el-table-column>
			<el-table-column prop="phone" label="手机" align="center">
			</el-table-column>
			<el-table-column prop="description" label="描述" align="center">
			</el-table-column>
			<el-table-column prop="email" label="邮箱" align="center">
			</el-table-column>
			<el-table-column prop="ip" label="IP地址" align="center">
			</el-table-column>
			<el-table-column prop="disable" label="是否禁用" align="center">
				<template slot-scope="scope">
					<el-switch
					  v-model="scope.row.disable"
					  active-color="#ff4949"
					  inactive-color="#13ce66">
					</el-switch>
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" align="center">
			</el-table-column>
			<el-table-column prop="updateTime" label="创建时间" align="center">
			</el-table-column>
		</el-table>
		<div>
			
		</div>
		<el-pagination
		    layout="prev, pager, next"
		    :total="table.total"
			style="text-align: center;">
		</el-pagination>
	</div>
</template>

<script>
	import {
		list
	} from '../../api/SystemUserApi.js';
	export default {
		data() {
			return {
				form: {

				},
				param: {
					page: 1,
					size: 10,
					keyWord: ''
				},
				table: {
					total: 0,
					data: []
				}
			}
		},
		created() {
			this.init();
		},
		methods: {
			init() {
				list(this.param).then((res) => {
					if (res.data.success) {
						this.table.total = res.data.data.total;
						this.table.data = res.data.data.records;
					}
				}).catch((err) => {
					this.$message({
						message: response.data.msg,
						type: 'warning'
					});
				})
			}
		}
	}
</script>

<style>
</style>
