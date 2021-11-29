const express=require("express")
const mongoose=require("mongoose");
const app=express();
app.use(express.json())
function connect(){
    return mongoose.connect('mongodb://127.0.0.1:27017/test3')
}
//companies schema
const companyschema=new mongoose.Schema({
    job_profile:{type:String, required:true},
    ratings:{type:Number, required:true},
    notice_period:{type:String, required:true},
    company_name:{type:String, required:true},
    job_type:{type:String, required:true},
    openings:{type:Number, required:true},
},
{
    versionKey:false,
    timestamps:true,

});
const Company=mongoose.model("company",companyschema);
const cityschema=new mongoose.Schema({
    location:{type:String, required:true},
    company_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"company",
        required:true,

    },
    skill_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"skill",
        required:true,  
    }
},
{
    versionKey:false,
    timestamps:true,

});
const City=mongoose.model("city",cityschema);
const skillschema=new mongoose.Schema({
    skill:{type:String, required:true},
    company_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"company",
        required:true,

    }
},
{
    versionKey:false,
    timestamps:true,

});
const Skill=mongoose.model("skill",skillschema);
//company crud
app.post('/company', async(req,res)=>{
    const com=await Company.create(req.body);
    return res.send(com)
})
app.get('/company/job',async(req,res)=>{
    const com=await Company.find({job_type:"work from home"}).lean().exec();
    return res.send(com)
})
 app.get('/company/notice',async(req,res)=>{
    const com=await Company.find({notice_period:"15 days"}).lean().exec();
    return res.send(com)
 })
 app.get('/company/rating',async(req,res)=>{
    const com=await Company.find().sort({ratings:-1}).lean().exec();
    return res.send(com)
 })
 app.get('/company/opening',async(req,res)=>{
    const com=await Company.find().sort({openings:-1}).lean().exec();
    return res.send(com[0])
 })

//city crud
app.post('/city', async(req,res)=>{
    const com=await City.create(req.body);
    return res.send(com)
})
app.get('/city',async(req,res)=>{
    const com=await City.find().lean().exec();
    return res.send(com)
})
app.get('/city/:id',async(req,res)=>{
    const com=await City.findById(req.params.id).populate({path:"skill_id",select:"skill"}).lean().exec();
    return res.send(com)
})
//skill crud
app.post('/skill', async(req,res)=>{
    const com=await Skill.create(req.body);
    return res.send(com)
})
app.get('/skill',async(req,res)=>{
    const com=await Skill.find().lean().exec();
    return res.send(com)
})
app.listen(4444,async()=>{
    await connect();
    console.log("server is running")
})
