var PORT = '9999';


var path = require('path');
var jsonServer = require('json-server');
var load = require('json-server/lib/cli/utils/load');
var server;

var fs = require('fs');
var chalk = require('chalk');
var router, rewriter;

function createApp(watchedFile){
	server = jsonServer.create();
	var fileName = path.resolve(path.join(__dirname, 'router.js'));
	delete require.cache[fileName];
	delete require.cache[watchedFile];
	var routerFile = require(fileName)();
	router = jsonServer.router(routerFile);
	var middlewares = jsonServer.defaults();
	server.use(middlewares);
	if(!rewriter){
		rewriter = {};
		for(var i in routerFile){
			rewriter['/'+i+'/%7B%7D'] = '/'+i;
		}
	}
	server.use(jsonServer.rewriter(rewriter))

	server.use(router);
}

var watchedDir = path.join(__dirname, './db');
fs.watch( watchedDir, function (event, file) {
	if (file) {
		var watchedFile = path.resolve(watchedDir, file);
		var split = watchedFile.split(".");
		if(split[split.length-1] == 'json'){
			console.log(chalk.gray('  ' + watchedFile + ' has changed, reloading...'));
			// console.log(router.db.getState())
			serverInstance && serverInstance.destroy();
			start(watchedFile);
		}
	}
});
var watchFile = path.join(__dirname, './router.js')
fs.watch( watchFile, function (event, file) {
	if (file) {
		var watchedFile = path.resolve(watchFile, file);
		var split = watchedFile.split(".");
		if(split[split.length-1] == 'js'){
			console.log(chalk.gray('  ' + watchedFile + ' has changed, reloading...'));
			// console.log(router.db.getState())
			serverInstance && serverInstance.destroy();
			start(watchedFile);
		}
	}
});

var enableDestroy = require('server-destroy');

var serverInstance;
function start(watchedFile){
	createApp(watchedFile);
	serverInstance = server.listen(PORT, function () {
		console.log('mock json server is running.... ');
		console.log('localhost:'+PORT);
	});
	enableDestroy(serverInstance);

}
start();