const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
var md5 = require('md5');
const app = express();
app.set('view engine', 'ejs');
const request = require('request');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
var busnum = "";
var busroute = "";
var patel = "";
var anand = "";
var tana = "";
var indra = "";
var mp = "";
var nar = "";
var mob = "";
var num = "";
mongoose.connect("mongodb+srv://busdata:lnctbhopal@cluster0.waz75iy.mongodb.net/busdata", { useNewUrlParser: true });
const bus = new mongoose.Schema({
    name: { type: String, index: true },
    busnumber: String,
    contact: { type: String, default: "7209289203" }
});
const admin = new mongoose.Schema({
    username: String,
    password: String
});
const Admin = mongoose.model("Admin", admin);
const Bus = mongoose.model("Bus", bus);

app.get("/", function (req, res) {
    res.render("index", { busnumber: busnum, route: busroute });
})

app.get("/busnumber", function (req, res) {
    Bus.findOne({ name: "Patel Nagar" }, function (err, founduser) {
        if (err) {
            console.log(err);
        }
        else {
            if (founduser) {
                patel = founduser.busnumber;
                console.log(patel);
            }
        }
    })
    Bus.findOne({ name: "Anand Nagar" }, function (err, founduser) {
        if (err) {
            console.log(err);
        }
        else {
            if (founduser) {
                anand = founduser.busnumber;

            }
        }
    })
    Bus.findOne({ name: "TanaTan Dhabha" }, function (err, founduser) {
        if (err) {
            console.log(err);
        }
        else {
            if (founduser) {
                tana = founduser.busnumber;

            }
        }
    })
    Bus.findOne({ name: "Indrapuri" }, function (err, founduser) {
        if (err) {
            console.log(err);
        }
        else {
            if (founduser) {
                indra = founduser.busnumber;

            }
        }
    })
    Bus.findOne({ name: "M.P Nagar" }, function (err, founduser) {
        if (err) {
            console.log(err);
        }
        else {
            if (founduser) {
                mp = founduser.busnumber;

            }
        }
    })
    Bus.findOne({ name: "Narela" }, function (err, founduser) {
        if (err) {
            console.log(err);
        }
        else {
            if (founduser) {
                nar = founduser.busnumber;

            }
        }
    })
    res.render("busnumber", { patel: patel, anand: anand, tana: tana, indra: indra, mp: mp, nar: nar });
});
app.post("/", function (req, res) {
    console.log("in post");
    if(req.body.place===null){
        req.redirect("/");
    }
    else{

        Bus.findOne({ name: req.body.place }, function (err, bus) {
            
            
            if(bus){
                busnum = bus.busnumber;
                busroute = bus.name;

            }
            res.redirect("/");
        })
    }
})

app.get('/autocomplete', async (req, res, next) => {
    const s = req.query.s.trim();
    const results = [];

    try {
        const products = await Bus.find({ name: { $regex: s, $options: 'i' } }).limit(10);

        products.forEach(product => {
            let { id, name } = product;
            results.push({ value: name, label: name });
        });

    } catch (err) {
        console.log(err);
    }
    res.json(results);
});

app.post("/subscribe", function (req, res) {
    console.log(req.body);
    Bus.findOneAndUpdate(
        { name: req.body.route }, { contact: req.body.cont }, function (err, success) {
            if (err) {
                console.log(err);
            }
            else {
                res.redirect("/");
            }
        }
    )
})
app.get("/admin", function (req, res) {
    res.render("admin");
})




app.post("/message", function (req, res) {
   
    res.redirect("/busnumber");

});





app.post("/admin", function (req, res) {
    var user = req.body.mail;
    var pass = md5(req.body.password);
    console.log(pass);
    Admin.findOne({ email: user }, function (err, founduser) {
        if (err) {
            console.log(err);
        }
        else {
            if (founduser) {
                console.log(founduser);
                if (founduser.password === pass) {
                    Bus.findOne({ name: "Patel Nagar" }, function (err, founduser) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            if (founduser) {
                                patel = founduser.busnumber;
                                console.log(patel);
                            }
                        }
                    })
                    Bus.findOne({ name: "Anand Nagar" }, function (err, founduser) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            if (founduser) {
                                anand = founduser.busnumber;

                            }
                        }
                    })
                    Bus.findOne({ name: "TanaTan Dhabha" }, function (err, founduser) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            if (founduser) {
                                tana = founduser.busnumber;

                            }
                        }
                    })
                    Bus.findOne({ name: "Indrapuri" }, function (err, founduser) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            if (founduser) {
                                indra = founduser.busnumber;

                            }
                        }
                    })
                    Bus.findOne({ name: "M.P Nagar" }, function (err, founduser) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            if (founduser) {
                                mp = founduser.busnumber;

                            }
                        }
                    })
                    Bus.findOne({ name: "Narela" }, function (err, founduser) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            if (founduser) {
                                nar = founduser.busnumber;

                            }
                        }
                    })
                    res.render("busnumber", { patel: patel, anand: anand, tana: tana, indra: indra, mp: mp, nar: nar });
                }
                else {
                    res.render("failure");
                }
            }
        }
    })
})

app.get("/logout", function (req, res) {
  
    res.redirect("/");
});


app.post("/update", function (req, res) {
    var p = req.body;
    console.log(p);
    Bus.findOneAndUpdate({ name: req.body.place }, { busnumber: req.body.newnumber }, function (err, success) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("busnumber");
        }
    });
  

});


app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000")
})