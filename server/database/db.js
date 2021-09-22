import mongoose from 'mongoose';


const  Connection = async (username, password) => {
    const URl = 'mongodb://'+username+':'+password +'@chatapp-shard-00-00.ywzaw.mongodb.net:27017,chatapp-shard-00-01.ywzaw.mongodb.net:27017,chatapp-shard-00-02.ywzaw.mongodb.net:27017/PROJECT-0?ssl=true&replicaSet=atlas-13n189-shard-0&authSource=admin&retryWrites=true&w=majority';
    try{
        await mongoose.connect(URl, {useUnifiedTopology: true, useNewUrlParser: true});
        console.log("Database success connected");
    }catch(error){
        console.log("Error while connecting mongodb ", error);
    }

}

export default Connection;