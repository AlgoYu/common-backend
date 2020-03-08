<template>
	<div>
		<el-card class="box-card">
			<div class="amap-box">
				<el-amap :plugin="plugin" :zoom="zoom" :center="center" class="amap-box" :vid="'amap-vue'">
					<el-amap-marker vid="component-marker" :position="componentMarker.position"></el-amap-marker>
				</el-amap>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		name: 'Map',
		data() {
			return {
				zoom: 19,
				//plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor'],
				center: [106.212443, 28.318501],
				componentMarker: {
					position: [106.212443, 28.318501]
				}
			}
		}
	}
</script>

<style>
	.amap-box {
		height: 500px;
	}
</style>
