<template>
    <div>
        <div style="margin-top: 10px; margin-bottom: 10px">
            <el-row>
                <el-col :span="10">
                    <el-button
                        type="primary"
                        @click="addData"
                        >增加</el-button
                    >
                </el-col>
                <el-col :span="4" :offset="10">
                    <el-input
                        v-model="form.keyWord"
                        placeholder="按关键字搜索内容"
                        suffix-icon="el-icon-search"
                    ></el-input>
                </el-col>
            </el-row>
        </div>
        <el-table
            :data="table.data"
            style="width: 100%"
            v-loading="load"
        >
            <el-table-column prop="id" label="ID" align="center">
            </el-table-column>
            <el-table-column prop="name" label="角色名" align="center">
            </el-table-column>
            <el-table-column prop="key" label="权限字符" align="center">
            </el-table-column>
            <el-table-column prop="description" label="描述" align="center">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center">
            </el-table-column>
            <el-table-column prop="updateTime" label="更新时间" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                        type="info"
                        @click="edit(scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        type="danger"
                        @click="deleteData(scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            layout="prev, pager, next"
            :total="table.total"
            style="text-align: center"
        >
        </el-pagination>
        <el-dialog
            title="角色"
            :visible.sync="formDialog"
            width="30%"
            :close-on-click-modal="false"
        >
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item
                    label="角色ID"
                    prop="parentId"
                    v-if="statu == 'edit'"
                >
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
                        :default-checked-keys="form.systemAuthorityIds"
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
import RoleApi from "@/api/module/RoleApi.js";
import { tree, add } from "@/api/module/AuthorityApi.js";
export default {
    data() {
        return {
            load: true,
            statu: "",
            form: {
                id: "",
                name: "",
                description: "",
                systemAuthorityIds: [],
            },
            selects: [],
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入权限名称",
                        trigger: "blur",
                    },
                    {
                        min: 2,
                        max: 10,
                        message: "长度在 2 到 10 个字符",
                        trigger: "blur",
                    },
                ],
                id: [
                    {
                        required: true,
                        message: "角色ID不可为空",
                        trigger: "change",
                    },
                ],
            },
            tree: {
                data: [],
                defaultProps: {
                    children: "children",
                    label: "name",
                },
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
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getPage();
            tree((result) => {
                if (result.success) {
                    this.tree.data = result.data;
                }
            });
        },
        getPage() {
            RoleApi.paging(this.param, (result) => {
                if (result.success) {
                    this.table.total = result.data.total;
                    this.table.data = result.data.records;
                    this.load = false;
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
                    deleteById({
                        id: row.id
                    },(result)=>{
                        if(result.success){
                            this.$message({
                                message: "删除成功!",
                                type: "success",
                            });
                            this.getPage();
                        }
                    });
                })
                .catch(() => {});
        },
        edit(row) {
            this.statu = "edit";
            getWithAuthorityById({ id: row.id }, (result) => {
                if (result.success) {
                    this.form = result.data;
                    this.formDialog = true;
                }
            });
        },
        addData() {
            this.statu = "add";
            this.form = {
                id: "",
                name: "",
                description: "",
                systemAuthorityIds: [],
            };
            this.formDialog = true;
        },
        save() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    this.form.systemAuthorityIds = this.$refs.tree.getCheckedKeys();
                    switch (this.statu) {
                        case "add":
                            addWithAuthority(this.form, (result) => {
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
                            });
                            break;
                        case "edit":
                            modifyWithAuthorityById(this.form, (result) => {
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
        selectKeys(data) {
            console.log(data);
        },
    },
};
</script>

<style>
</style>