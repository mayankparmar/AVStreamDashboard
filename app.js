var express     = require ('express');

var app = express();

var thePort = process.env.PORT || 8080;
var theIP   = process.env.IP || "0.0.0.0";

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

require ('./routes/router')(app);

app.listen(thePort, theIP, function () {
    console.log("Server started");
});