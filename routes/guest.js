var express = require('express');
var router = express.Router();
var GuestLogin = require('../Models/guestLogin').GuestLogin;
var Team = require('../Models/team').Team;
var MajorScheme = require('../Models/majorScheme').majorScheme;
//guest 
//guestLogin session

router.post('/',(req,res)=>{
        GuestLogin.findOne({guestName : req.body.username, guestPass : req.body.password},(err,ValidGuest)=>{
                if(ValidGuest == null){
                        console.log('incorrect data');
                        res.redirect('/');
                }
                else{
                        console.log('success');
                        req.session.ID = req.body.username;
                        req.session.user = "guest";
                        res.redirect('/guest');
                }
        })
});
//guestHome Page
router.get('/', (req, res) => {
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
})

router.get('/midsem/:teamName',(req,res)=>{
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
});

router.get('/endsem/:teamName',(req,res)=>{
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
});
//logout
router.get('/logout',(req,res)=>{
	req.session.destroy((err,data)=>{
		res.redirect('/');
	})
})

//guest
module.exports = router;
