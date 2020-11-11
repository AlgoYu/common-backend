<template>
    <div>
        <el-table :data="table.data" style="width: 100%">
            <el-table-column prop="id" label="ID" align="center">
            </el-table-column>
            <el-table-column prop="picture" label="头像" align="center">
                <template slot-scope="scope">
                    <el-avatar
                        class="transition-animations"
                        icon="el-icon-user-solid"
                        :size="50"
                        :src="global.apiUrl + scope.row.picture"
                        style="border: #000000 2px solid;"
                    ></el-avatar>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
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
                        inactive-color="#13ce66"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center">
            </el-table-column>
            <el-table-column prop="updateTime" label="创建时间" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="info" @click="edit(scope.row)"
                        >编辑</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <div></div>
        <el-pagination
            layout="prev, pager, next"
            :total="table.total"
            style="text-align: center;"
        >
        </el-pagination>
        <el-dialog
            title="角色"
            :visible.sync="formDialog"
            width="30%"
            :close-on-click-modal="false"
        >
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="id" prop="parentId">
                    <el-input v-model="form.id" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input
                        v-model="form.username"
                        :disabled="true"
                    ></el-input>
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
import { paging, getWithRoleById,modifyWithRoleById } from "../../api/SystemUserApi.js";
import { list } from "../../api/SystemRoleApi";
export default {
    data() {
        return {
            form: {
                id: "",
                username: "",
                password: "",
                nickname: "",
                description: "",
                systemRoleIds: []
            },
            rules: {
                id: [
                    {
                        required: true,
                        message: "用户ID不可为空",
                        trigger: "change"
                    }
                ],
                username: [
                    {
                        required: true,
                        message: "用户名不可为空",
                        trigger: "blur"
                    }
                ],
                nickname: [
                    {
                        required: true,
                        message: "用户昵称不可为空",
                        trigger: "blur"
                    }
                ]
            },
            formDialog: false,
            param: {
                page: 1,
                size: 10,
                keyWord: ""
            },
            table: {
                total: 0,
                data: []
            },
            selector: {
                data: []
            }
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            paging(this.param, result => {
                if (result.success) {
                    this.table.total = result.data.total;
                    this.table.data = result.data.records;
                }
            });
            list(result => {
                if (result.success) {
                    this.selector.data = result.data;
                }
            });
        },
        edit(row) {
            getWithRoleById({id: row.id}, result => {
                if (result.success) {
                    this.form = result.data;
                    this.formDialog = true;
                }
            });
        },
        save() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    modifyWithRoleById(this.form, result => {
                        if (result.success) {
                            this.$message({
                                message: "保存成功!",
                                type: "success"
                            });
                        } else {
                            this.$message({
                                message: "保存失败！",
                                type: "warning"
                            });
                        }
                        this.formDialog = false;
                    });
                } else {
                    this.$message({
                        message: "请完成表单",
                        type: "warning"
                    });
                    return false;
                }
            });
        }
    }
};
</script>

<style>
</style>
