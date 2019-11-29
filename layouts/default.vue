<template>
  <v-app>
	  <v-app-bar app color="#00c58e">
		  <v-btn text to="/">Vue Screencasts</v-btn>
		  <v-btn text to="/videos">Videos</v-btn>
	  </v-app-bar>

	  <v-content>
			<nuxt />
	  </v-content>
  </v-app>
</template>

<script>
export default {
	// ne mozemo ovde da stavimo onaj fetch i u njemu onaj if(isInitialPageLoad) i ako je to true da se fetchuju sa apija videi i tagovi za sve childrene, jer u ovom delu fetch nije podrzan, ali jeste middleware!
	middleware: 'load-videos-and-tags'
}
</script>


<style>

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
