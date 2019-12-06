export const getData = async function(url, axios) { // gore za store things imamo pristup $axiosu preko this, ali ovde ne, zato moramo proslediti kao argument
	let response = await axios.get(url)
	return {
		data: response.data.data,
		included: response.data.included
	}
}

export const deserializeVideos = function(videos) {
	videos.forEach(v => { // nasi videi nemaju id otud ovo
		v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id) // dodajemo property tags_ids u videos (tacnije videos.attributes) koji se nalaze na odredjenim tagovima
		// v.attributes.published_at = new Date(v.attributes.published_at) //! Invalid time value error se javljala nakon dodavanja pluginsta, jer je vreme tj published_at property u videos string, a nama treba da po tipu bude Date, otud je ovo wrappovano u new Date(). Medjutim, ako se desi da polje published_at recimo ne postoji za neki video, onda cemo imati new Date(null) i onda cemo u templejtu umesto nekog normalnog datuma imati 12/31/1969 valjda kada je pocelo racunanje u kompjuterskom smislu i to se desi kada stavimo null u new Date(). Zato stavljamo ovo za published u if, a u templejtu cemo u v-if u VideoByline da stavimo deo gde se prikazuje publishedAt
		if(v.attributes.published_at) {
			v.attributes.published_at = new Date(v.attributes.published_at)
		}
	})
}

export const deserializeTags = function(tags) {
	tags.forEach(t => { // nasi tags nemaju id otud ovo
		t.attributes.id = t.id;
		t.attributes.video_ids = t.relationships.videos.data.map(v => v.id) // dodajemo property video_ids u tags (tacnije tags.attributes) koji se nalaze na odredjenim videima
	})
}