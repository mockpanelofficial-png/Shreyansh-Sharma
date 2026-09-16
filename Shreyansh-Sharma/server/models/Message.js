const mongoose=require('mongoose');
const MessageSchema=new mongoose.Schema({name:{type:String,required:true,trim:true,maxlength:100},email:{type:String,required:true,trim:true,maxlength:160},message:{type:String,required:true,trim:true,maxlength:3000},read:{type:Boolean,default:false}},{timestamps:true});
module.exports=mongoose.model('Message',MessageSchema);
