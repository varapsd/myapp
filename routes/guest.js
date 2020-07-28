var express = require('express');
var router = express.Router();
var GuestLogin = require('../Models/guestLogin').GuestLogin;
var Team = require('../Models/team').Team;
var MajorScheme = require('../Models/majorScheme').majorScheme;
var Studnet = require('../Models/student').Student;
//guest 
//guestLogin session


//guestHome Page
/*
router.get('/guestHome', (req, res) => {
	if(req.session.ID){
		if(req.session.client == "admin"){
			res.redirect("/admin/adminHome")
		}
		else if(req.session.client == "teacher"){
			res.redirect("/teacher/teacherHome");
		}
		else if(req.session.client == "guest"){
				var major_teams = [];
				var member1 = [];
				var member2 = [];
				var member3 = [];
				var member4 = [];
				Team.find({},(err,ValidTeams)=>{
					if(ValidTeams.length == 0){
						res.render('./guest/guestHome',{
							teamNames : major_teams,
							member1 : member1,
							member2 : member2,
							member3 : member3,
							member4 : member4
						});
					}
					else{
						for(var i = 0 ;i<ValidTeams.length; i++){
							major_teams.push(ValidTeams[i].teamName);
							member1.push(ValidTeams[i].member1);
							member2.push(ValidTeams[i].member2);
							member3.push(ValidTeams[i].member3);
							member4.push(ValidTeams[i].member4);
							
						}
						res.render('./guest/guestHome',{
							teamNames : major_teams,
							member1 : member1,
							member2 : member2,
							member3 : member3,
							member4 : member4
						})
					}
				})
		}
		else{
			res.redirect('/logout');
		}
	}
	else{
		res.redirect('/');
	}
   
})

router.get('/midsem/:teamName',(req,res)=>{
	if(req.session.ID){
		if(req.session.client == "admin"){
			res.redirect("/admin/adminHome")
		}
		else if(req.session.client == "teacher"){
			res.redirect("/teacher/teacherHome");
		}
		else if(req.session.client == "guest"){	
			Team.findOne({teamName : req.params.teamName},(err,validTeam)=>{
				var members = [validTeam.member1,validTeam.member2,validTeam.member3,validTeam.member4];
				var teamName = validTeam.teamName;
				var description = validTeam.description;
				MajorScheme.findOne({},(err,validScheme)=>{
					var fields = validScheme.fields;
					res.render('./guest/guestMidsem.ejs',{
						members : members,
						teamName : teamName,
						description : description,
						fields : fields
					})
				})
			})		
		}
		else{
			res.redirect('/logout');
		}
	}
	else{
		res.redirect('/');
	}
   
});

router.get('/endsem/:teamName',(req,res)=>{
	if(req.session.ID){
		if(req.session.client == "admin"){
			res.redirect("/admin/adminHome")
		}
		else if(req.session.client == "teacher"){
			res.redirect("/teacher/teacherHome");
		}
		else if(req.session.client == "guest"){	
			Team.findOne({teamName : req.params.teamName},(err,validTeam)=>{
				var members = [validTeam.member1,validTeam.member2,validTeam.member3,validTeam.member4];
				var teamName = validTeam.teamName;
				var description = validTeam.description;
				MajorScheme.findOne({},(err,validScheme)=>{
					var fields = validScheme.fields;
					res.render('./guest/guestEndsem.ejs',{
						members : members,
						teamName : teamName,
						description : description,
						fields : fields
					})
				})
			})		
		}
		else{
			res.redirect('/logout');
		}
	}
	else{
		res.redirect('/');
	}
   
});
*/

//guest home
router.get('/guestHome', (req, res) => {
        if(req.session.ID){
                if(req.session.client == "admin"){
                        res.redirect("/admin/adminHome");
                }
                else if(req.session.client == "guest"){

					Team.aggregate([
					 { $lookup:
					     {
					       from: "Students",
					       localField : "students",
					       foreignField : "roll",
					       as: "studentsList"
					     }
					     }
					
					],(err,validTeams)=>{
					        if(err) throw err;
					        else{
					        	res.render('./guest/guestHome.ejs',{
					        		validTeams : validTeams
					        	})
					        }
					})
					/*
                    Team.find({},(err,validTeams)=>{
                            if(err) throw err;
                            res.render('./guest/guestHome.ejs',{
                                    validTeams : validTeams
                            })
                    })*/
                }
                else if(req.session.client == "teacher"){
                        res.redirect("/teacher/teacherHome");
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
router.get('/guestMidsem/:teamName',(req,res)=>{
        if(req.session.ID){
                if(req.session.client == "guest"){
                        Team.findOne({teamId : req.params.teamName},(err,validTeam)=>{
                        var members = [validTeam.students[0],validTeam.students[1],validTeam.students[2],validTeam.students[3]];
                        var teamName = validTeam.projectTitle;
                        var description = validTeam.description;
                        MajorScheme.findOne({},(err,validScheme)=>{
                                var fields = validScheme.fields;
                                res.render('./guest/guestMidsem.ejs',{
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
                else if(req.session.client == "teacher"){
                        res.redirect('/teacher/teacherHome')
                }
        }
        else{
                res.redirect("/");
        }
})
router.post('/guestMidsem',(req,res)=>{
	Student.findOne({roll : req.body.studentId},(err,validStudent)=>{
		if(err) res.send("error occuered");
		else{
			validStudent.midsemGuest = req.body.total;
			validStudent.save((err,data)=>{
				if(err) res.send("error occuered");
				else{
					res.send("marks added successfully !");
				}
			})
		}
	})
})

router.get('/guestEndsem/:teamName',(req,res)=>{
        if(req.session.ID){
                if(req.session.client == "guest"){
                        Team.findOne({teamId : req.params.teamName},(err,validTeam)=>{
                        var members = [validTeam.students[0],validTeam.students[1],validTeam.students[2],validTeam.students[3]];
                        var teamName = validTeam.projectTitle;
                        var description = validTeam.description;
                        MajorScheme.findOne({},(err,validScheme)=>{
                                var fields = validScheme.fields;
                                res.render('./guest/guestEndsem.ejs',{
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
                else if(req.session.client == "teacher"){
                        res.redirect('/teacher/teacherHome')
                }
        }
        else{
                res.redirect("/");
        }
})

router.post('/guestEndsem',(req,res)=>{
	Student.findOne({roll : req.body.studentId},(err,validStudent)=>{
		if(err) res.send("error occuered");
		else{
			validStudent.endsemGuest = req.body.total;
			validStudent.save((err,data)=>{
				if(err) res.send("error occuered");
				else{
					res.send("marks added successfully !");
				}
			})
		}
	})
})

//logout
router.get('/logout',(req,res)=>{
	req.session.destroy((err,data)=>{
		res.redirect('/');
	})
})

//guest
module.exports = router;
