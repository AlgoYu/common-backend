<template>
	<div>
		<el-table :data="table.data" style="width: 100%">
			<el-table-column prop="id" label="ID" align="center">
			</el-table-column>
			<el-table-column prop="name" label="角色名" align="center">
			</el-table-column>
			<el-table-column prop="key" label="权限字符" align="center">
			</el-table-column>
			<el-table-column prop="description" label="描述" align="center">
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
	} from '../../api/SystemRoleApi.js';
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
				list(this.param,(result)=>{
					if (result.success) {
						this.table.total = result.data.total;
						this.table.data = result.data.records;
					}
				})
			}
		}
	}
</script>

<style>
</style>