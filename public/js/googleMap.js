var googleMapsClient = require('@google/maps').createClient({
	key: 'AIzaSyAVUmawnKn5NCZ6j46teq4zCaiiXz-gcns'
});

googleMapsClient.geocode({
	address: '596 Old Trenton Rd, East Windsor, NJ'
}, function(err, res){
	if(!err){
		console.log(res.json.results);
	}
});