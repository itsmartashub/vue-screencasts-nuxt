<template>
	<v-form v-model="valid">
		<v-text-field 
			v-model="video.name"
			label="Name"
			counter=50
			:rules="[required('name'), minLength('name', 5), maxLength('name', 50)]"
		/>

		<v-text-field 
			v-model="video.duration"
			label="Duration (in seconds)"
		>
			<template #prepend>
				<span class="duration-display">
					<DurationDisplay :duration="video.duration" />
				</span>
			</template>
		</v-text-field>
		
		<v-row>
			<v-col cols="12" sm="9" md="10">
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
			</v-col>
			<v-col cols="12" sm="3" md="2">
				<VideoWatch :video="video" />
			</v-col>
		</v-row>

		

		<v-datetime-picker label="Select Datetime" v-model="video.published_at"></v-datetime-picker>

<!-- 
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
		</v-row> -->
		<MarkdownEditor :markdown="video.description">
			<v-textarea
				v-model="video.description"
				label="Description"
				counter=true
				rows="9"
				:rules="[required('description'), minLength('description', 20)]"
			/>
			<!-- //! sve ovo izmedju otvarajuceg i zatvarajuceg MarkdownEditor taga ce ici na mesto <slot></slot> -->
		</MarkdownEditor>

		<!-- <MarkdownEditor :markdown="video.code_summary" footerMessage="Please put in some code"> -->
		<!-- <MarkdownEditor :markdown="video.code_summary" number="5"> -->
		<MarkdownEditor :markdown="video.code_summary">
			<template #default>
				<v-textarea
					v-model="video.code_summary"
					label="Code Summary"
					rows="12"
				/>
			</template>
			<!-- //! sve ovo izmedju otvarajuceg i zatvarajuceg MarkdownEditor taga ce ici na mesto <slot></slot>. Elem, sve sto je izmedju MarkdownEditor, a da nije imenovan slot )kao recimo footer) jeste default slot, pa tako sve i da nismo stavili ovo default, ono se podrzumeva da je difolt, ali kad naznacimo ovako sa template #default onda mozemo da koristimo scopedSlots
			-->
			<!-- //! SCOPED SLOTS - dakle odavde mozemo da saljemo childrenima neke podatke tj sve ono sto se nalazi u MarkdownEditor-u, ali isto tako odande mozemo ovde da posaljemo neki podatak preko scopedSlots. Recimo u childrenu tamo u footer stavimo v-bind:number="5", a potom ovde dole u #footer slot stavimo scopedProps i preko scopedProps dohvatamo number
			-->
			<!--<template #footer="scopedProps">--> <!-- //! skracenica za v-slot je # -->
				<!-- <h1>Hey {{ scopedProps.number }}</h1> -->
				<!-- <h1>Hey {{ scopedProps.double }} {{ scopedProps.square }}</h1> -->
				<!-- //? DESTRUCTURING scopedProps -->
			<!-- <template #footer="{double, square}">
				<h1>Hey {{ double }} {{ square }}</h1> 
				Put in some <strong>code</strong>
			</template> -->
			<template #footer>
				This code will be displayed below the video.
			</template>
		</MarkdownEditor>

		<v-btn @click="saveVideo" :disabled="!valid" color="#00c58e" class="white--text">{{ buttonText }}</v-btn>
	</v-form>
</template>

<script>
import validations from '@/utils/validations'
import DurationDisplay from '@/components/DurationDisplay'
import MarkdownDisplay from '@/components/MarkdownDisplay'
import MarkdownEditor from '@/components/MarkdownEditor'
import VideoWatch from '@/components/VideoWatch'

export default {
	name: 'VideoEditForm',
	components: {
		DurationDisplay,
		MarkdownDisplay,
		MarkdownEditor,
		VideoWatch
	},

	props: ['video', 'saveVideo', 'buttonText'],
	
	data() {
		return {
			valid: false,
			...validations
		}
	},
}
</script>

<style>
	.duration-display {
		background: #35495e;
		color: #e2e2e2;
		border-radius: 5px;
		padding: 7px;
		font-size: 15px;
	}
</style>