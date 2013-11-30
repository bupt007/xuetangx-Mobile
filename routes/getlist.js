/*
* get course list
*/
var respon = function(res, str, code){
	var mes = JSON.stringify(str);
	res.writeHead(code,{'Content-Length':mes.length,  'Content-Type':'application/json'});
	if(str.length > 0){
		res.write(str);
	}
	res.end();
};
var fs = require('fs');
exports.getallcourse = function(req, res) {
	var key = req.headers['x-edx-api-key'];
	var access = req.headers['Authorization'];
	if (key != '1234567890' || access.length < 10){
		res.writeHead(403, {"Content-Type":"application/json"});
		//res.send("heh");
		res.end();
		return;
	}
	fs.readFile('coursedata', 'utf-8', function(err,data) {
		var courses = data.split(/\n/);
		var response = "";
		for(var i = courses.length; i --;){
			fs.readFile('data/' + course, 'utf-8', function(err, data) {
				if ( response.length > 0){
					response = response + ',';
				}
				response = response + '{' + data + '}';
				if(i == 0) {
					response = '[' + response + ']';
					var back = '{"status" : "success",'
						 + '"courses" :' +  response + '}';
					respon(res, back, 200);
				}
			});
		}
	});
};

exports.getenrollcourse = function(req, res) {
	var key = req.headers['x-edx-api-key'];
	var access = req.headers['Authorization'];
	if (key != '1234567890' || access.length < 10){
		res.writeHead(403, {"Content-Type":"application/json"});
		//res.send("heh");
		res.end();
		return;
	}
	fs.readFile('data/' + access, 'utf-8', function(err,data) {
		var courses = data.split(/\n/);
		var response = "";
		for(var i = courses.length; i --;){
			fs.readFile('data/' + course, 'utf-8', function(err, data) {
				if ( response.length > 0){
					response = response + ',';
				}
				response = response + '{' + data + '}';
				if(i == 0) {
					response = '[' + response + ']';
					var back = '{ "enrollments" : '+ response +'}';
					respon(res, back, 200);
				}
			});
		}
	});
};