<template>
    <div>
        <el-button @click="clearSytemException">清空异常信息</el-button>
        <el-table :data="table.data" style="width: 100%">
            <el-table-column prop="id" label="ID" align="center">
            </el-table-column>
            <el-table-column prop="uri" label="URI" align="center">
                <template slot-scope="scope">
                    <el-link
                        type="primary"
                        :href="scope.row.uri"
                        target="_blank"
                        >{{ scope.row.uri }}</el-link
                    >
                </template>
            </el-table-column>
            <el-table-column prop="method" label="请求方法" align="center">
                <template slot-scope="scope">
                    <el-tag
                        v-if="scope.row.method === 'GET'"
                        type="success"
                        effect="dark"
                    >
                        {{ scope.row.method }}
                    </el-tag>

                    <el-tag
                        v-if="scope.row.method === 'POST'"
                        type=""
                        effect="dark"
                    >
                        {{ scope.row.method }}
                    </el-tag>

                    <el-tag
                        v-if="scope.row.method === 'PUT'"
                        type="warning"
                        effect="dark"
                    >
                        {{ scope.row.method }}
                    </el-tag>

                    <el-tag
                        v-if="scope.row.method === 'DELETE'"
                        type="danger"
                        effect="dark"
                    >
                        {{ scope.row.method }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="parameter" label="请求参数" align="center">
            </el-table-column>
            <el-table-column prop="ip" label="IP地址" align="center">
            </el-table-column>
            <el-table-column
                prop="exceptionClass"
                label="异常类"
                align="center"
            >
                <template slot-scope="scope">
                    <el-tag type="info">{{ scope.row.exceptionClass }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                prop="exceptionMessage"
                label="异常信息"
                align="center"
                :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="danger">删除</el-button>
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
    </div>
</template>

<script>
import { paging, clear } from "../../api/SystemException.js";
export default {
    data() {
        return {
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
            paging(this.param, result => {
                if (result.success) {
                    this.table.total = result.data.total;
                    this.table.data = result.data.records;
                }
            });
        },
        clearSytemException() {
            clear(result => {
                if(result.success){
                    this.$message({
                    message: "恭喜你，这是一条成功消息",
                    type: "success"
                });
                }
            });
        }
    }
};
</script>

<style>
</style>
