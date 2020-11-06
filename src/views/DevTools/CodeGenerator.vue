<template>
    <div>
        <el-table :data="table.data" style="width: 100%">
            <el-table-column prop="tableName" label="表名" align="center">
            </el-table-column>
            <el-table-column prop="engine" label="表引擎" align="center">
            </el-table-column>
            <el-table-column prop="tableComment" label="表注释" align="center">
            </el-table-column>
            <el-table-column prop="createTime" label="创建日期" align="center">
            </el-table-column>
        </el-table>
        <el-pagination
            layout="prev, pager, next"
            :total="table.total"
            style="text-align: center;"
        >
        </el-pagination>
    </div>
</template>

<script>
import { list } from "../../api/CodeGenerator.js";
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
            list(this.param, result => {
                console.log(result);
                if (result.success) {
                    this.table.total = result.data.total;
                    this.table.data = result.data.records;
                }
            });
        }
    }
};
</script>

<style>
</style>
