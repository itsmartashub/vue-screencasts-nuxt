import RSVP from 'rsvp' // yarn add rsvp


export default async function({store, from}) { // ovo from nam kazuje koja je ruta s koje dolazimo
	// console.log(from)
	let isInitialPageLoad = !from
	// console.log(isInitialPageLoad) // ovo je ugl false

	if(isInitialPageLoad) { // sad se mnoooogo brze ucitava sve, tj valjda se koristi vec uctiano kada koristimo iste pdoatke, ne razumem, dakle ako page s koje dolazimo na ovu komponentu nije insta kao ova, onda ucitavamo opet videe i tagove ili sta

		await RSVP.all([ //! neko je u komentarima rekao da je dodavanje ovog bespotrebna kad postoji vec Promise.all
			store.dispatch('loadAllVideos'),
			store.dispatch('loadAllTags')
		])

		// await Promise.all([ //! neko je u komentarima rekao da je dodavanje ovog bespotrebna kad postoji vec Promise.all
		// 	store.dispatch('loadAllVideos'),
		// 	store.dispatch('loadAllTags')
		// ])
	}
}