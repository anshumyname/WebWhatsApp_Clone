 import axios from 'axios';

 const URL = "http://localhost:8000";
 export const addUser = async (data)=> {
     try{
        return await axios.post(`${URL}/add`,data)
     }
     catch(error){
         console.log("Error while calling add user api ", error);
     }

 }

 export const getUsers = async ()=> {
    try{
       let respone =  await axios.get(`${URL}/users`);
        return respone.data;
    }
    catch(error){
        console.log("Error while calling get user api ", error);
    }

 }

 export const setConversation = async ( data)=> {
    try{

        await axios.post((`${URL}/conversation/add`), data)

    }catch(error){
        console.log("Error while calling setconversation Api" , error);
    }
}

export const getConversation = async (data) => {
    try{
        
        let response  = await axios.post(`${URL}/conversation/get`,data);
        return response.data;
    }
    catch(error){
        console.log("Error while calling get conversation api", error);
    }
}

export const newMessage = async (data) => {
    try {
        await axios.post(`${URL}/message/add`, data);
    }
    catch(error){
        console.log("Error while calling newmessage api", error);
    }
}

export const getMessage = async (id) => {
    try {
       
        let response =  await axios.get(`${URL}/message/get/${id}`);
        return response.data;
    }
    catch(error){
        console.log("Error while calling getmessage api", error);
    }
}