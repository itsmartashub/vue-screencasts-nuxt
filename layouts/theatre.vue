<template>
	<div>
		<!-- recimo ako hocu da ovo bude login/registration page koja nema header, footer i sl, ovde pravim, pa onda napravim u pages rutu i stavim za layout: 'imeOvogLayouta' ime layouta koji hocu da bude prikazan -->
		<div id="theatre-body">
			<nuxt/>
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style>
#theatre-body {
	background-color: black;
	color: white;
}
</style>