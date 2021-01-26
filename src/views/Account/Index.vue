<template>
    <div>
        <div style="margin-top: 10px; margin-bottom: 10px">
            <el-row>
                <el-col :span="10">
                    <el-button type="primary" @click="addData">增加</el-button>
                </el-col>
                <el-col :span="4" :offset="10">
                    <el-input
                        @keyup.enter.native="getPage"
                        v-model="param.keyWord"
                        placeholder="按关键字搜索内容"
                        suffix-icon="el-icon-search"
                    ></el-input>
                </el-col>
            </el-row>
        </div>
        <!-- 表单 -->
        <el-table :data="table.data" style="width: 100%" v-loading="load">
            <el-table-column prop="id" label="ID" align="center">
            </el-table-column>
            <el-table-column prop="picture" label="头像" align="center">
                <template slot-scope="scope">
                    <el-avatar
                        class="transition-animations"
                        icon="el-icon-user-solid"
                        :size="50"
                        :src="apiUrl + scope.row.picture"
                        style="border: #000000 2px solid"
                    ></el-avatar>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" align="center">
            </el-table-column>
            <el-table-column prop="mobile" label="手机" align="center">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" align="center">
            </el-table-column>
            <el-table-column prop="ip" label="IP地址" align="center">
            </el-table-column>
            <el-table-column prop="disable" label="是否启用" align="center">
                <template slot-scope="scope">
                    <el-tag
                        v-if="scope.row.enable"
                        type="success"
                        effect="dark"
                    >
                        启用
                    </el-tag>
                    <el-tag
                        v-else
                        type="danger"
                        effect="dark"
                    >
                        禁用
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center">
            </el-table-column>
            <el-table-column prop="updateTime" label="修改时间" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="150px">
                <template slot-scope="scope">
                    <el-button type="info" @click="edit(scope.row)"
                        >编辑</el-button
                    >
                    <el-button type="danger" @click="deleteData(scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            layout="prev, pager, next"
            :total="table.total"
            style="text-align: center"
            v-if="table.data.length > 0"
        >
        </el-pagination>
        <el-dialog
            title="角色"
            :visible.sync="formDialog"
            width="30%"
            :close-on-click-modal="false"
        >
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="id" prop="parentId" v-if="statu == 'edit'">
                    <el-input v-model="form.id" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input
                        v-model="form.username"
                        :disabled="statu == 'edit'"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="密码"
                    prop="password"
                    v-if="statu == 'add'"
                >
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="form.description"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select
                        v-model="form.systemRoleIds"
                        multiple
                        placeholder="请选择"
                        width="100%"
                    >
                        <el-option
                            v-for="role in selector.data"
                            :key="role.id"
                            :label="role.name"
                            :value="role.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="save">保存</el-button>
                    <el-button @click="formDialog = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import AccountApi from "@/api/module/AccountApi.js";
import RoleApi from "@/api/module/RoleApi.js";
import md5 from "js-md5";
export default {
    data() {
        return {
            load: true,
            statu: "",
            form: {
                id: "",
                username: "",
                password: "",
                nickname: "",
                description: "",
                systemRoleIds: [],
            },
            rules: {
                id: [
                    {
                        required: true,
                        message: "用户ID不可为空",
                        trigger: "change",
                    },
                ],
                username: [
                    {
                        required: true,
                        message: "用户名不可为空",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "密码不可为空",
                        trigger: "blur",
                    },
                ],
                nickname: [
                    {
                        required: true,
                        message: "用户昵称不可为空",
                        trigger: "blur",
                    },
                ],
            },
            formDialog: false,
            param: {
                page: 1,
                size: 10,
                keyWord: "",
            },
            table: {
                total: 0,
                data: [],
            },
            selector: {
                data: [],
            },
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getPage();
            RoleApi.list((result) => {
                if (result.success) {
                    this.selector.data = result.data;
                }
            });
        },
        edit(row) {
            this.statu = "edit";
            getWithRoleById({ id: row.id }, (result) => {
                if (result.success) {
                    this.form = result.data;
                    this.formDialog = true;
                }
            });
        },
        deleteData(row) {
            this.$confirm("确认删除这条数据吗?", "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    deleteById(
                        {
                            id: row.id,
                        },
                        (result) => {
                            if (result.success) {
                                this.$message({
                                    message: "删除成功!",
                                    type: "success",
                                });
                                this.getPage();
                            }
                        }
                    );
                })
                .catch(() => {});
        },
        addData() {
            this.statu = "add";
            this.form = {
                id: "",
                username: "",
                password: "",
                nickname: "",
                description: "",
                systemRoleIds: [],
            };
            this.formDialog = true;
        },
        getPage() {
            this.load = true;
            AccountApi.paging(this.param, (result) => {
                if (result.success) {
                    this.table.total = parseInt(result.data.total);
                    this.table.data = result.data.records;
                }
                this.load = false;
            });
        },
        save() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    switch (this.statu) {
                        case "add":
                            this.load = true;
                            let temp = this.form;
                            temp.password = md5(temp.password);
                            add(temp, (result) => {
                                if (result.success) {
                                    this.$message({
                                        message: "保存成功!",
                                        type: "success",
                                    });
                                    this.getPage();
                                } else {
                                    this.$message({
                                        message: "保存失败！",
                                        type: "warning",
                                    });
                                }
                                this.load = false;
                            });
                            break;
                        case "edit":
                            modifyWithRoleById(this.form, (result) => {
                                if (result.success) {
                                    this.$message({
                                        message: "保存成功!",
                                        type: "success",
                                    });
                                    this.getPage();
                                } else {
                                    this.$message({
                                        message: "保存失败！",
                                        type: "warning",
                                    });
                                }
                                this.load = false;
                            });
                            break;
                    }
                    this.formDialog = false;
                } else {
                    this.$message({
                        message: "请完成表单",
                        type: "warning",
                    });
                    return false;
                }
            });
        },
    },
};
</script>

<style>
</style>
