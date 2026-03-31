const bcrypt=require('bcrypt')

const hashedPassword=async(password)=>{
    const saltRounds=10;
    return await bcrypt.hash(password,saltRounds)
}
module.exports=hashedPassword