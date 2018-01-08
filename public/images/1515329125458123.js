var http = require("http"); 

var fs = require("fs");

http.createServer(function(req,res){
	
	var f = req.url.slice(1,req.url.length);
	
	fs.readFile(f,function(err,data){
	
	res.writeHead(200,{'content-Type':'text/html'});
	
	if(data){
		
	res.end(data.toString());
	}
	else{
		res.end("ssdas");
	}
});
	
	
}).listen(3030);