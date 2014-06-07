var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost/sports', function(err, db) {
	if(err) throw err;

	var query = {"_id": "1657995-manual-Brasil-Croacia"};

	db.collection('eventbroadcasts').findOne(query, function(err, doc) {
		if(err) throw err;

		doc['status'] = "VERIFIED";

		db.collection('eventbroadcasts').save(doc, function(err, saved) {
			if(err) throw err;

			console.dir("Successfully saved " + saved + " document!" );

			return db.close();

		});

	});

});