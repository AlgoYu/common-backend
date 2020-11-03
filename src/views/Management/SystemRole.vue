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
                <el-form-item label="角色ID" prop="parentId">
                    <el-input v-model="form.id" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="form.name"></el-input>
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
                <el-form-item label="权限">
                    <el-tree
                        show-checkbox
                        accordion
                        ref="tree"
                        node-key="id"
                        :check-strictly="true"
                        :default-checked-keys="form.authorityIds"
                        :data="tree.data"
                        :props="tree.defaultProps"
                        getCheckedKeys="selectKeys"
                    >
                    </el-tree>
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
import { list, getById, modifyById } from "../../api/SystemRoleApi.js";
import { getAllAuthorityTree, add } from "@/api/SystemAuthorityApi.js";
export default {
    data() {
        return {
            form: {
                id: "",
                name: "",
                description: "",
                authorityIds: []
            },
            selects: [],
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入权限名称",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 10,
                        message: "长度在 2 到 10 个字符",
                        trigger: "blur"
                    }
                ],
                id: [
                    {
                        required: true,
                        message: "角色ID不可为空",
                        trigger: "change"
                    }
                ]
            },
            tree: {
                data: [],
                defaultProps: {
                    children: "children",
                    label: "name"
                }
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
            }
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            list(this.param, result => {
                if (result.success) {
                    this.table.total = result.data.total;
                    this.table.data = result.data.records;
                }
            });
            getAllAuthorityTree(result => {
                if (result.success) {
                    this.tree.data = result.data;
                }
            });
        },
        edit(row) {
            getById({ id: row.id }, result => {
                if (result.success) {
                    this.form = result.data;
                    this.formDialog = true;
                }
            });
        },
        save() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    this.form.authorityIds = this.$refs.tree.getCheckedKeys();
                    modifyById(this.form, result => {
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
        },
        selectKeys(data) {
            console.log(data);
        }
    }
};
</script>

<style>
</style>