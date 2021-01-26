<template>
    <div>
        <el-table
            :data="table.data"
            style="width: 100%; margin-bottom: 20px"
            row-key="id"
            :tree-props="{ children: 'child',hasChildren: 'hasChildren'}"
        >
            <el-table-column prop="id" label="ID" align="center">
            </el-table-column>
            <el-table-column prop="name" label="权限名" align="center">
            </el-table-column>
            <el-table-column prop="key" label="权限字符" align="center">
            </el-table-column>
            <el-table-column prop="sort" label="排序" align="center">
            </el-table-column>
            <el-table-column prop="uri" label="组件" align="center">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import AuthorityApi from "@/api/module/AuthorityApi.js";
export default {
    data() {
        return {
            table: {
                data: [],
            },
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            AuthorityApi.tree((result) => {
                if (result.success) {
                    this.table.data = result.data;
                }
            });
        }
    },
};
</script>

<style>
</style>
