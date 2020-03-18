<template>
	<el-card class="box-card">
		<div v-loading="loading">
			<div class="tools-container">
				<el-button-group>
					<el-tooltip class="item" effect="dark" content="添加" placement="bottom">
						<el-button type="primary" icon="el-icon-circle-plus"></el-button>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="刷新" placement="bottom">
						<el-button type="success" icon="el-icon-refresh" @click="handleRefresh"></el-button>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="批量删除" placement="bottom">
						<el-button type="danger" icon="el-icon-remove" @click="handleBatchDelete"></el-button>
					</el-tooltip>
				</el-button-group>
				<div>
					<font>日期：</font>
					<el-date-picker v-model="dateRange" type="datetimerange" range-separator="至" start-placeholder="开始日期"
					 end-placeholder="结束日期" align="right">
					</el-date-picker>
				</div>
				<div>
					<font>筛选：</font>
					<el-select v-model="choose" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div>
					<el-input @keyup.enter.native="handleKeyboardEnter" v-model="keyWord" placeholder="搜索账户" prefix-icon="el-icon-search"
					 clearable style="width: 200px;"></el-input>
					<el-tooltip class="item" effect="dark" content="也可以在输入框直接回车搜索哦!" placement="bottom">
						<el-button type="primary" @:click="handleSearch" style="margin-left: 5px;">搜索</el-button>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="导出成Excel表格" placement="bottom">
						<el-button @:click="handleExport" icon="el-icon-receiving" style="margin-left: 5px;">导出</el-button>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="连接打印机打印" placement="bottom">
						<el-button @:click="handleExport" icon="el-icon-printer" style="margin-left: 5px;">打印</el-button>
					</el-tooltip>
				</div>
			</div>
			<el-table :data="accountListData" style="width: 100%" :row-class-name="tableRowClassName">
				<el-table-column type="selection" width="70" align="center">
				</el-table-column>
				<el-table-column prop="accountId" label="账户ID" width="50" align="center">
				</el-table-column>
				<el-table-column prop="accountName" label="账户名称" align="center" fit>
				</el-table-column>
				<el-table-column prop="accountDescription" label="账户描述" align="center" fit>
				</el-table-column>
				<el-table-column prop="accountSex" label="账户性别" align="center" fit>
				</el-table-column>
				<el-table-column prop="createDatetime" label="创建时间" align="center" fit>
				</el-table-column>
				<el-table-column prop="lastLoginDatetime" label="上一次登录时间" align="center" fit>
				</el-table-column>
				<el-table-column label="操作" align="center" fixed="right">
					<template slot-scope="scope">
						<el-button-group>
							<el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
								<el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit"></el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="删除" placement="bottom">
								<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete"></el-button>
							</el-tooltip>
						</el-button-group>
					</template>
				</el-table-column>
			</el-table>
			<div class="bottom-tools-container">
				<el-pagination :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
				 :total="total">
				</el-pagination>
			</div>
		</div>
	</el-card>
</template>

<script>
	export default {
		name: 'AccountList',
		data() {
			return {
				loading: false,
				currentPage: 1,
				pageSize: 10,
				total: 10,
				keyWord: '',
				dateRange: '',
				options: [{
					value: '选项1',
					label: '男'
				}, {
					value: '选项2',
					label: '女'
				}],
				choose: '',
				accountListData: [{
					accountId: 1,
					accountName: '花无缺',
					accountDescription: 'Administartor',
					accountSex: '男',
					createDatetime: '2020.02.02 20：20',
					lastLoginDatetime: '2020.02.01 20:20'
				}, {
					accountId: 2,
					accountName: '王梦蝶',
					accountDescription: 'Administartor',
					accountSex: '男',
					createDatetime: '2020.02.02 20：20',
					lastLoginDatetime: '2020.02.01 20:20'
				}, {
					accountId: 3,
					accountName: '萧炎',
					accountDescription: 'Administartor',
					accountSex: '男',
					createDatetime: '2020.02.02 20：20',
					lastLoginDatetime: '2020.02.01 20:20'
				}, {
					accountId: 4,
					accountName: '吴语薇',
					accountDescription: 'Administartor',
					accountSex: '女',
					createDatetime: '2020.02.02 20：20',
					lastLoginDatetime: '2020.02.01 20:20'
				}, {
					accountId: 5,
					accountName: '林冲',
					accountDescription: 'Administartor',
					accountSex: '男',
					createDatetime: '2020.02.02 20：20',
					lastLoginDatetime: '2020.02.01 20:20'
				}, {
					accountId: 6,
					accountName: '陈怀瑶',
					accountDescription: 'Administartor',
					accountSex: '女',
					createDatetime: '2020.02.02 20：20',
					lastLoginDatetime: '2020.02.01 20:20'
				}, {
					accountId: 7,
					accountName: '古三通',
					accountDescription: 'Administartor',
					accountSex: '男',
					createDatetime: '2020.02.02 20：20',
					lastLoginDatetime: '2020.02.01 20:20'
				}, {
					accountId: 8,
					accountName: '张采灵',
					accountDescription: 'Administartor',
					accountSex: '女',
					createDatetime: '2020.02.02 20：20',
					lastLoginDatetime: '2020.02.01 20:20'
				}, {
					accountId: 9,
					accountName: '张三丰',
					accountDescription: 'Administartor',
					accountSex: '男',
					createDatetime: '2020.02.02 20：20',
					lastLoginDatetime: '2020.02.01 20:20'
				}, {
					accountId: 10,
					accountName: '李夏柔',
					accountDescription: 'Administartor',
					accountSex: '女',
					createDatetime: '2020.02.02 20：20',
					lastLoginDatetime: '2020.02.01 20:20'
				}],
				isRefresh: false
			}
		},
		methods: {
			loadData() {
				this.loading = false;
				this.axios.get('/api/account/getCurrentPageData')
					.then((response) => {
						// 判断是否为空或是否为数组
						if (response.data.data != null && response.data.data.data instanceof Array) {
							this.accountListData = response.data.data.data;
							this.pageSize = response.data.data.pageSize;
							this.total = response.data.data.total;
							if (this.isRefresh) {
								this.$message({
									message: '刷新成功！',
									type: 'success'
								});
								this.isRefresh = false;
							}
						} else {
							this.$message.error('请重新登录！');
							this.$router.push({
								name: 'Login'
							});
						}
						this.loading = false;
					})
					.catch((error) => {
						// 这里是请求失败
						this.$message.error('网络错误！' + error);
						this.loading = false;
					});
			},
			//搜索按钮
			handleSearch() {
				this.currentPage = 1;
				this.isRefresh = true;
				this.loadData();
			},
			//输入框键盘回车
			handleKeyboardEnter() {
				this.currentPage = 1;
				this.isRefresh = true;
				this.loadData();
			},
			//表格内删除按钮
			handleDelete(index, row) {
				console.log(index);
				console.log(row);
				console.log("删除");
			},
			//刷新按钮
			handleRefresh() {
				this.isRefresh = true;
				this.loadData();
			},
			//批量删除按钮
			handleBatchDelete() {
				console.log("批量删除");
			},
			//编辑按钮
			handleEdit(index, row) {
				console.log("编辑" + index + row);
			},
			// 表单行颜色
			tableRowClassName({
				row,
				rowIndex
			}) {
				console.log(rowIndex);
				if (row.accountSex == '男') {
					return 'male';
				} else {
					return 'female';
				}
			}
		}
	}
</script>

<style>
	.tools-container {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.el-table .male {
		background: #FFFFFF;
	}

	.el-table .female {
		background: #FFFFFF;
	}

	.bottom-tools-container {
		display: flex;
		justify-content: center;
	}
</style>
