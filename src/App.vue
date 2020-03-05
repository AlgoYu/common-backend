<template>
	<div id="app">
		<Container></Container>
	</div>
</template>

<script>
	import Container from './views/Container.vue'

	export default {
		name: 'App',
		components: {
			Container
		}
	}
</script>

<style lang="scss">
	html,
	body,
	#app {
		height: 100%;
		margin: 0;
		padding: 0;
	}
</style>
