var lineReader = require('line-reader');

lineReader.eachLine('channels-ids.txt', function(line, last) {

	// console.log(line);
	if(line != null && line.length > 0) {		
		console.log(line + ",");
	}
});
