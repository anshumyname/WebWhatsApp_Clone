import user from "../model/User.js";


export const addUser  = async (request, response) => {
    
    try{
        let exist = await user.findOne({googleId: request.body.googleId});
        if(exist){
            response.status(200).json("User already exist ");
            return;
        }
        const newUser = new user(request.body);
        await newUser.save();
        response.status(200).json('user saved sucessfully ');
    }
    catch(error){
        response.status(500).json(error);
    }
}

export const getUsers = async (request, response) => {
    try{
        const users = await user.find({});
        response.status(200).json(users);
    }
    catch(error){
        response.status(500).json(error);
    }
}