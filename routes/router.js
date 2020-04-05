var express = require ('express');

var router  = express.Router();
var app     = express();

var promise = require ('promise');

const evilscan = require ('evilscan');

let options = {
    // target :'173.194.45.67',
    target  :'192.168.0.1-5',
    // target  :'192.168.1.1-192.168.1.5',
    // port    :'21, 22, 23, 80, 443, 4443, 4444, 5038, 5060-5070, 8080',
    port    :'8080',
    status  : 'TROU', // Timeout, Refused, Open, Unreachable
    timeout : 3000,
    banner  : true
    //geo	    : true
};

/*let ip_list = function () {
    let scanner = new evilscan(options);
    var output = 2;

    scanner.on('result',function (data) {
        // fired when item is matching options
        // output = data;
        // res.send({data});
        resolve ({'ip': data});
    });

    scanner.on('error',function (err) {
        throw new Error(data.toString());
        output = 0;
    });

    scanner.on('done',function () {
        // finished !
        output = 1;
    });
    scanner.run();
};*/

var output = [];

function scan () {
    return new promise (function (resolve, reject) {
        let scanner = new evilscan(options);

        scanner.on('result',function (data) {
            // fired when item is matching options
        if (data.status == 'open') {
            //     console.log(data);
            output.push(data);
        }
        });

        scanner.on('error',function (err) {
            throw new Error(data.toString());
        });

        scanner.on('done',function () {
            // finished !
            console.log(output);
            resolve ({'ip': output});
            output = [];
        });
        scanner.run();
    });
}

async function getResult(){
    let result = await scan();
    return result
}

module.exports = function (router) {
    router.get("/", function (req, res) {
        res.render('index.ejs')
    });

    router.get("/ipscan", function (req, res) {
        var output = [];
        scan().then (function (result) {
            // console.log(result);
            res.send (result);
        });
    });


    router.get("/landing", function (req, res) {
        // layout = req.getElementById("layout");
        // console.log(layout);

        res.render("portal.ejs", {shalimar_storage: 10, shalimar_update: 0});
    });

    router.get("/signup", function (req, res) {
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });

    router.get("/signin", function (req, res) {
        res.render('signin.ejs', { message: req.flash('loginMessage')});
    });


    router.get("/portal", function (req, res) {
        res.redirect('/landing');
    });
};