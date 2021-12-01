const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/eventApp',{
    useNewUrlParser:true
})

const Eventuser=mongoose.model('Eventuser',{
    userid:Number,
    username:String,
    password:String,
    event:[]
})
module.exports={
    Eventuser
}