var express = require('express');
var router = express.Router();
var TeacherLogin = require('../Models/teacherLogin').TeacherLogin;
var Teacher = require('../Models/teacher').Teacher;
var Team = require('../Models/team').Team;

//teacher home page
router.get('/teacherHome', (req, res) => {
	var major_teams = [];
	var member1 = [];
	var	member2 = [];
	var member3 = [];
	var member4 = [];
	Teacher.findOne({ teacherID: req.session.ID }, (err, validTeacher) => {
	        if (validTeacher.major_teams.length == 0) {
	            res.render("./teacher/teacherHome.ejs", {
	                teamNames: major_teams,
	                member1: member1,
	                member2: member2,
	                member3: member3,
	                member4: member4,
	            })
	        }
	        else {
	            for (var i = 0; i < validTeacher.major_teams.length; i++) {
	                major_teams.push(validTeacher.major_teams[i]);
	            }
	            for (var i = 0; i < major_teams.length; i++) {
	                Team.findOne({ teamName: major_teams[i] }, (err, validTeam) => {
	                    member1.push(validTeam.member1);
	                    member2.push(validTeam.member2);
	                    member3.push(validTeam.member3);
	                    member4.push(validTeam.member4);
	                    if (member4.length == major_teams.length) {
	                        res.render("./teacher/teacherHome.ejs", {
	                            teamNames: major_teams,
	                            member1: member1,
	                            member2: member2,
	                            member3: member3,
	                            member4: member4,
	                        })
	                    }
	                })
	            }
	        }
	    })
})
//panel home page
router.get('/pannelHome', (req, res) => {
	var major_teams = [];
	var member1 = [];
	var	member2 = [];
	var member3 = [];
	var member4 = [];
	Teacher.findOne({ teacherID: req.session.ID }, (err, validTeacher) => {
	        if (validTeacher.major_teams.length == 0) {
	            res.render("./teacher/pannelHome.ejs", {
	                teamNames: major_teams,
	                member1: member1,
	                member2: member2,
	                member3: member3,
	                member4: member4,
	            })
	        }
	        else {
	            for (var i = 0; i < validTeacher.major_teams.length; i++) {
	                major_teams.push(validTeacher.major_teams[i]);
	            }
	            for (var i = 0; i < major_teams.length; i++) {
	                Team.findOne({ teamName: major_teams[i] }, (err, validTeam) => {
	                    member1.push(validTeam.member1);
	                    member2.push(validTeam.member2);
	                    member3.push(validTeam.member3);
	                    member4.push(validTeam.member4);
	                    if (member4.length == major_teams.length) {
	                        res.render("./teacher/pannelHome.ejs", {
	                            teamNames: major_teams,
	                            member1: member1,
	                            member2: member2,
	                            member3: member3,
	                            member4: member4,
	                        })
	                    }
	                })
	            }
	        }
	    })
})

router.get('/logout',(req,res)=>{
	req.session.destroy((err,data)=>{
		res.redirect('/');
	})
})

module.exports = router;
