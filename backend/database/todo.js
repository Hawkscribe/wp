const mongoose =require("mongoose");
const schema=mongoose.schema;
const objectId=schema.ObjectId;

const  todo=new SchemaTypes({
    tittle:String,
    done:Boolean,
    userId:objectId,
})
const user=new mongoose.SchemaTypes({
    name:String,
    password:Number,
    email:String
})
const UserModel=mongoose.model('user',UserModel);
const TodoModel=mongoose.model('todo',TodoModel);

module.exports={
TodoModel:TodoModel,
UserModel:UserModel
}