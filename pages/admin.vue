<template>
<!-- //? **************** /admin **************** -->
	<v-container>
		<v-tabs color="#00c58e">
			<v-tab to="/admin/videos">Videos</v-tab>
			<v-tab to="/admin/tags">Tags</v-tab>
		</v-tabs>
		<!-- //* ne vidimo childrene ove /admin rute-komponente, zato nam treba router-view koji ce prikazati sve childrene, dakle /admin/tags, /admin/videos, /admin/videos/new, /admin/videos/88, /admin/videos/88/edit -->
		<router-view></router-view>
	</v-container>
</template>

<script>
export default {
	name: 'Admin'
}
</script>