<template>
    <el-tree show-checkbox node-key="id" :data="tree.data" :props="tree.defaultProps"></el-tree>
</template>

<script>
import {getAllAuthorityTree} from '@/api/SystemAuthorityApi.js'
export default {
		data() {
			return {
				form: {

				},
				param: {
					page: 1,
					size: 10,
					keyWord: ''
				},
				tree: {
                    data: [],
                    defaultProps: {
                        children: 'children',
                        label: 'name'
                    }
                }
			}
		},
		created() {
			this.init();
		},
		methods: {
			init() {
				getAllAuthorityTree((result)=>{
					if (result.success) {
                        this.tree.data = result.data;
					}
				})
            }
		}
	}
</script>

<style>
</style>
