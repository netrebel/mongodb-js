/** This is a NODEJS script, it requires string-format which can be installed using NPM install 'string-format' **/
/*
Description:
This script will make repeated calls to the API to get all the servers since one can only get them a 'page' at a time. 
It then scans through the list of servers and pushes non-reporting ones into an array. 
Then this array is passed to a delete function that loops through the array shelling out to cUrl to delete them.

Source:
https://discuss.newrelic.com/t/is-there-a-way-to-automatically-delete-non-reporting-servers/580/8

Run: 
$ npm install string-format
$ node new-relic-delete-old-servers.js
*/
var format = require('string-format');
var exec = require('child_process').exec;

var PRODUCTION_API_ENDPOINT_GET = "curl -X GET 'https://api.newrelic.com/v2/servers.json' -H 'X-Api-Key:{0}' -d 'page={1}'";
var PRODUCTION_API_ENDPOINT_DELETE = "curl -X DELETE 'https://api.newrelic.com/v2/servers/{0}.json' -H 'X-Api-Key:{1}'";
var api_key = '';
var page = 1;
var servers = [];

function deleteNotReporting(servers) {
	if (servers.length > 0) {
		var server = servers.pop();
		var DELETE = format(PRODUCTION_API_ENDPOINT_DELETE, server.id, api_key);
		console.log(DELETE);
		exec(DELETE, function(error) {
			deleteNotReporting(servers);
			console.info('Delete ' + server.id + ' ' + server.name);
		});
	}
}

function processServers(data, stdout, stderr) {
	var response = JSON.parse(stdout);
	console.log(stdout);
	if (response.servers.length > 0) {
		response.servers.forEach(function(server) {
			if (server.reporting === false) {
				servers.push(server);
			}
		});
		var url = format(PRODUCTION_API_ENDPOINT_GET, api_key, ++page);
		exec(url, processServers);
	} else {
		console.log(servers.length);
		deleteNotReporting(servers);
	}
}

exec(format(PRODUCTION_API_ENDPOINT_GET, api_key, page), processServers);
