
export default {
	mode: 'universal',
	/*
	** Headers of the page
	*/
	head: {
	//  title: process.env.npm_package_name || '',
		title: 'Vue Screencast - Learn NuxtJS',
		meta: [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
		{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},
	/*
	** Customize the progress-bar color
	*/
	loading: { color: '#35495e' },
	/*
	** Global CSS
	*/
	css: [
	],
	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		'~plugins/vuetify-datetime-picker'
	],
	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
		'@nuxtjs/vuetify'
	],
	/*
	** Nuxt.js modules
	*/
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		'@nuxtjs/pwa',
		'@nuxtjs/auth', //? yarn add @nuxtjs/auth @nuxtjs/axios. https://auth.nuxtjs.org/guide/setup.html
		['nuxt-fontawesome', { //? yarn add nuxt-fontawesome
			imports: [
				//import whole set
				{
					set: '@fortawesome/free-solid-svg-icons', //? yarn add @fortawesome/free-solid-svg-icons
					icons: ['fas']
				},
			]
		}]
	],
	/*
	** Axios module configuration
	** See https://axios.nuxtjs.org/options
	*/
	axios: {
		// baseURL: 'http://localhost:3000/api'
		baseURL: process.env.BASE_URL || 'http://localhost:3000/api' //! kada se za heroku logs --tail pojavi error ERROR connect ECONNREFUSED 127.0.0.1:3000 onda moramo da stavimo ovo i onda da konfigurisemo za heroku BASE_URL sa: heroku config:set BASE_URL=urlServera
	},
	/*
	** Build configuration
	*/
	build: {
		/*
		** You can extend webpack config here
		*/
		extend (config, ctx) {
		},

		transpile: ['vuetify-datetime-picker'] //* jer se javlja neki error za ES6, pise u nuxt dokumentaciji za plugins
	},

	server: {
		// port: 8000 // posto se nas server vrsi na 3000 isto promenili smo port za nuxt
		port: process.env.PORT || 8000
	},

	auth: { //? https://auth.nuxtjs.org/schemes/local.html
		strategies: {
			local: {
				endpoints: {
					login: { url: '/sessions', method: 'post', propertyName: 'token' }, //! ovo prepravimo ka url naseg servera, stavljamo url za login ka nazem serveru a to bi bilo /sessions. propertyName - ono sto propertyName radi to je kada primamo podatke (data) nazad ono zove to propertyName u podacima da dobije prave podatke koje se koriste, i ono moze da se chainuje kao recimo dole za user sto stavismo za propertyName: 'data.attributes'. Dakle loginWith() metod, prvo poziva ovo login da dobije token a potom koristi taj token da pozove ovo dole user
					logout: { url: '/sessions', method: 'delete' }, //! ovo se koristi u $auth.logout()
					user: { url: '/sessions/user', method: 'get', propertyName: 'data.attributes' } //! menjamo url u /sessions/user i propertyName: 'data.attributes'. PROMENJENI NA BACKENDU FAJLOVI CONFIG/ROUTES.RB DODATA LINIJA SA GET, I APP/API/SESSION_CONTROLLERS IZMENJEN MALO
				},
				// tokenRequired: true,
				// tokenType: 'bearer'
				tokenType: ''
			}
		}
	}
}
