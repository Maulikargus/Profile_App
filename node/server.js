var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var db=require('./data')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.get('/get/:email', function (req, res) {
  console.log(req.params);

    	db.data.findOne({"email":req.params.email},function(err,loginuser){
  		if(!err){
  			if(loginuser){
  				loginuser.type="succed";
  				res.send(loginuser);
  			}
  			else{
  				res.send({
  					type:"error",
  					message:"data is not set"
  				});
  			}
  			 		}
  		else
  			res.send(err);
  	});

})

app.post('/', function (req, res) {
	console.log(req.body);
  if(req.body.type=="register"){
  		new db.user({
  			email:req.body.email,
  			password:req.body.password
  		}).save(function(err){
  			if(!err)
  				res.send("succed");
  			else
  				res.send(err);
  		}
  	);
  }

  else{
  	db.user.findOne({"email":req.body.email,"password":req.body.password},function(err,loginuser){
  		if(!err){ 
  			if(loginuser){
  				res.send({
  					type:"succed"
  				});
  			}
  			else{
  				res.send({
  					type:"error",
  					message:"register first"
  				});
  			}
  			 		}
  		else
  			res.send(err);
  	});
  }
})



app.post('/setdata', function (req, res) {
	db.data.findOneAndUpdate({email:req.body.email},{$set:{ 
	name:req.body.name,
	phone:req.body.phone,
	city:req.body.city,
	website:req.body.website,
	image:req.body.image
}  },function(err,profile){

    	console.log(profile);
    	if(!profile){
    		
			new db.data({
				email:req.body.email,
				name:req.body.name,
				phone:req.body.phone,
				city:req.body.city,
				website:req.body.website
			}).save(function(err){
  				if(!err)
  					res.send("succed");
  				else
  					res.send(err);
  		});

    	}




});

});





// app.put('/', function (req, res) {
//   console.log(req.data);
//   res.send('Hello World')
// })

// app.delete('/', function (req, res) {
//   console.log(req.data);
//   res.send('Hello World')
// })


app.listen(3000)