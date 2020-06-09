var express = require('express');
var router = express.Router();
var TeacherLogin = require('../Models/teacherLogin').TeacherLogin;
var Teacher = require('../Models/teacher').Teacher;
var Team = require('../Models/team').Team;
var MajorScheme = require('../Models/majorScheme').majorScheme;

//teacher home page
router.get('/teacherHome', (req, res) => {
	if(req.session.ID){
		if(req.session.client == "admin"){
			res.redirect("/admin/adminHome");
		}
		else if(req.session.client == "teacher"){
					
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
		}
		else if(req.session.client == "guest"){
			res.redirect("/guest/guestHome");
		}
		else{
			res.redirect("/logout");
		}
	}
	else{
		res.redirect("/");
	}
})
//guide midsem
router.get('/guideMidsem/:teamName',(req,res)=>{
	if(req.session.ID){
		if(req.session.client == "teacher"){
			//midsem
				Team.findOne({teamName : req.params.teamName},(err,validTeam)=>{
	                var members = [validTeam.member1,validTeam.member2,validTeam.member3,validTeam.member4];
	                var teamName = validTeam.teamName;
	                var description = validTeam.description;
	                MajorScheme.findOne({},(err,validScheme)=>{
	                        var fields = validScheme.fields;
	                        res.render('./teacher/guideMidsem.ejs',{
	                                members : members,
	                                teamName : teamName,
	                                description : description,
	                                fields : fields
	                        })
	                })
	        })
		}
		else if( req.session.client == "admin"){
			res.redirect('/admin/adminHome')
		}
		else if(req.session.client == "guest"){
			res.redirect('/guest/guestHome')
		}
	}
	else{
		res.redirect("/");
	}
})

router.get('/guideEndsem/:teamName',(req,res)=>{
	if(req.session.ID){
		if(req.session.client == "teacher"){
			Team.findOne({teamName : req.params.teamName},(err,validTeam)=>{
	                var members = [validTeam.member1,validTeam.member2,validTeam.member3,validTeam.member4];
	                var teamName = validTeam.teamName;
	                var description = validTeam.description;
	                MajorScheme.findOne({},(err,validScheme)=>{
	                        var fields = validScheme.fields;
	                        res.render('./teacher/guideEndsem.ejs',{
	                                members : members,
	                                teamName : teamName,
	                                description : description,
	                                fields : fields
	                        })
	                })
	        })
		}
		else if( req.session.client == "admin"){
			res.redirect('/admin/adminHome')
		}
		else if(req.session.client == "guest"){
			res.redirect('/guest/guestHome')
		}
	}
	else{
		res.redirect("/");
	}	
})
//add a team(team formation)
router.get('/addTeam',(req,res)=>{
	if(req.session.ID){
		if(req.session.client == "teacher"){
			Teacher.findOne({teacherID : req.session.ID},{major_students : 1,_id :0},(err,validTeacher)=>{
				Student.find({roll : {$in : validTeacher.major_students},teamFormed : false},{_id : 0, studentName : 1, roll : 1},(err,students)=>{
					res.render('./teacher/addTeam',{students : students});
				})
			})
		}
		else if(req.session.client == "admin"){
			res.redirect("/admin/adminHome");
		}
		else if(req.session.client == "guest"){
			res.redirect("/guest/guestHome");
		}
		else{
			res.redirect("/logout");
		}
	}
	else{
		res.redirect('/');
	}
})


//panel home page
router.get('/pannelHome', (req, res) => {
	if(req.session.ID){
		if(req.session.client == "teacher"){
		
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
			
		}
		else if(req.session.client == "admin"){
			res.redirect('/admin/adminHome');
		}
		else if(req.session.client == "guest"){
			res.redirect("/guest/guestHome");
		}
		else{
			res.redirect("/logout");
		}
	}
	else{
		res.redirect("/");
	}
});

router.get('/logout',(req,res)=>{
	req.session.destroy((err,data)=>{
		res.redirect('/');
	})
})

module.exports = router;
