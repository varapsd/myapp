var express = require('express');
var router = express.Router();

TeacherLogin = require("../Models/teacherLogin").TeacherLogin;
Teacher = require("../Models/teacher").Teacher;
Student = require("../Models/student").Student;
courseDetails=require("../Models/courseDetails").courseDetails;
var Team = require("../Models/team").Team;
var GuestLogin = require("../Models/guestLogin").GuestLogin;
var AdminLogin = require("../Models/adminLogin").AdminLogin;
var evaluators=require("../Models/evaluators").evaluators;
majorScheme = require('../Models/majorScheme').majorScheme;

//admin login

router.get('/adminHome', (req, res) => {
	if(req.session.ID){
		if(req.session.client == "admin"){
			res.render("./admin/adminHome.ejs");
		}
		else if(req.session.client == "teacher"){
			res.redirect("/teacher/teacherHome");
		}
		else if(req.session.client == "guest"){
			res.redirect("/guest/guestHome");
		}
		else{
			res.redirect("/logout")
		}
	}
	else{
		res.redirect("/");
	}
    
})

router.get('/addGuest', (req, res) => {
	if(req.session.ID){
		if(req.session.client == "admin"){
			 res.render("./admin/addGuest.ejs");
		}
		else if(req.session.client == "teacher"){
			res.redirect("/teacher/teacherHome");
		}
		else if(req.session.client == "guest"){
			res.redirect("/guest/guestHome");
		}
		else{
			res.redirect("/logout")
		}
	}
	else{
		res.redirect("/");
	}
  
})

router.get('/assignStudent',(req,res)=>{
	if(req.session.ID){
		if(req.session.client == "admin"){
			 res.render("./admin/assignStudent.ejs");
		}
		else if(req.session.client == "teacher"){
			res.redirect("/teacher/teacherHome");
		}
		else if(req.session.client == "guest"){
			res.redirect("/guest/guestHome");
		}
		else{
			res.redirect("/logout")
		}
	}
	else{
		res.redirect("/");
	}

    
})

/*
* handle adding a new guest
*/
router.post('/addGuest', (req, res) => {
    var newGuest = new GuestLogin({
        guestName: req.body.guest,
        guestPass: req.body.guestPass
    })
    console.log(newGuest);
    newGuest.save().then(guest => {
        res.send("Success");
    })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });


})

router.get('/setupCourse',(req,res)=>{
	if(req.session.ID){
		if(req.session.client == "admin"){
			 res.render("./admin/coursestruct2.ejs");
		}
		else if(req.session.client == "teacher"){
			res.redirect("/teacher/teacherHome");
		}
		else if(req.session.client == "guest"){
			res.redirect("/guest/guestHome");
		}
		else{
			res.redirect("/logout")
		}
	}
	else{
		res.redirect("/");
	}
	
    
})

router.get('/setCourseDetails',(req,res)=>{
	if(req.session.ID){
		if(req.session.client == "admin"){
			 res.render("./admin/courseDetails.ejs");
		}
		else if(req.session.client == "teacher"){
			res.redirect("/teacher/teacherHome");
		}
		else if(req.session.client == "guest"){
			res.redirect("/guest/guestHome");
		}
		else{
			res.redirect("/logout")
		}
	}
	else{
		res.redirect("/");
	}

    
})

router.post('/setCourseDetails',(req,res)=>{
    courseDetails.findOne({},(err,newCourse)=>{
            newCourse.courseName= req.body.name,
            newCourse.courseCode= req.body.code,
            newCourse.courseInstructor= req.body.instructor,
            newCourse.courseCredits= req.body.credits,
            newCourse.hoursPerWeek= req.body.hours
            newCourse.save(function (err, team) {
                if (err) return console.error(err);
            });
            res.send("added");
        });



})

router.get('/setEvaluators',(req,res)=>{
	if(req.session.ID){
		if(req.session.client == "admin"){
			 res.render("./admin/step2.ejs");
		}
		else if(req.session.client == "teacher"){
			res.redirect("/teacher/teacherHome");
		}
		else if(req.session.client == "guest"){
			res.redirect("/guest/guestHome");
		}
		else{
			res.redirect("/logout")
		}
	}
	else{
		res.redirect("/");
	}
    
})

router.post('/setEvaluators',(req,res)=>{
    evaluators.findOne({},(err,newEvaluators)=>{

        newEvaluators.guideWeightage= req.body.gw,
        newEvaluators.pannelNum=req.body.np,
        newEvaluators.pannelWeightage=req.body.pw,
        newEvaluators.taNum=req.body.nt,
        newEvaluators.taWeightage=req.body.tw

        newEvaluators.save(function (err, team) {
        if (err) return console.error(err);
    })
    router.send("added");
})

})

router.get('/setEvalScheme',(req,res)=>{
	if(req.session.ID){
		if(req.session.client == "admin"){
			 res.render("./admin/step3.ejs")
		}
		else if(req.session.client == "teacher"){
			res.redirect("/teacher/teacherHome");
		}
		else if(req.session.client == "guest"){
			res.redirect("/guest/guestHome");
		}
		else{
			res.redirect("/logout")
		}
	}
	else{
		res.redirect("/");
	}
    
})

router.post('/setEvalScheme',(req,res)=>{
    req_fields=[]
    req_fields.push(req.body.f1);
    req_fields.push(req.body.f2);
    req_fields.push(req.body.f3);
    req_fields.push(req.body.f4);
    req_fields.push(req.body.f5);
    req_fields.push(req.body.f6);
    majorScheme.findOne({},(err,newEvalScheme)=>{
        newEvalScheme.fields=req_fields,
        newEvalScheme.save(function (err, team) {
            if (err) return console.error(err);
        });
        res.send("added");
    });
})

router.get('/assign',(req,res)=>{
	if(req.session.ID){
		if(req.session.client == "admin"){
			 res.render("./admin/step4.ejs");
		}
		else if(req.session.client == "teacher"){
			res.redirect("/teacher/teacherHome");
		}
		else if(req.session.client == "guest"){
			res.redirect("/guest/guestHome");
		}
		else{
			res.redirect("/logout")
		}
	}
	else{
		res.redirect("/");
	}
})


router.get('/assignGuides',(req,res)=>{
	if(req.session.ID){
		if(req.session.client == "admin"){
			//assign logic 
		    teachers=[]
		    students=[]
		    Teacher.find({},(err,Teachers)=>{
		        for (var i = 0; i < Teachers.length; i++){
		            teachers.push(Teachers[i].teacherName)
		        }
		        Student.find({},(err,Students)=>{
		            for (var i = 0; i < Students.length; i++){
		               newStud={
		                   "name":Students[i].studentName,
		                   "roll":Students[i].roll
		               }
		               students.push(newStud)
		            }
		            res.render("./admin/assignGuides.ejs",{teachers:teachers,students:students})
		        })

		    })
		    //logic ends
		}
		else if(req.session.client == "teacher"){
			res.redirect("/teacher/teacherHome");
		}
		else if(req.session.client == "guest"){
			res.redirect("/guest/guestHome");
		}
		else{
			res.redirect("/logout")
		}
	}
	else{
		res.redirect("/");
	}
})

router.post('/assignGuides',(req,res)=>{
    students=req.body.students.split(',')
    var over=-1;
    Teacher.findOne({teacherName:req.body.teacher},(err,validTeacher)=>{
        if(err!=null)console.log(err)
        for(var i=0;i<students.length;i++){
            students[i]=students[i].trim()

            validTeacher.major_students.push(students[i])
            console.log(students[1]=="161IT113-C")
            Student.findOne({roll:students[i]},(err,validStudent)=>{
                if(err!=null)console.log(err)
                console.log(validStudent.studentName)
                console.log(i)
                validStudent.guideName=req.body.teacher;
                if(i==students.length-1){
                    console.log("*")
                    over=1;
                }
            })

        }

    })
        if(over==1){
            console.log("heeyy")
            res.send("success!")
        }
})


router.get('/assignPannel',(req,res)=>{
	if(req.session.ID){
		if(req.session.client == "admin"){
			 
		    teachers=[]
		    Teacher.find({},(err,Teachers)=>{
		        for (var i = 0; i < Teachers.length; i++){
		           newTeacher={
		               "name":Teachers[i].teacherName,
		               "id":Teachers[i].teacherID
		           }
		           teachers.push(newTeacher)
		        }
		        res.render("./admin/assignPannel.ejs",{teachers:teachers})
		    })
		}
		else if(req.session.client == "teacher"){
			res.redirect("/teacher/teacherHome");
		}
		else if(req.session.client == "guest"){
			res.redirect("/guest/guestHome");
		}
		else{
			res.redirect("/logout")
		}
	}
	else{
		res.redirect("/");
	}

});
//display marks

router.get('/displayMarks',(req,res)=>{
	if(req.session.ID){
		if(req.session.client == "admin"){
			  Student.find({},(err,students)=>{
                res.render('./admin/displayMarks',{ students : students});
        	})
		}
		else if(req.session.client == "teacher"){
			res.redirect("/teacher/teacherHome");
		}
		else if(req.session.client == "guest"){
			res.redirect("/guest/guestHome");
		}
		else{
			res.redirect("/logout")
		}
	}
	else{
		res.redirect("/");
	}

//check
})

router.get('/logout',(req,res)=>{
	req.session.destroy((err,data)=>{
		res.redirect('/');
	})
})
module.exports = router ;
