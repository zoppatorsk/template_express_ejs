require("dotenv").config(); //use dotenv for storing config stuff... file used is .env
const path = require("path");
const express = require("express"); //express is a web application framework, in short the
const compression = require("compression");
const app = express();
const helmet = require("helmet");

//register middlewares
app.use(helmet()); //sets security headers
app.use(compression()); //activate compression for req/res

// set the view engine to ejs
// wiews are just html pages but with .ejs extension and can use the ejs syntax for putting code in them.
app.set("view engine", "ejs");

//set up the static dir, the one that holds the assets, ie js/css/images etc.
app.use(express.static(path.join(__dirname, "public")));

// index page
app.get("/", async function (req, res) {
	const payload = {}; //the object to send to the page
	payload.data = { name: "Tester", email: "testmail@test.nu" }; //put some data in the payload

	// use res.render to load up an ejs view file. payload is object with data to send to the view
	return res.render("pages/index", payload);
});

app.listen(process.env.APP_PORT);
console.log(`Server is listening on port ${process.env.APP_PORT}`);
