const express = require("express");
const flash = require('express-flash');
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
const path = require("path")
const bodyParser = require('body-parser');
const database = require("./config/database");
const systemdata = require("./config/system");

require('dotenv').config();


database.connect();
const app = express();
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: false }))


//flash
app.use(cookieParser('keyboard cat'));//key ở đay là dùng để bảo mật
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//flash end

app.use(express.static(`${__dirname}/public`));
const routeclient = require("./routes/client/index.route"); // import router client để sài
const routeadmin = require("./routes/admin/index.route");
routeclient(app)
routeadmin(app)

const port = process.env.PORT;
app.set('views', `${__dirname}/views`);//set views ở file view
app.set('view engine', "pug");//set engine s


app.locals.admin = systemdata.PathAdmin


app.listen(port, () => {
    console.log(`Project opening on port:${port}`)
})