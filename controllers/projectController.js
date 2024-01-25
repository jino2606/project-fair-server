/* import project schema */
const projects = require('../Modals/projectSchema')

/* Logic for adding the project */
exports.addProject = async(req, res)=>{
    console.log("Inside Add Projeccts");

    const userId = req.userId
    
    const projectImage = req.file.filename

    const {title, language, github, website, overview} = req.body

    console.log("userId : ", title, language, github, website, overview);

    try {
        const existingProject = await projects.findOne({github: github})
        console.log("Existingg", existingProject);
        if(!existingProject){
            
            const newProject = new projects({
                title,
                language,
                github,
                website,
                overview,
                projectImage,
                userId
            })

            await newProject.save()
            res.status(200).json(newProject)
        }
        else{
            res.status(401).json(`Project already exists.. Add New`)
        }
        
    } catch (error) {
        res.status(401).json(`Request failed due to :${error}`)  
    }
}

/* get home projects */
exports.getHomeProjects = async(req, res)=>{
    console.log("Inside getHomeProjects");

    try {

        const allProject = await projects.find().limit(3)
        res.status(200).json(allProject)
        
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}


/* get all project */
exports.getAllProjects = async(req, res)=>{

    /* getting the search kwy from request param */
    const searchKey = req.query.search

    const query = {
        language:{
            $regex:searchKey, /* search key as regular expression */
            $options: 'i' /* option to remove case sensitive property while search */
        }
    }

    console.log(searchKey);
    try {
        const allProject = await projects.find(query)
        res.status(200).json(allProject)
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

/* get user projects */
exports.getUserProjects = async(req, res)=>{
    console.log("Inside user asda getHomeProjects");
    userId = req.userId
    console.log(userId);
    try {
        const allProject = await projects.find({userId})
        res.status(200).json(allProject)
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

exports.updateUserProject = async(req, res)=>{
    console.log("Inside Editt Projeccts");

    /* project id */
    const {id} = req.params

    const userId = req.userId
    
    const {title, language, github, website, overview, projectImage} = req.body

    console.log("userId : ", title, language, github, website, overview);

    try {
        const uploadProjectImage = req.file?req.file.filename:projectImage
        console.log("afrterimgade", uploadProjectImage);
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,language,overview,github,website,projectImage:uploadProjectImage,userId},{new:true})

        console.log("update Searcvh", uploadProjectImage);

        await updateProject.save()

        console.log("update save");
        res.status(200).json(updateProject)
        
    } catch (err) {       
        console.log(err);
        res.status(401).json(err) 
    }
}


//delete project
exports.deleteUserProject = async(req,res)=>{

    const {id}=req.params

    try {
        //deleteOne - can be used by the deleteOne method will return true or false - i need to get thr deleted document to send response
         const removeProject = await projects.findByIdAndDelete({_id:id})
         res.status(200).json(removeProject)
        
    } catch (err) {
       res.status(401).json(err)  
    }
}