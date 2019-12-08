<template>
	<small class="publishedOn">
		<DurationDisplay :duration="video.duration" />
		&nbsp; | &nbsp; 
		<span v-if="publishedAt">
			Published on {{ publishedAt.getMonth() +1 }}/{{ publishedAt.getDate() }}/{{ publishedAt.getFullYear() }}
		</span>
		<span v-else>This video is not yet published</span>
	</small>
</template>

<script>
	import DurationDisplay from "@/components/DurationDisplay"

	export default {
		name: 'VideoByline',

		components: { DurationDisplay },

		props: ['video'],

		computed: {
			publishedAt() {
				// return new Date()
				if(this.video.publishedAt) {
					return this.video.published_at
				} else {
					return false
				}
			},
		}
	}
</script>

<style>
	.publishedOn {
		color: #3b8070; /* 3b8070 */
		margin: 3px 0 3px 2px;
	}
	small {
		font-size: 15px;
	}
</style>