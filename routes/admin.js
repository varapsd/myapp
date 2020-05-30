var express = require('express');

//admin login
app.post('/adminLogin', (req, res) => {
    AdminLogin.findOne({ password: req.body.p, userName: req.body.u }, (err, validAdmin) => {
        if (validAdmin == null) {
            res.send("Invalid ID or Password");
            console.log("Invalid ID or Password");
        }
        else {
            //client.set(req.sessionID, validAdmin.aId);
            req.session.ID = validAdmin.aId;
            console.log("success");
            res.send("success")
        }
    })

})

app.get('/adminHome', (req, res) => {
        console.log(req.session.ID);
    res.render("adminHome.ejs");
})
