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
					
			Teacher.findOne({teacherID : req.session.ID},{_id : 0, major_teams : 1},(err,validTeacher)=>{
				Team.aggregate([
				 { $lookup:
				     {
				       from: "Students",
				       localField : "students",
				       foreignField : "roll",
				       as: "studentsList"
				     }
				     },
				     {
				        $match :
				        {
				                "teamId" : {$in : validTeacher.major_teams}
				        }
				     }
				
				],(err,validTeams)=>{
				        if(err) throw err;
				        else{
				        	res.render('./teacher/teacherHome.ejs',{
				        		validTeams : validTeams
				        	})
				        }
				})
				
				/*
				Team.find({ teamId : { $in : validTeacher.major_teams }},(err,validTeams)=>{
					if(err) throw err;
					res.render('./teacher/teacherHome.ejs',{
						validTeams : validTeams
					})
				})
				*/
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
			Team.findOne({teamId : req.params.teamName},(err,validTeam)=>{
	                var members = [validTeam.students[0],validTeam.students[1],validTeam.students[2],validTeam.students[3]];
	                var teamName = validTeam.projectTitle;
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
// assign marks
router.post('/guideMidsem',(res,req)=>{
	console.log(req.body.studentId);
	console.log(req.body.total);
	console.log(req.body.comments);
})

router.get('/guideEndsem/:teamName',(req,res)=>{
	if(req.session.ID){
		if(req.session.client == "teacher"){
			Team.findOne({teamId : req.params.teamName},(err,validTeam)=>{
	                var members = [validTeam.students[0],validTeam.students[1],validTeam.students[2],validTeam.students[3]];
	                var teamName = validTeam.projectTitle;
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
					if(err) throw err;
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


router.post('/addMajorTeam', (req, res) => {
    Teacher.findOne({ teacherID: req.session.ID }, (err, validTeacher) => {
    	var count = validTeacher.major_teams.length+1;
        var teamId = "Guide"+validTeacher.teacherID+"team"+count;
        validTeacher.major_teams.push(teamId);
        validTeacher.save();
        Student.findOne({ roll: req.body.member1 }, (err, validStudent) => {
            validStudent.teamFormed = true;
            validStudent.save()

        })
        Student.findOne({ roll: req.body.member2 }, (err, validStudent) => {
            validStudent.teamFormed = true;
            validStudent.save()

        })
        if(req.body.member3 != "") {
        Student.findOne({ roll: req.body.member3 }, (err, validStudent) => {
            validStudent.teamFormed = true;
            validStudent.save()

        })
        }
        if (req.body.member4 != "") {
            Student.findOne({ roll: req.body.member4 }, (err, validStudent) => {
                validStudent.teamFormed = true;
                validStudent.save()

            })

        }
	    students =[];
	    if(req.body.member1!=""){
	    	students.push(req.body.member1);
	    }
	    if(req.body.member2!=""){
	    	students.push(req.body.member2);
	    }
	    if(req.body.member3!=""){
	    	students.push(req.body.member3);
	    }
	    if(req.body.member4!=""){
	    	students.push(req.body.member4);
	    }
	    var newTeam = new Team(
	        {
	            teamId: teamId,
	            projectTitle : req.body.projectTitle,
	            students : students,
	            description: req.body.description
	        });
	    newTeam.save(function (err, team) {
	        if (err) return console.error(err);
	        res.send("success");
	    });
    })

})




router.get('/pannelHome',(req,res)=>{
	Teacher.find({pannel_teachers : {$all : [req.session.ID]}},{_id : 0, major_teams : 1},(err,teamsId)=>{
		teams = [];
		for(let i=0; i<teamsId.length; i++){
			teams = teams.concat(teamsId[i].major_teams);
		}
		Team.aggregate([
        	{ $lookup:
        		{
        			from: "Students",
                    localField : "students",
                    foreignField : "roll",
                    as: "studentsList"
                }
            },
            {
                $match :
            		{
            			"teamId" : {$in : teams}
                    }
           	}

        ],(err,validTeams)=>{
        	if(err) throw err;
            else{
            	res.render('./teacher/pannelHome.ejs',{
                	validTeams : validTeams
                })
            }
        })
		/*
		Team.find({ teamId : { $in : teams }},(err,validTeams)=>{
			if(err) throw err;
			res.render('./teacher/pannelHome.ejs',{
				validTeams : validTeams
			})
		})
		*/
	})
})
//pannel mid sem
router.get('/pannelMidsem/:teamName',(req,res)=>{
	if(req.session.ID){
		if(req.session.client == "teacher"){
			Team.findOne({teamId : req.params.teamName},(err,validTeam)=>{
	                var members = [validTeam.students[0],validTeam.students[1],validTeam.students[2],validTeam.students[3]];
	                var teamName = validTeam.projectTitle;
	                var description = validTeam.description;
	                MajorScheme.findOne({},(err,validScheme)=>{
	                        var fields = validScheme.fields;
	                        res.render('./teacher/pannelMidsem.ejs',{
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

router.get('/pannelEndsem/:teamName',(req,res)=>{
	if(req.session.ID){
		if(req.session.client == "teacher"){
			Team.findOne({teamId : req.params.teamName},(err,validTeam)=>{
	                var members = [validTeam.students[0],validTeam.students[1],validTeam.students[2],validTeam.students[3]];
	                var teamName = validTeam.projectTitle;
	                var description = validTeam.description;
	                MajorScheme.findOne({},(err,validScheme)=>{
	                        var fields = validScheme.fields;
	                        res.render('./teacher/pannelEndsem.ejs',{
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


//panel home page
/*
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
*/
router.get('/logout',(req,res)=>{
	req.session.destroy((err,data)=>{
		res.redirect('/');
	})
})

module.exports = router;
