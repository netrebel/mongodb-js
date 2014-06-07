var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost/sports', function(err, db) {
	if(err) throw err;

	var query = {'_id': '1657995-manual-Brasil-Croacia'};
	var operator = {'$set': {'status': 'VERIFIED'}};

	db.collection('eventbroadcasts').update(query, operator, function(err, updated){
		if(err) throw err;

		console.dir("Successfully updated:" + updated + " document!");

		return db.close();

	});


});
