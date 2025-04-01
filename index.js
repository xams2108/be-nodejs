const express = require("express");
const flash = require('express-flash');
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
const path = require("path");
const bodyParser = require('body-parser');
const database = require("./config/database");
const systemdata = require("./config/system");
const http = require("http");
const { Server } = require("socket.io");
require('dotenv').config();

database.connect();
const app = express();
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));

// Socket.IO setup
const server = http.createServer(app);
const io = new Server(server);
global._io = io; // Lưu io vào global để dùng ở file khác

// Flash middleware
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// Static files
app.use(express.static(`${__dirname}/public`));

// Routes
const routeclient = require("./routes/client/index.route");
const routeadmin = require("./routes/admin/index.route");
routeclient(app);
routeadmin(app);

// Views setup
app.set('views', `${__dirname}/views`);
app.set('view engine', "pug");
app.locals.admin = systemdata.PathAdmin;

// Khởi động server (dùng server chứa Socket.IO, không dùng app.listen)
const port = process.env.PORT;
server.listen(port, () => {
    console.log(`Project opening on port:${port}`);
    console.log(`Socket.IO running: http://localhost:${port}/socket.io/socket.io.js`);
});