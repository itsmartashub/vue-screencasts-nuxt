<template>
	<span v-if="date">
		{{ date.getMonth() +1 }}/{{ date.getDate() }}/{{ date.getFullYear() }}
	</span>
</template>

<script>
	export default {
		name: 'DateDisplay',
		// props: ['date']
		props: {
			date: Date
		}
		
	}
</script>

<style lang="scss" scoped>

</style>