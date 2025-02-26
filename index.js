const express = require("express");
require('dotenv').config();
const route = require("./routes/client/index.route"); // import router để sài
const app = express();
app.use(express.static("public"));
const port = process.env.PORT;
app.set('views','views');//set views ở file view
app.set('view engine', "pug");//set engine 

route(app)

app.listen(port,() =>{
    console.log(`Project opening on port:${port}`)
})