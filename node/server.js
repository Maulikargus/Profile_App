var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var db = require('./data')

app.use(bodyParser.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use( bodyParser.raw({limit: '50mb'}) );   

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.get('/get/:email', function(req, res) {

    db.data.findOne({ "email": req.params.email }, function(err, loginuser) {
        if (!err) {
            if (loginuser) {
                loginuser.type = "succed";
                res.send(loginuser);
            } else {
                res.send({
                    type: "error",
                    message: "data is not set"
                });
            }
        } else
            res.send(err);
    });

})

app.get('/getall', function(req, res) {

    db.data.find(function(err, result) {
        if (!err) {
            res.send(result);
        } else
            res.send({
                type: "error",
                message: "database error"
            })
    })
})


app.post('/', function(req, res) {
    if (req.body.type == "register") {
        db.user.findOne({ "email": req.body.email }, function(err, loginuser) {
            if (!err) {
                if (loginuser) {
                    res.send({
                        type: "error",
                        message: "Already registered"
                    });
                } else {

                    new db.user({
                        email: req.body.email,
                        password: req.body.password
                    }).save(function(err) {
                        if (!err)
                            res.send({
                                type: "succed"
                            });
                        else
                            res.send({
                                type: "error",
                                message: "database error"
                            });
                    });

                }
            }
        });
    } else {
        db.user.findOne({ "email": req.body.email, "password": req.body.password }, function(err, loginuser) {
            if (!err) {
                if (loginuser) {
                    res.send({
                        type: "succed"
                    });
                } else {
                    res.send({
                        type: "error",
                        message: "register first"
                    });
                }
            } else
                res.send(err);
        });
    }
})



app.post('/setdata', function(req, res) {
    var tempjson = {
        name: req.body.name,
        phone: req.body.phone,
        location: {
            city: req.body.location.city,
            state: req.body.location.state,
            country: req.body.location.country
        },
        field:req.body.field,
        profession:req.body.profession,
        website: req.body.website
    }

    if(req.body.image)
        tempjson.image=req.body.image;


    db.data.findOneAndUpdate({ email: req.body.email }, {
        $set: tempjson
    }, function(err, profile) {

        if (!profile) {
            tempjson.email = req.body.email;


            new db.data(tempjson).save(function(err, prof) {
                if (!err)
                    res.send(prof);
                else
                    res.send(err);
            });

        } else
            res.send("updated");
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
