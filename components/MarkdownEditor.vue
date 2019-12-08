<template>
	<v-row class="editor mb-8">
		<v-col cols="12" sm="6">
			<slot></slot>
			<!-- //! gde god je <slot></slot> tu ce biti ono sto se nalazi izmedju otvarajuceg i zatvarajuceg taga MarkdownEditor u komponenti u kojoj se koristi -->
		</v-col>

		<v-col cols="12" sm="6">
			<MarkdownDisplay :markdown="markdown" />
		</v-col>

		<v-col cols="12" class="footer">
			<!-- {{ footerMessage || 'Input some data' }} -->
			<!-- <slot name="footer" v-bind:number="5">Please input data</slot> -->
			<!-- <slot name="footer" v-bind:square="number * number" v-bind:double="number * 2">Please input data</slot> -->
			<!-- //! ovo izmedju <slot>Please input data</slot> je difoltna vrednost, takoreci placeholder -->
			<slot name="footer">Please input data</slot>
		</v-col>
	</v-row>
</template>

<script>
	import MarkdownDisplay from '@/components/MarkdownDisplay'

	export default {
		name: 'MarkdownEditor',

		// props: ['markdown', 'footerMessage'],
		// props: ['markdown', 'number'],
		// props: ['markdown'],
		props: {
			markdown: String
		},

		components: {
			MarkdownDisplay,
		},
	}
</script>

<style scoped>
  .footer {
    background-color: #35495e;
    padding:5px;
    border-radius: 3px;
  }
  .editor {
    /* border: 1px solid #35495e; */
	 box-shadow: 0px 3px 8px -1px #35495e;
    border-radius: 4px;
    margin: 10px 0;
	 color: white;
  }
</style>