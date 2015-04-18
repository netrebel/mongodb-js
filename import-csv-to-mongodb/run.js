var lineReader = require('line-reader'), 
MongoClient = require('mongodb').MongoClient,
async = require('async');

console.time("import-time");
var docs = [];

lineReader.eachLine('hello.txt', function(line, last) {

	// console.log(line);
	var item = line.split(",");
	var programId = item[0];
	var views = item[1];
	// console.log("---> " + programId);
	// console.log("---> " + views);

	var doc = {"_id": programId, "views": views};

	docs.push(doc);

	// console.log(doc);

}).then(function () {	
	console.log("Documents to insert:" + docs.length);

	for (var doc in docs) {
		q.push({ doc: docs[doc] }, function(err) {
			if (err) console.log(err);
		})
	}
});
// console.log("documents size:" + documents.length);

var q = async.queue(function(task, callback) {
  // task.doc would contain your individual doc to process
  // your insert / update logic goes here...

  MongoClient.connect('mongodb://localhost/stats', function(err, db) {
  	if(err) {
  		console.error("ERROR");
  		throw err;
  	}

  	db.collection('program_views_varnish').insert(task.doc, function(error, inserted) {
  		if(error) {
  			console.error(error)
  		} 
  		console.log("Successfully inserted: " + task.doc._id);
  		db.close();
  		// Callback signifies you're done with this task
  		callback();
  	});
  });
}, 30) // <--- this number specifies the number of tasks to run in parallel

q.drain = function() {
  // this is the queue's callback, called when the queue is empty,
  // i.e. when all your documents have been processed.

  console.timeEnd("import-time");
} 
