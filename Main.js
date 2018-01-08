var express = require('express');
var app = express();
var mysql = require('mysql');
var multer = require('multer');
var path = require("path");
var router = express.Router();
var bodyParser = require('body-parser');

//app.use(express.bodyParser());

var storage = multer.diskStorage({
	destination: function(req,file,cb){
		cb(null,'./public/images/');
	},
	
	filename: function(req,file,cb){
		cb(null, Date.now() + file.originalname);
	}
});

var count;
var count_all=4;
var count_lvl1 = 2;
var count_lvl2 = 2;
var count_lvl3 = 2;
var count_lvl4 = 2;
var upload = multer({ storage:storage });

//var upload = multer({dest: 'public/images'});


//var fs = require('fs');
//app.use(bodyParser({ uploadDir: path.join(__dirname, '.png'), keepExtensions: true })); 
//app.use(bodyParser.urlencoded({extended: true})); 

//app.use(multer({dest:'public/images'}));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "system",
  database: "website_test"
});

app.use(express.static('public'));

app.post('/asd',upload.any(),toUpload);

function toUpload(req,response){
	//console.log(req.files);
	//var data   = req.params;
	console.log(req.body.image_1);
	var lvl = req.body.image_1;
	console.log(lvl);
	//console.log("UPLOAD!!!");
	//response.send(req.files[1].filename);
	var image_1 = req.files[0].filename;
	var image_2 = req.files[1].filename;
	//var first_lvl = lvl;
	
	
	
	var first_fn = "images/"+image_1;
	var second_fn = "images/"+image_2;
	
	console.log(first_fn);
	console.log(second_fn);
	
	
	var query1 = "update img_table set link_1='"+first_fn+"',link_2='"+second_fn+"' where name='"+lvl+"';"; 
	console.log(query1);
	
	con.query(query1,function(err,result){
		
	});	
	
	response.sendFile( __dirname + "/public/file_upload.html" );
}




app.post('/extra_post',upload.any(),function(request,response){
	
	var myImage = request.files[0].filename;
	console.log(myImage);
	var lvl_1 = request.body.image_1;
	
	if(lvl_1 == "level_1")
	{
		count_lvl1++;
		count = count_lvl1;
	}
	else if(lvl_1 == "level_2")
	{
		count_lvl2++;
		count = count_lvl2;
	}
	else if(lvl_1 == "level_3")
	{
		count_lvl3++;
		count = count_lvl3;
	}
	else if(lvl == "level_4")
	{
		count_lvl4++;
		count = count_lvl4;
	}
	
	if(count_all < count)
	{
		var add_col = "alter table img_table add link_"+count+" varchar(1000);" ;
		console.log(add_col);
		count_all = count;
	}
	
	con.query(add_col,function(err,result){	
	});	
	
	var lvl_1 = request.body.image_1;
	var upload_fn = "images/"+myImage;
	response.send("successfully upload");
	
	var q4 = "update img_table set link_"+count+" ='"+upload_fn+"' where name='"+lvl_1+"';";
		console.log(q4);
		
		con.query(q4,function(err,result){	
	});
});


app.get('/get_allimg/:level_name',sendAllimg);

function sendAllimg(request,response){
	
	var data   = request.params;
	console.log("I am in GET_DATA");
	//var lvl    = data.level_name;
	var lvl =  data.level_name;
	
	
	if(lvl!= "undefined")
	{
		console.log(" "+lvl+" ");
	
	var q2 = "select * from img_table where name='"+lvl+"';"; 
	console.log(q2);
	
	 con.query(q2,function(err,result){
		response.send(result);
	});	
	
	}
	
	
}


app.get('/get_img/:level_name',getImage);

function getImage(request,response){
	
	var data = request.params;
	var lvl = data.level_name;
	
	console.log("I ama in GET_IMAGE");
	
	if(lvl!= "undefined")
	{
	var q3 = "select link_1,link_2 from img_table where name='"+lvl+"';";
	console.log(q3);
	
	
	con.query(q3,function(err,result){
		console.log(result);
		
		response.send(result);
	});	
	
	}
	
	
}


 var server = app.listen(9090,listening);
function listening(){
	console.log("LISTENING....9090");
}