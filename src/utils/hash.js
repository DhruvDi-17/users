const bcypt = require('bcryptjs')

exports.HashPassword= async(password)=>{
    try { 
        return await bcypt.hash(password,10)
    } catch (err) {
        console.log("Error To Generate Hash Password",err)
    }
}
exports.ComparePassword= async(password,hash)=>{
    try{
        return await bcypt.compare(password,hash)
    }catch(err){
        console.log("Error",err);
        
    }
}