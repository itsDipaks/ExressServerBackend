const {Router} = require("express");
const {UserModel} = require("../Models/User.model");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const AuthRouter = Router();
require("dotenv").config()

const secretkey=process.env.SECRETKEY

AuthRouter.post("/signup", (req, res) => {
  const { email, password} = req.body;
  console.log("passsword",password)
  console.log(email)
  const checkuserExist = UserModel.findOne({email});
  if (checkuserExist==0) {
    res.send("User Already Exist Please Login");
  } else {
    try {
      bcrypt.hash(password, 4, async function (err, hashedPassword) {
        console.log(hashedPassword)
        if (err) {
          res.send({
            msg: "something Wents Wrong with hashing password",err:err
          });
        } else {
            console.log(hashedPassword)
          try {
            const savedata =new UserModel({email, password:hashedPassword});
            await savedata.save();
            res.send({msg: "Signup Successfull"});
          } catch (err) {
            res.send({msg: "Something Wents Wrong Data Not stored", err: err});
          }
        }
      });
    } catch (err) {
      res.send({msg: "something Wents Wrong Please Try Again" ,err:err});
    }
  }
});


// AuthRouter.post("/signup" ,async (req, res) => {
//   const {email} = req.body;
//   console.log(req.body)
//   const checkExist = await UserModel.findOne({email});
//   if (checkExist) {
//     res
//       .status(502)
//       .send({msg: "User Already Exist With this Email Plase Login !!"});
//   } else {
//     const {email, password} = req.body;
//     bcrypt.hash(password, 4, async function (err, hashedpassword) {
//       console.log(hashedpassword)
//       if (err) {
//         res.send({msg: "Something wents wrong ", err: err});
//       } else {
//         try {
//           const setuser = new UserModel({
//             email,
//             password: hashedpassword,
//           });
//           await setuser.save();
//           res.status(201).json({msg: "Signup Sucessfully"});
//         } catch (err) {
//           res
//             .status(500)
//             .json({msg: "something wents wrong to uploading the data"});
//         }
//       }
//     });
//   }
// });

AuthRouter.post("/login", async(req, res) => {
    const {email,password}=req.body
const isSignup=await UserModel.findOne({email})
if(isSignup){
const HashedPasswored=isSignup.password
const user_id=isSignup._id
    console.log(user_id)
    try{

        bcrypt.compare(password, HashedPasswored, function(err, result) {
            if(result){
try{
    var token = jwt.sign({ user_id: user_id},secretkey);
    res.send({msg:"Login Success",token:token})
}catch(err){
res.send({msg:"Something Wents Wrong"})
}
               
            }else{
                res.send({msg:"Wrong Password Please try again"})
            }
        });

    }catch(err){

res.send("Something Wents Wrong Plsease Try Again")
    }



}else{
    res.send({msg:"User Not Exist With This email please Signup first"})
}

});

module.exports = {AuthRouter};
