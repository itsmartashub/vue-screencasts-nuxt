<template>
<!-- //? **************** /admin/videos/8 **************** -->
	<v-container grid-list-xs>
		<div class="display-1 pt-3">{{video.name}}</div>
		
		<VideoByline :video="video" />

		<!-- <div v-html="video.description"></div> -->
		<!-- <div v-html="markdownDescription"></div> -->
		<MarkdownDisplay :markdown="video.description" />

		<h3>Code Summary</h3>
		<!-- <div v-html="markdownCodeSummary"></div> -->
		<MarkdownDisplay :markdown="video.code_summary" />


		<v-combobox :items="tags" 
							item-text="name" 
							v-model="videoTags" 
							multiple
							chips
							deletable-chips
							hide-selected
							return-object>
		</v-combobox>

		<v-btn :to="`/admin/videos/${video.id}/edit`" color="#35495e" dark>Edit</v-btn>

		<v-btn :to="`/watch/${video.id}`" color="#3b8070" dark>Watch</v-btn>
	</v-container>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'
	import _ from 'lodash'
	// import marked from 'marked' //? yarn add marked
	import VideoByline from '@/components/VideoByline'
	import MarkdownDisplay from '@/components/MarkdownDisplay'
	

  export default {
	  	name: 'AdminVideoShow',
		components: { VideoByline, MarkdownDisplay },

		computed: {
			...mapState({
				videos: state => state.videos.videos,
				tags: state => state.tags.tags
			}),
			...mapGetters({
				getTag: 'tags/get'
			}),

			video(){
				return this.videos.find(v => v.id == this.$route.params.id) || {}
			},

			// markdownDescription() {
			// 	if(this.video.description) {
			// 		return marked(this.video.description)
			// 	}
			// },
			// markdownCodeSummary() {
			// 	if (this.video.code_summary) {
			// 		return marked(this.video.code_summary)
			// 	}
			// },

			videoTags: {
				get(){
					let tagIds = this.video.tag_ids
					return tagIds && tagIds.map(id => this.getTag(id))
				},
				async set(newTags) {
					let createdTag = newTags.find(t => typeof t == 'string')

					if(createdTag){
						createdTag = await this.$store.dispatch('tags/create', {name: createdTag})

						console.log(newTags)// vide se stringovi u nizu, dok su vec postojeci tagovi objekti, ti stringovi su novokreirani

						this.$store.dispatch('tags/connectToVideo', {tag: createdTag, video: this.video})

					} else {
						let addedTags = _.differenceBy(newTags, this.videoTags, 'id') //? prvi argument bigger, drugi je smaller, a treci property po kom poredimo prva dva 
						let removedTags = _.differenceBy(this.videoTags, newTags, 'id') //? u ovom slucaju pcekujemo da videoTags bude veci od newTags
						
						if(addedTags.length > 0) {
							this.$store.dispatch('tags/connectToVideo', {tag: addedTags[0], video: this.video})
						}
						if(removedTags.length > 0) {
							this.$store.dispatch('tags/disconnectFromVideo', {tag: removedTags[0], video: this.video})
						}
					}
				}
			}
		},

	}
</script>

<style >
	/* .title-color {
		color: #35495e !important;
	} */
</style>