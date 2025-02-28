const express = require("express");
const database = require("./config/database");
const systemdata = require("./config/system")
require('dotenv').config();

database.connect();
const routeclient = require("./routes/client/index.route"); // import router client để sài
const routeadmin = require("./routes/admin/index.route");
const app = express();
app.use(express.static("public"));
const port = process.env.PORT;
app.set('views','views');//set views ở file view
app.set('view engine', "pug");//set engine 
app.locals.admin = systemdata.PathAdmin
routeclient(app)
routeadmin(app)

app.listen(port,() =>{
    console.log(`Project opening on port:${port}`)
})