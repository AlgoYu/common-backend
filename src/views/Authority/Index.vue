<template>
    <div>
        <el-tree node-key="id" :data="tree.data" :props="tree.defaultProps" v-if='hasAuth("MANAGEMENT:SYSTEMAUTHORITY:GET")'>
            <div slot-scope="{ node, data }">
                <span>{{ data.name }}</span>
                <el-button
                    type="text"
                    size="mini"
                    v-if=' data.type != 1 && hasAuth("MANAGEMENT:SYSTEMAUTHORITY:ADD")'
                    @click="addNode(data.id)"
                >
                    增加节点
                </el-button>
            </div>
        </el-tree>
        <el-dialog
            title="添加子节点"
            :visible.sync="formDialog"
            width="30%"
            :close-on-click-modal="false"
        >
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="权限名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="父菜单ID" prop="parentId">
                    <el-input
                        v-model="form.parentId"
                        :disabled="true"
                    ></el-input>
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
                <el-form-item label="路径" prop="path">
                    <el-input
                        placeholder="请输入路径"
                        v-model="form.path"
                        clearable
                    >
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addAuthority"
                        >立即创建</el-button
                    >
                    <el-button @click="formDialog = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { tree, add } from "@/api/module/AuthorityApi.js";
export default {
    data() {
        return {
            form: {
                name: "",
                parentId: "",
                sort: "",
                description: "",
                path: ""
            },
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
                parentId: [
                    {
                        required: true,
                        message: "父节点ID不可为空",
                        trigger: "change"
                    }
                ]
            },
            param: {
                page: 1,
                size: 10,
                keyWord: ""
            },
            formDialog: false,
            tree: {
                data: [],
                defaultProps: {
                    children: "children",
                    label: "name"
                }
            }
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            tree(result => {
                if (result.success) {
                    this.tree.data = result.data;
                }
            });
        },
        addNode(id) {
            this.form.parentId = id;
            this.formDialog = true;
        },
        addAuthority() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    add(this.form, result => {
                        if (result.success) {
                            this.$message({
                                message: "添加成功",
                                type: "success"
                            });
                            this.formDialog = false;
                        } else {
                            this.$message({
                                message: result.msg,
                                type: "warning"
                            });
                        }
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
