var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var teamSchema = mongoose.Schema({
    teamId: {
        type: String
    },
    projectTitle: {
    	type: String
    },
    students : [String],
    teamType:{
        type:String
    },
    description:{
        type:String
    }

    
});
// Export Team model
 module.exports = {
     Team:mongoose.model('Team', teamSchema,"Teams"),
}
