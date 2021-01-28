<template>
    <div>
        <div v-auth="'ACCOUNT:GET'">
            <!-- 顶部菜单 -->
            <div style="margin-top: 10px; margin-bottom: 10px">
                <el-row>
                    <el-col :span="10">
                        <el-button type="primary" @click="add" v-auth="'ACCOUNT:ADD'">增加</el-button>
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
            <!-- 表格 -->
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
                        <span style="margin-left: 10px">{{
                            scope.row.date
                        }}</span>
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
                        <el-tag v-else type="danger" effect="dark">
                            禁用
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="修改时间"
                    align="center"
                >
                </el-table-column>
                <el-table-column label="操作" align="center" min-width="150px">
                    <template slot-scope="scope">
                        <el-button type="info" @click="edit(scope.row)" v-auth="'ACCOUNT:MODIFY'"
                            >编辑</el-button
                        >
                        <el-button type="danger" @click="remove(scope.row)" v-auth="'ACCOUNT:DELETE'"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                layout="prev, pager, next"
                :total="table.total"
                style="text-align: center"
                v-if="table.data.length > 0"
            >
            </el-pagination>
        </div>
        <!-- 表单 -->
        <el-dialog
            title="角色"
            :visible.sync="formDialog"
            width="600px"
            :close-on-click-modal="false"
        >
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="id" prop="parentId" v-if="statu == 'edit'">
                    <el-tag v-if="statu == 'edit'" type="" effect="plain">
                        {{ form.id }}
                    </el-tag>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-tag v-if="statu == 'edit'" type="" effect="plain">
                        {{ form.name }}
                    </el-tag>
                    <el-input
                        v-else
                        v-model="form.name"
                        :disabled="statu == 'edit'"
                    ></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="form.mobile"></el-input>
                </el-form-item>
                <el-form-item
                    label="密码"
                    prop="password"
                    v-if="statu == 'add'"
                >
                    <el-input
                        type="password"
                        v-model="form.password"
                    ></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="enable">
                    <el-switch
                        v-model="form.enable"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    >
                    </el-switch>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select
                        v-model="form.roleIds"
                        multiple
                        placeholder="请选择"
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
                name: "",
                mobile: "",
                password: "",
                email: "",
                enable: false,
                roleIds: [],
            },
            rules: {
                mobile: [
                    {
                        required: true,
                        message: "手机号码不可为空",
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
                email: [
                    {
                        required: true,
                        message: "邮箱不可为空",
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
        // 初始化角色数据
        init() {
            this.getPage();
            RoleApi.list((result) => {
                console.log(result.data);
                if (result.success) {
                    this.selector.data = result.data;
                    console.log(result.data);
                }
            });
        },
        // 编辑账户
        edit(row) {
            this.statu = "edit";
            AccountApi.getWithRoleById({ id: row.id }, (result) => {
                if (result.success) {
                    this.form = {
                        id: result.data.account.id,
                        name: result.data.account.name,
                        mobile: result.data.account.mobile,
                        email: result.data.account.email,
                        enable: result.data.account.enable,
                        roleIds: [],
                    };
                    let ids = [];
                    result.data.roles.forEach((role) => {
                        ids.push(role.id);
                    });
                    this.form.roleIds = ids;
                    this.formDialog = true;
                }
            });
        },
        remove(row) {
            this.$confirm("确认删除这条数据吗?", "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    AccountApi.deleteById(
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
        // 增加账户
        add() {
            this.statu = "add";
            (this.form = {
                id: "",
                name: "",
                mobile: "",
                password: "",
                email: "",
                enable: false,
                roleIds: [],
            }),
                (this.formDialog = true);
        },
        // 获取分页
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
        // 保存操作
        save() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    switch (this.statu) {
                        case "add":
                            this.load = true;
                            let temp = this.form;
                            temp.password = md5(temp.password);
                            AccountApi.addWithRole(temp, (result) => {
                                console.log(result);
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
                            AccountApi.modifyWithRoleById(
                                this.form,
                                (result) => {
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
                                }
                            );
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
