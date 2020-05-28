var express = require('express');
var app = express();

const PORT = process.env.PORT || 5000;
app.get('/',(req,res)=>{
	res.send("hello World");
})

app.listen(PORT,(err,data)=> console.log('listening at ',PORT));
