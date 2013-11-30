/*
* Course 
*/
var fs = require('fs');
var respon = function(res, str, code){
	res.writeHead(code, {"Content-Type":"application/json"});
	res.send(JSON.stringify(str));
	res.end();
};
var checkKey = function(req, res){
}
exports.enrollment = function(req, res) {
	var key = req.headers['X-edx-api-key'];
	var access = req.headers['Authorization'];
	if(key != '1234567890' || access .length < 10){
		res.writeHead(403, {"Content-Type":"application/json"});
		res.end();
		return;
	}
	var coursename = req.params.username;
	fs.readFile('coursedata', 'utf-8', function(err,data){
		var datas = data.split(/\n/);
		for(var item in datas){
			if(item == coursename) {
				fs.appendFile('data/' + access, coursename+"\n", "utf-8", function(err){
					if(err){
						console.log(err);
						respon(res,"", 500);
					}else{
						res.writeHead(200, {"Content-Type:":"application/json"});
						res.end();
					}
				});
				return;
			}
		}
		var back = {
			err_type: 'CourseDoesNotExist',
			err_msg: 'Couse does not exist'
		};
		respon(res, back, 400);
		return;
		
		
	});
};
exports.unenroll = function(req, res) {
	var key = req.headers['X-edx-api-key'];
	var access = req.headers['Authorization'];
	if(key != '1234567890' || access .length < 10){
		res.writeHead(403, {"Content-Type":"application/json"});
		res.end();
		return;
	}
	var coursename = req.params.username;
	fs.readFile('data/'+access, 'utf-8', function(err, data) {
		var datas = data.split(/\n/);
		for(var i = datas.length; i --; ) {
			if(datas[i] == coursename) {
				var backContent = '';
				for(var j = datas.length; j --;){
					if(j != i){
						backContent = backContent + datas[j] + '\n';
					}
				}
				fs.writeFile('data/' + access, backContent, "utf-8", function(err) {
					if(err){
						console.log(err);
						respon(res, "",500);
					}else{
						res.writeHead(200, {"Content-Type:":"application/json"});
						res.end();
					}
				});
				return;
			}
		}
		var back = {
			err_type: 'UserNotEnrolled',
			err_msg: 'User is  not enrolled in course'
		};
		respon(res, back, 403);
		return ;
	});
};
