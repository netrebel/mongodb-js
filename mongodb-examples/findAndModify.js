var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost/sports', function(err, db) {

	if(err) throw err;

	var query = {"_id": "1657995-manual-Brasil-Croacia"};
	var sort = [];
	var operator = {'$set': {'status': "VERIFIED"}};
	var options = {'new': 'true'};

	db.collection('eventbroadcasts').findAndModify(query, sort, operator, options, function(err, doc){
		if(err) throw err;

		if(!doc){
			console.log("No document found.");
		} else {
			console.log("Document status modified: " + doc.status);
		}

		return db.close();

	});

});