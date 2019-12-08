<template>
	<span v-if="date">
		{{ date.getMonth() +1 }}/{{ date.getDate() }}/{{ date.getFullYear() }}
	</span>
</template>

<script>
	export default {
		name: 'DateDisplay',
		props: ['date']
		
	}
</script>

<style lang="scss" scoped>

</style>