const express = require("express");

const route = require("./routes/client/index.route") // import router để sài

const app = express();
const port = 300;
app.set('views','views')//set views ở file view
app.set('view engine', "pug")//set engine 

route(app)

app.listen(port,() =>{
    console.log(`Project opening on port:${port}`)
})