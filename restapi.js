var express = require('express')
var mongoose = require('mongoose')
var app = express();

var session = require('express-session');
TeacherLogin = require("./Models/teacherLogin").TeacherLogin;
Teacher = require("./Models/teacher").Teacher;
Student = require("./Models/student").Student;
courseDetails=require("./Models/courseDetails").courseDetails;
//var cookieParser = require('cookie-parser');
//app.use(cookieParser());
const bodyParser = require('body-parser');
var path = require('path')
app.use(bodyParser.urlencoded({ extended: true }));
//var url = "mongodb://localhost:27017/";
var Team = require("./Models/team").Team;
var GuestLogin = require("./Models/guestLogin").GuestLogin;
var AdminLogin = require("./Models/adminLogin").AdminLogin;
var evaluators=require("./Models/evaluators").evaluators;
var majorScheme=require("./Models/majorScheme").majorScheme;
//dict = {}
majorScheme = require('./Models/majorScheme').majorScheme
app.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    //store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl: 260 }),
    saveUninitialized: true,
    resave: false
}));

app.use(express.static(__dirname + '/public'));


app.set('view engine', 'ejs');

var url = "mongodb://vara1:vara1@mycluster-shard-00-00-zucif.gcp.mongodb.net:27017,mycluster-shard-00-01-zucif.gcp.mongodb.net:27017,mycluster-shard-00-02-zucif.gcp.mongodb.net:27017/minor_final?ssl=true&replicaSet=myCluster-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function (callback) {
    console.log('Successfully connected to MongoDB.');
});
/*
home sends login page
*/
app.get('/', (req, res) => {
    res.render('login2.ejs')
})

//admin
var admin = require('./routes/admin');
app.use('/admin',admin);
//teacher
app.post('/teacherLogin',(req,res)=>{
	TeacherLogin.findOne({ password : req.body.p , userName : req.body.u},(err,validTeacher)=>{
		if(validTeacher == null){
			res.send("falied");
		}
		else{
		    req.session.ID = validTeacher.tId;
			res.send("Success");
		}
	})
})
var teacher = require('./routes/teacher');
app.use('/teacher',teacher)
//guest
var guest = require('./routes/guest');
app.use('/guest',guest);
       
var PORT = process.env.PORT || 8081;
var server = app.listen(PORT, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("listening at http://%s:%s", host, port)
})
