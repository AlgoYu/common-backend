<template>
    <div>
        <div v-auth="'GENERATOR:GET'">
            <el-table :data="table.data" style="width: 100%">
                <el-table-column prop="tableName" label="表名" align="center">
                </el-table-column>
                <el-table-column prop="engine" label="表引擎" align="center">
                </el-table-column>
                <el-table-column
                    prop="tableComment"
                    label="表注释"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建日期"
                    align="center"
                >
                </el-table-column>
                <el-table-column prop="operate" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            @click="showDialog(scope.row)"
                            v-auth="'GENERATOR:GENERATE'"
                            >生成代码</el-button
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
        </div>
        <el-dialog
            title="代码生成"
            :visible.sync="formDialog"
            width="30%"
            :close-on-click-modal="false"
        >
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="表名" prop="tableName">
                    <el-input
                        v-model="form.tableName"
                        :disabled="true"
                    ></el-input>
                </el-form-item>
                <el-form-item label="模块名称" prop="moduleName">
                    <el-input v-model="form.moduleName"></el-input>
                </el-form-item>
                <el-form-item label="包名" prop="packageName">
                    <el-input
                        v-model="form.packageName"
                        placeholder="不填默认为cn.machine.geek"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="generate">生成</el-button>
                    <el-button @click="formDialog = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import CodeGeneratorAPI from "@/api/module/CodeGeneratorAPI.js";
export default {
    data() {
        return {
            param: {
                page: 1,
                size: 10,
                keyWord: "",
            },
            table: {
                total: 0,
                data: [],
            },
            form: {
                tableName: "",
                moduleName: "",
                packageName: "",
            },
            rules: {
                tableName: [
                    {
                        required: true,
                        message: "表名不能为空",
                        trigger: "blur",
                    },
                ],
                moduleName: [
                    {
                        required: true,
                        message: "模块名不能为空",
                        trigger: "blur",
                    },
                ],
            },
            formDialog: false,
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            CodeGeneratorAPI.paging(this.param, (result) => {
                console.log(result);
                if (result.success) {
                    this.table.total = parseInt(result.data.total);
                    this.table.data = result.data.records;
                }
            });
        },
        showDialog(row) {
            this.form.tableName = row.tableName;
            this.formDialog = true;
        },
        generate() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    this.axios
                        .get("/generator/generate", {
                            params: this.form,
                            responseType: "blob",
                            headers: {
                                Token: this.$store.state.accessToken,
                            },
                        })
                        .then((res) => {
                            if (!res.data) {
                                return;
                            }
                            let url = window.URL.createObjectURL(
                                new Blob([res.data])
                            );
                            let link = document.createElement("a");
                            link.style.display = "none";
                            link.href = url;
                            link.setAttribute("download", "code.zip");

                            document.body.appendChild(link);
                            link.click();
                            this.formDialog = {
                                tableName: "",
                                moduleName: "",
                                packageName: "",
                            };
                            this.formDialog = false;
                        })
                        .catch((err) => {
                            console.log(err);
                        });
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
