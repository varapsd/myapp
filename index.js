var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

app.set('views engine','ejs');
const PORT = process.env.PORT || 5000;
app.get('/',(req,res)=>{
	res.render('login.ejs');
})

app.listen(PORT,(err,data)=> console.log('listening at ',PORT));
