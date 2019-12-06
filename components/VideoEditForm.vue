<template>
	<v-form v-model="valid">
		<v-text-field 
			v-model="video.name"
			label="Name"
			counter=50
			:rules="[required('name'), minLength('name', 5), maxLength('name', 50)]"
		/>

		<v-row>
			<v-col cols="12" sm="6">
				<v-textarea 
					v-model="video.description"
					label="Description"
					:rules="[required('description')]"
					counter=true
					rows="9"
				/>
			</v-col>

			<v-col cols="12" sm="6">
				<MarkdownDisplay :markdown="video.description" />
			</v-col>
		</v-row>


		<v-row>
			<v-col cols="12" sm="6">
				<v-textarea
					v-model="video.code_summary"
					label="Code Summary"
					rows="12"
				/>
			</v-col>

			<v-col cols="12" sm="6">
				<MarkdownDisplay :markdown="video.code_summary" />
			</v-col>
		</v-row>


		<v-text-field 
			v-model="video.duration"
			label="Duration (in seconds)"
		/>
		<!-- {{ Math.floor(video.duration / 60) }} : {{ video.duration % 60 }} -->
		<!-- Math.floor(video.duration / 60) BROJ MINUTA?. video.duration % 60 je BROJ SEKUNDI -->
		<DurationDisplay :duration="video.duration" />

		<v-text-field
			v-model="video.videoUrl" 
			label="Video URL" 
			hint="If you want our friends in China to be able to watch this, please use Amazon S3 or similar instead of Youtube and Vimeo." 
			:rules="[required('video URL')]"
		/>

		<v-text-field
			v-model="video.thumbnail"
			label="Thumbnail URL"
			:rules="[required('thumbnail URL')]"
		/>

		<v-datetime-picker label="Select Datetime" v-model="video.published_at"></v-datetime-picker>

		<v-btn @click="saveVideo" :disabled="!valid" color="#00c58e" class="white--text">{{ buttonText }}</v-btn>
	</v-form>
</template>

<script>
import validations from '@/utils/validations'
import DurationDisplay from '@/components/DurationDisplay'
import MarkdownDisplay from '@/components/MarkdownDisplay'

export default {
	name: 'VideoEditForm',
	components: { DurationDisplay, MarkdownDisplay },

	props: ['video', 'saveVideo', 'buttonText'],
	
	data() {
		return {
			valid: false,
			...validations
		}
	},
}
</script>