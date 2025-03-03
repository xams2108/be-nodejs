const express = require("express");
const methodOverride = require("method-override")
const bodyParser = require('body-parser')
const database = require("./config/database");
const systemdata = require("./config/system")
require('dotenv').config();

database.connect();
const app = express();

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))

const routeclient = require("./routes/client/index.route"); // import router client để sài
const routeadmin = require("./routes/admin/index.route");
routeclient(app)
routeadmin(app)

app.use(express.static("public"));
const port = process.env.PORT;
app.set('views','views');//set views ở file view
app.set('view engine', "pug");//set engine s


app.locals.admin = systemdata.PathAdmin


app.listen(port,() =>{
    console.log(`Project opening on port:${port}`)
})