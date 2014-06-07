var MongoClient = require('mongodb').MongoClient;

//FIND
MongoClient.connect('mongodb://localhost/sports', function(err, db) {
	if(err) throw err;

	var query = {'status': 'VERIFIED'};

	db.collection('eventbroadcasts').find(query).toArray(function (err, docs) {
		if(err) throw err;

		docs.forEach(function (doc){
			console.dir(doc);
		});
		
		db.close();		
	});

});