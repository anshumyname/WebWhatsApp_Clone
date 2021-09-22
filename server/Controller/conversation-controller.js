import { Conversation } from "../model/conversation.js";

export const newConversation = async (request, response) => {
    // console.log(request.body);
    let senderid = request.body.senderId;
    let recieverid = request.body.recieverId;
    try{
        const exist = await Conversation.findOne({members: {$all: [recieverid, senderid]}});
        if(exist){
            response.status(200).json("Conversation already exist");
            return;
        }
        const newConversation = new Conversation({
            members: [senderid, recieverid]
        })
        await newConversation.save();
        response.status(200).json("New conversation added successfully");

    }catch(error){
        response.status(500).json(error);
    }
}

export const getConversation =  async (request, respone) => {
    
    try{
        // console.log(request.body);
        const conversation = await Conversation.findOne({ members: {$all: [request.body.sender, request.body.receiver]}});
        respone.status(200).json(conversation);


    }catch(error){
        respone.status(500).json(error);
    }
}