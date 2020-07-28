var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var studentSchema= mongoose.Schema({
    studentName: {
        type: String
    },
    roll:{
        type: String
    },
    batch:{
        type: String
    },
    guideName:{
        type:String
    },
    teamFormed:{
        type:Boolean
    },
    midsemTeacher:{
        type:Number
    },
    midsemPannel : [Number],
    midsemGuest:{
        type:Number
    },
    endsemTeacher:{
        type: Number
    },
    endsemPannel : [Number],
    endsemGuest:{
        type: Number
    },
    grade:{
        type:String
    },
});
// Export Team model
 module.exports = {
     Student:mongoose.model('Student',studentSchema,"Students")
}
