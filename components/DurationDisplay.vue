<template>
	<span class="duration">
		{{ minutes }}:{{ seconds }}
		<!-- {{ Math.floor(video.duration / 60) }} : {{ video.duration % 60 }} -->
		<!-- Math.floor(video.duration / 60) BROJ MINUTA?. video.duration % 60 je BROJ SEKUNDI -->
	</span>
</template>

<script>
	export default {
		props: ['duration'],

			computed: {
				minutes() {
					return Math.floor(this.duration / 60)
				},
				seconds() {
					let seconds = this.duration % 60
					let isSingleDigit = seconds.toString().length == 1

					if (isSingleDigit) {
						seconds = `0${seconds}`
					}

					return seconds
				}
			},
	}
</script>

<style lang="scss" scoped>
// .duration { 
// 	color: #F44336;
// }
</style>