/* import models */
const users = require('../Modals/userSchema')

/* import Jwt jsonwebtoken */
const jwt = require('jsonwebtoken')

/* Logics for register */
exports.register = async(req, res)=>{
    console.log("Inside user controller logics");
    
    /* getting the req data and savinfg it into the variables */ /* the incoming requests is in json format and it is parsed alredy in the index.js file */
    const {username, email, password, github, linkedin, profile} = req.body
    try{
        /* Checking if the emaiul is already present in the database or not */
        const existingUser = await users.findOne({email: email})
        if(existingUser){
            /* Client request eror */
            res.status(406).json("User Already Exists.. Please Login")
        }
        else{
            /* creating a new object for users */
            const newUser = new users({
                username: username,
                email: email,
                password: password,
                github: github,
                linkedin,
                profile
            })

            /* use save() method in mongoose to save*/
            await newUser.save() /* await because both are on different serveres */
            // res.status(200).json("User Registered Successfully")
            res.status(200).json(newUser)
        }
    /* catching the error using try catch  */
    }catch(err){
        res.status(401).json(`Register request failed due to ${err}`)
    }
    
}

/* Logic for Login */
exports.login = async(req, res)=>{

    console.log("Inside Login Function");
    const {email, password} = req.body
    console.log(email,password);
    try{
        /* Checking if the email and password is present in the documents */
        const userCheck = await users.findOne({email: email, password: password})
        if(userCheck){
            console.log("User Checked");
            /* creating token using jwt token jwt sign method */
            /* passing the user id taken from the usercheck value, Give a secret key  */
            /* the payload is passed secrectly through the token the token will hold the user id  */
            const token = jwt.sign({userId: userCheck.id}, "mySecrectKeyForProject")
            console.log("token", token);
            res.status(200).json({
                loggedInUser: userCheck,
                token: token
            })
        }
        else{
            console.log("User Invalid Checked");
            res.status(404).json("Invalid Email or Password")
            // No need for 'return;' here, but adding it can enhance readability
            return
        }
    }
    catch(err){
        console.log("Error catch", err);
        res.status(401).json(`Login failed: ${err.message}`);
    }
}

//update profile
exports.editUser = async(req,res)=>{
    /*  */
    console.log("efiyd user");
    const userId = req.userId
    const {username,email,password,github,linkedin,profile} = req.body
    const uploadImage = req.file?req.file.filename:profile
    try {

        const updateUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profile:uploadImage},{new:true})

        await updateUser.save()
        res.status(200).json(updateUser)

        
    } catch (err) {
        res.status(401).json(err)
    }

}