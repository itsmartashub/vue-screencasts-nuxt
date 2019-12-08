<template>
	<v-row class="editor">
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
		props: ['markdown'],

		components: {
			MarkdownDisplay,
		},
	}
</script>

<style scoped>
  .footer {
    background-color: #BBB;
    padding:5px;
    border-radius: 3px;
  }
  .editor {
    border: 1px solid black;
    border-radius: 4px;
    margin: 10px 0;
  }
</style>