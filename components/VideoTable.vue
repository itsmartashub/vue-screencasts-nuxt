<template>
	<div>
		<v-text-field
			name="search"
			label="Search"
			v-model="search"
			single-line
			hide-details
		/>

		<v-data-table
			:items="mungedVideos"
			:headers="headers"
			sort-by="sortable_published_at"
			:sort-desc="true"
			show-expand
			@click:row="goToVideo"
			:search="search"
			:custom-filter="filter"
			:dense="dense"
			:items-per-page="itemsPerPage || 10"
		>
		<!-- //* dense difoltno ima vrednost 0 sto je false, sto nam je ok -->
		<!-- //! fillovace goToVideo sa item automatski -->
			<!-- <template #item.duration="{item, value}"> -->
			<!-- //! ovim item slotom korigujemo prikaz podataka tipa datum, duration. ovo duration je ime kolone koje zelimo da korigujemo, duration se valjda konkretno odnosi na value u headers, i onda prosledjujemo props tipa iz kog dohvatamo sa destructuring {item}. Sada hocemo da koristimo samo value, a ne i item, jer ne moramo vise sa item.duration da dohvatamo duration value tj kolonu vec mozemo odmah value -->
				<!-- {{ item.duration }} seconds -->
				<!-- <DurationDisplay :duration="item.duration" /> -->
				<!-- //! ovo item.duration je isto sto i samo value, zato umesto toga mozemo da koristimo value  -->
			<template #item.duration="{value}">
				<!-- <td @click="goToVideo(item.id)">
					<DurationDisplay :duration="value" />
				</td> -->
				<DurationDisplay :duration="value" />
			</template>


			<!-- <template #item.published_at="{item, header, value}"> -->
				<!-- {{ header }} -->
				<!-- <DateDisplay :date="item.published_at" /> -->
				<!-- //! ovo item.published_at je isto sto i samo value, zato umesto toga mozemo da koristimo value  -->
			<!-- <template #item.published_at="{value}"> -->
				<!-- {{value}} -->
				<!-- //? sort za datum bas i ne radi jer kad printujemo value vidimo da on sortira po danima u nedelji, u smislu ponedeljak, utorak, sreda... a ne po datumu (godina, mesec, dan) -->
			<template #item.sortable_published_at="{item}">
				<DateDisplay :date="item.published_at" />
			</template>


			<template #item.played="{item}">
				<div v-if="isPlayed(item.id)" class="red--text">
					<font-awesome-icon icon="check" />
				</div>
				<!-- <div v-else>
					<v-btn x-small @click="markPlayed(item.id)" color="red lighten-1" dark v-if="$auth.loggedIn">Mark Played</v-btn>
				</div> -->
			</template>


			<template #item.tags="{item}">
				<td @click.stop class="non-clickable">
					<span v-for="tag_id in item.tag_ids" :key="tag_id">
						<v-btn
							color="#00c58e"
							class="ma-1"
							dark
							x-small
							:to="`/tags/${tag_id}`"
						>{{ getTag(tag_id).name }}
						</v-btn>
					</span>
				</td>
			</template>


			<template #item.actions="{item}">
				<!-- //? ovde cemo imati listu buttona koja ce imati odredjenu f-ju: Watch | Edit | Delete -->
				<td @click.stop class="non-clickable">
					<v-btn :to="`/watch/${item.id}`" dark small color="#3b8070">Watch</v-btn>
					<v-btn :to="`/admin/videos/${item.id}/edit`" dark small color="#35495e">Edit</v-btn>
					<v-btn @click="deleteVideo(item)" dark small color="red">Delete</v-btn>
				</td>
			</template>


			<template #expanded-item="{headers, item}">
				<td :colspan="headers.length">
					<v-row>
						<v-col cols="12" md="4">
							<VideoWatch :video="item" />
						</v-col>
						<v-col cols="12" md="4">
							<h1>{{ item.name }}</h1>
							<MarkdownDisplay :markdown="item.description" />
						</v-col>
					</v-row>
				</td>
			</template>


		</v-data-table>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import DurationDisplay from '@/components/DurationDisplay'
	import DateDisplay from '@/components/DateDisplay'
	import VideoWatch from '@/components/VideoWatch'
	import MarkdownDisplay from '@/components/MarkdownDisplay'
	import _ from 'lodash'

	export default {
		name: 'VideoTable',

		// props: ['videos', 'headers', 'customClickAction', 'dense', 'itemsPerPage'], // dodajemo headers u props da setujemo drugacije podatke za home page i za admin page
		props: {
			videos: {
				type: Array,
				required: true
			},
			headers: {
				type: Array,
				required: true
			},
			customClickAction: {
				type: Function,
				required: false
			},
			dense: Boolean,
			itemsPerPage: Number
		},

		components: {
			DurationDisplay,
			DateDisplay,
			VideoWatch,
			MarkdownDisplay
		},
		data() {
			return {
				search: ''
			}
		},

		computed: {
			...mapGetters({
				isPlayed: 'user/videoIsPlayed',
				getTag: 'tags/get',
			}),
			
			mungedVideos() {
				return this.videos.map(v => {
					return {
						...v,
						sortable_published_at: v.published_at && v.published_at.toISOString()
					}
				})
			}
		},

		methods: {
			// markPlayed(videoID) {
			// 	this.$store.dispatch('user/markVideoPlayed', videoID)
			// },

			// goToVideo(videoID) { //? bez @click:row vec sa td i tu @click
			// 	this.$router.push(`/watch/${videoID}`)
			// }
			goToVideo(item) { //? sa @click:row
				//? ako prosledimo ovaj prop onda cemo pozvati taj prop, u suprotnom cemo pozvati difoltni i nazvacemo ga customClickAction
				if(this.customClickAction) { 
					this.customClickAction(item)
				} else {
					this.$router.push(`/watch/${item.id}`)
				}
			},

			filter(value, search, item) {
				// ako je true item je included, ako je false, item nije included
				let inName = RegExp(search, 'i').test(item.name) // ovo 'i' oznacava da je case insensitive

				let tagMatches = item.tag_ids.map(id => {
					let tag = this.getTag(id)
					return RegExp(search, 'i').test(tag.name)
				})
				let inTags = _.some(tagMatches)

				return inName || inTags
			},

			deleteVideo(video) {
				let response = confirm(`Are you sure you want to delete "${video.name}"?`)

				if(response) {
					this.$store.dispatch('videos/delete', video)
					this.$store.dispatch('snackbar/setSnackbar', { text: `You have successfully deleted your video, "${video.name}" ` })
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	::v-deep tbody tr {
		cursor: pointer;
	}
	::v-deep tbody tr td.non-clickable {
		cursor: auto;
	}
</style>