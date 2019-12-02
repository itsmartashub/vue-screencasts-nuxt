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
	})
}

export const deserializeTags = function(tags) {
	tags.forEach(t => { // nasi tags nemaju id otud ovo
		t.attributes.id = t.id;
		t.attributes.video_ids = t.relationships.videos.data.map(v => v.id) // dodajemo property video_ids u tags (tacnije tags.attributes) koji se nalaze na odredjenim videima
	})
}