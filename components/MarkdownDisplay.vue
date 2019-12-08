<template>
	<div v-html="processedMarkdown"></div>
</template>

<script>
	import marked from 'marked' //? yarn add marked
	import highlight from 'highlight.js' //? yarn add highlight.js
	import 'highlight.js/styles/solarized-dark.css'

	export default {
		name: 'MarkdownDisplay',

		// props: ['markdown'],
		props: {
			markdown: String
		},

		computed: {
			processedMarkdown() {
				if(this.markdown) {
					return marked(this.markdown, {
						highlight(md) {
							return highlight.highlightAuto(md).value
						}
					})
				}
				
			}
		}
	}
</script>

<style scoped>
::v-deep code:before {
	content: "" !important;
}
</style>