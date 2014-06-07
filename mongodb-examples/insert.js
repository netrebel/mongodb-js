var MongoClient = require('mongodb').MongoClient;

//INSERT
MongoClient.connect('mongodb://localhost/sports', function(err, db) {
	if(err) throw err;

	var doc = {"_id":"1657995-manual-Brasil-Croacia", "eventId": 1657995};

	db.collection('eventbroadcasts').insert(doc, function(err, inserted) {
		if(err) throw err;

		console.dir("Successfully inserted: " + JSON.stringify(inserted));

		return db.close();

	});

});
