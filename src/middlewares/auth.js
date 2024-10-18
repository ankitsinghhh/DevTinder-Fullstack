const adminAuth =  (req,res,next)=>{
    console.log("Admin Auth is getting checked")
    //Logic of checking if request is authorised
   const token = "xyz"
   const isAdminAuthorized = token === "xyz"

   if(!isAdminAuthorized){
       res.status(401).send("Unauthorized Admin Access ")
   }
   else{
       console.log("Admin Authorized")
       next()
   }

}

const userAuth =  (req,res,next)=>{
    console.log("user Auth is gettting checked")

    //Logic of checking if request is authorised
   const token = "abc"
   const isUserAuthorized = token === "abc"

   if(!isUserAuthorized){
       res.status(401).send("Unauthorized User Access")
   }
   else{
       console.log("User Authorized")
       next()
   }

}

module.exports = {
    adminAuth,
    userAuth,
 
};