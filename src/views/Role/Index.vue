<template>
    <div>
        <div style="margin-top: 10px; margin-bottom: 10px">
            <el-row>
                <el-col :span="10">
                    <el-button type="primary" @click="add">增加</el-button>
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
        <el-table :data="table.data" style="width: 100%" v-loading="load">
            <el-table-column prop="id" label="ID" align="center">
            </el-table-column>
            <el-table-column prop="name" label="角色名" align="center">
            </el-table-column>
            <el-table-column prop="key" label="权限字符" align="center">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center">
            </el-table-column>
            <el-table-column prop="updateTime" label="更新时间" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="info" @click="edit(scope.row)"
                        >编辑</el-button
                    >
                    <el-button type="danger" @click="remove(scope.row)"
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
        <!-- 表单 -->
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
                <el-form-item label="角色字符" prop="key">
                    <el-input v-model="form.key"></el-input>
                </el-form-item>
                <el-form-item label="权限">
                    <el-tree
                        show-checkbox
                        accordion
                        ref="tree"
                        node-key="id"
                        :default-checked-keys="form.authorityIds"
                        :data="tree.data"
                        :props="tree.defaultProps"
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
import AuthorityApi from "@/api/module/AuthorityApi.js";
export default {
    data() {
        return {
            load: true,
            statu: "",
            form: {
                id: "",
                name: "",
                key: "",
                authorityIds: [],
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
                key: [
                    {
                        required: true,
                        message: "角色字符不可为空",
                        trigger: "change",
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
                    children: "child",
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
            AuthorityApi.tree((result) => {
                if (result.success) {
                    this.tree.data = result.data;
                }
            });
        },
        getPage() {
            this.load = true;
            RoleApi.paging(this.param, (result) => {
                if (result.success) {
                    this.table.total = parseInt(result.data.total);
                    this.table.data = result.data.records;
                }
                this.load = false;
            });
        },
        remove(row) {
            this.$confirm("确认删除这条数据吗?", "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    RoleApi.deleteById(
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
        edit(row) {
            this.statu = "edit";
            RoleApi.getWithAuthorityById({ id: row.id }, (result) => {
                if (result.success) {
                    this.form = {
                        id: result.data.role.id,
                        name: result.data.role.name,
                        key: result.data.role.key,
                        authorityIds: [],
                    };
                    let ids = [];
                    result.data.authorities.forEach((authority)=>{
                        ids.push(authority.id);
                    });
                    this.form.authorityIds = ids;
                    this.formDialog = true;
                    this.$refs.tree.setCheckedKeys([])
                }
            });
        },
        add() {
            this.statu = "add";
            (this.form = {
                id: "",
                name: "",
                key: "",
                authorityIds: [],
            }),
                (this.formDialog = true);
        },
        save() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    this.form.authorityIds = this.$refs.tree.getCheckedKeys();
                    switch (this.statu) {
                        case "add":
                            RoleApi.addWithAuthority(this.form, (result) => {
                                console.log(result);
                                if (result.success) {
                                    this.$message({
                                        message: "添加成功!",
                                        type: "success",
                                    });
                                    this.getPage();
                                } else {
                                    this.$message({
                                        message: "添加失败！",
                                        type: "warning",
                                    });
                                }
                            });
                            break;
                        case "edit":
                            RoleApi.modifyWithAuthorityById(this.form, (result) => {
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
    },
};
</script>

<style>
</style>