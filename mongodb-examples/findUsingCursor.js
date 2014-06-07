var MongoClient = require('mongodb').MongoClient;

//FIND WITH CURSOR

MongoClient.connect('mongodb://localhost/sports', function(err, db) {
	if(err) throw err;

	var query = {'status': 'VERIFIED'};
	var projection = {'eventId' : 1};

	var cursor = db.collection('eventbroadcasts').find(query, projection);

	cursor.each(function (err, doc) {
		if(err) throw err;

		if(doc == null) {
			return db.close();
		}
		console.dir("My eventId: " + doc.eventId);
	});
});