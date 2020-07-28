var express = require('express');
var multer = require('multer');
var router = express.Router();
var csvtojson = require('csvtojson');
TeacherLogin = require("../Models/teacherLogin").TeacherLogin;
Teacher = require("../Models/teacher").Teacher;
Student = require("../Models/student").Student;
courseDetails=require("../Models/courseDetails").courseDetails;
var Team = require("../Models/team").Team;
var GuestLogin = require("../Models/guestLogin").GuestLogin;
var AdminLogin = require("../Models/adminLogin").AdminLogin;
var evaluators=require("../Models/evaluators").evaluators;
majorScheme = require('../Models/majorScheme').majorScheme;


var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, 'teacher.csv');
  }
});
var storage2 =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, 'student.csv');
  }
});
var upload = multer({ storage : storage}).single('teacher');
var upload2 = multer({ storage : storage2}).single('student');



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
    newCourse = new courseDetails({
    	courseName : req.body.name,
    	courseCode : req.body.code,
    	courseInstructor : req.body.instructor,
    	courseCredits : req.body.credits,
    	hoursPerWeek : req.body.hours
    });
    newCourse.save((err)=>{
    	if(err) res.send("error occured");
    	else{
    		res.send("added");
    	}
    })
    /*
    courseDetails.findOne({},(err,newCourse)=>{
    		if(err) throw err;
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
	*/


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
	newEvaluators = new evaluators({
		guideWeightage : req.body.gw,
		pannelNum : req.body.np,
		pannelWeightage : req.body.pw,
		taNum : req.body.nt,
		taWeightage : req.body.tw
	});
	newEvaluators.save((err)=>{
		if(err) res.send("error occuered");
		else{
			res.send("added");
		}
	})
	/*
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
*/

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
    //req_fields=[];
    req_fields=req.body.schemeList.split(",");
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
		    let teachers=[]
		    let students=[]
		    Teacher.find({},(err,Teachers)=>{
		        for (var i = 0; i < Teachers.length; i++){
		            teachers.push(Teachers[i].teacherName)
		        }
		        Student.find({guideName : { $eq : null}},(err,Students)=>{
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
    students=req.body.students.split(',');
    teacher = req.body.teacher;
	Teacher.findOne({teacherName : teacher},(err,validTeacher)=>{
		validTeacher.major_students = students;
		validTeacher.save((err,data)=>{
			if(err) throw err;
			Student.update({roll :{$in : students}},[
				{
					$set : { guideName : validTeacher.teacherName }
				}
			],{
				multi : true
			},(err,data)=>{
				if(err) throw err;
				console.log("updated");
				res.send("Success!");
			})
		})
	})    
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

router.post("/assignPannel",(req,res)=>{
	list = req.body.list.split(',');
	Teacher.findOne({teacherID : req.body.teacherId},(err,validTeacher)=>{
		if(err) req.send("error occured");
		else{
			validTeacher.pannel_teachers = list;
			validTeacher.save((err)=>{
				if(err) res.send("error");
				else{
					res.send("Pannel assigned!!");
				}
			})
			
		}
	})
})
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
var teachers1 = [];
var teachersLogin = [];
router.get('/insertData',(req,res)=>{
	res.render('./admin/insertData.ejs',{ teachers : teachers1});
});
router.post('/delTeachers',(req,res)=>{
	Teacher.remove((err,data)=>{
		if(err) throw err;
		TeacherLogin.remove((err,data)=>{
			if(err) throw err;
			res.send("droped teachers");
		});
	})
})
router.post('/insertTeachers',(req,res)=>{
	Teacher.insertMany(teachers1,(err,data)=>{
		if(err) throw err;
		TeacherLogin.insertMany(teachersLogin,(err,data)=>{
			if(err) throw err;
			teachers1 = [];
			teachersLogin =[];
			res.send('Success');
		});
	})
})
router.post('/insertData',(req,res)=>{
	upload(req,res,function(err) {
	        if(err) {
	        	console.log(err);
	            return res.end("Error uploading file.");
	        }
	        res.redirect('/admin/dataCheck');
	    });
})
router.get('/dataCheck',(req,res)=>{
	csvtojson()
	  .fromFile("./public/uploads/teacher.csv")
	  .then(csvData => {
	  	teachers1 = [];
	    for(let i = 0; i < csvData.length ; i++){
	    	var fieldkeys = Object.keys(csvData[0]);
	    	var teacher = new Teacher({
	    		teacherID : csvData[i][fieldkeys[0]],
	    		teacherName : csvData[i][fieldkeys[1]],
	    		major_teams : [],
	    		pannel_teachers : []
	    	})
	    	teachers1.push(teacher);
	    	var loginTeacher = new TeacherLogin({
	    		tId : teacher.teacherID,
	    		userName : teacher.teacherName,
	    		password : teacher.teacherName
	    	})
	    	teachersLogin.push(loginTeacher);
	    	/*
	    	tId: {
	    	        type: String
	    	    },
	    	    userName:{
	    	        type: String
	    	    },
	    	    password:{
	    	        type: String
	    	    }
	    	*/
	    }
	    res.redirect('/admin/insertData');
	    });
});
//students list
var students1 = [];
router.get('/students',(req,res)=>{
	res.render('./admin/studentData.ejs',{ students : students1 });
});
router.post('/delStudents',(req,res)=>{
	Student.remove((err,data)=>{
		if(err) throw err;
		res.send("droped students");
	})
})
router.post('/insertStudents',(req,res)=>{
	Student.insertMany(students1,(err,data)=>{
		if(err) throw err;
		students1 = [];
		res.send('Success');
	})
})
router.post('/studentData',(req,res)=>{
	upload2(req,res,function(err) {
	        if(err) {
	        	console.log(err);
	            return res.end("Error uploading file.");
	        }
	        res.redirect('/admin/studentDataCheck');
	    });
})
router.get('/studentDataCheck',(req,res)=>{
	csvtojson()
	  .fromFile("./public/uploads/student.csv")
	  .then(csvData => {
	  	students1 = [];
	    for(let i = 0; i < csvData.length ; i++){
	    	var fieldkeys = Object.keys(csvData[0]);
	    	var student = new Student({
	    		roll : csvData[i][fieldkeys[0]],
	    		studentName : csvData[i][fieldkeys[1]],
	    		batch : csvData[i][fieldkeys[2]],
	    		guideName : null,
	    		teamFormed : false,
	    		midsemTeacher : null,
	    		midsemPannel : [-1,-1,-1,-1,-1,-1],
	    		midsemGuest : null,
	    		endsemTeacher : null,
	    		endsemPannel : [-1,-1,-1,-1,-1,-1],
	    		endsemGuest : null,
	    		grade : null
	    	})
	    	students1.push(student);
	    }
	    res.redirect('/admin/students');
	    });
});

router.get('/logout',(req,res)=>{
	req.session.destroy((err,data)=>{
		res.redirect('/');
	})
})
module.exports = router ;
