<template>
<!-- //? **************** /admin/tags **************** -->
	<v-container grid-list-xs>
		<div class="flex-table">
			<div>Name</div>
			<div># videos</div>
			<div></div>
		</div>

		<div v-for="tag in tags" :key="tag.id" class="flex-table">
			<div>
				<div v-if="tagEditingId == tag.id">
					<v-text-field v-model="tag.name"
									:id="`tag-edit-${tag.id}`"
									@blur="updateTagName(tag)"
									@keydown.enter="updateTagName(tag)" />
				</div>
				<div v-else @click="setToEditing(tag)">
					{{tag.name}}
				</div>
			</div>

			<div>
				<router-link :to="`/tags/${tag.id}`">
					{{tag.video_ids.length}}
				</router-link>
			</div>

			<div class="actions">
				<v-btn x-small dark @click="setToEditing(tag)" color="#2f495e">Edit</v-btn>
				<v-btn x-small dark @click="deleteTag(tag)" color="red">Delete</v-btn>
			</div>
		</div>

		<div v-if="!isEditingNewTag">
			<v-btn @click="startNewTag()" color="#00c58e" dark>Add Tag</v-btn>
		</div>
		<div v-else>
			<v-text-field v-model="newTagName"
								:id="`new-tag-name`"
								@blur="createTag()"
								@keydown.enter="createTag()"/>
		</div>
	</v-container>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		data() {
			return {
				tagEditingId: '', // mogli smo isEditing, medjuttim ovde ima mnogo tagova, a ne zelimo da se odjednom svi edituju, vec cemo ih birati po id-u
				isEditingNewTag: false,
				newTagName: '',
			}
		},
		computed: {
			...mapState({
				tags: state => state.tags.tags
			})
		},
		
		methods: {
			setToEditing(tag) {
				this.tagEditingId = tag.id
				// document.getElementById(`tag-edit-${tag.id}`).focus() //! ovo je null, jer vue nema vremena da apply ovu vrednost za this.tagEditingId = tag.id i onda ovaj focus() vec nam treba ovo u nextTick()
				this.$nextTick(() => {
					document.getElementById(`tag-edit-${tag.id}`).focus()
				})
			},
			updateTagName(tag) {
				this.$store.dispatch('tags/updateName', {tag})
				this.tagEditingId = ''
			},
			deleteTag(tag) {
				let confirmed = confirm(`Are you sure you want to delete tag ${tag.name}? It is connected to ${tag.video_ids.length} videos.`)

				if(confirmed){
					this.$store.dispatch('tags/delete', {tag});
				}
			},
			startNewTag(){
				this.isEditingNewTag = true
				this.$nextTick(() => {
					document.getElementById('new-tag-name').focus()
				})
			},
			createTag(){
				if(this.newTagName.length > 0) {
					this.$store.dispatch('tags/create', {name: this.newTagName})
					this.newTagName = ''
				}
				this.isEditingNewTag = false
			}
		}
	}
</script>

<style scoped>
.flex-table {
	display: grid;
	grid-template-columns: repeat(auto-fill, 33%);
	padding: 10px;
	/* border-bottom: 1px solid silver; */
}

.flex-table:nth-of-type(2n) {
	background-color: #dedede;
}

.actions * {
	margin: 0 5px;
}
</style>