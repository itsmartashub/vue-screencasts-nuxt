<template>
	<span class="duration">
		{{ Math.floor(duration / 60) }} : {{ duration % 60 }}
	</span>
</template>

<script>
	export default {
		props: ['duration']
	}
</script>

<style lang="scss" scoped>
// .duration { 
// 	color: #F44336;
// }
</style>