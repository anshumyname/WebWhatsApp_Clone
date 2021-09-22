import { Server } from 'socket.io';
;

const PORT = 9000;
const io = new Server(PORT, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

let users = [];

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && users.push({userId, socketId});

}


const getUser = (userId) => {
    return users.find( user => user.userId === userId);
}

const removeUser = (socketId) => {
    users.filter( user => user.socketId !== socketId)
}

io.on('connection', (socket) => {
    console.log("User connected")

    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        console.log(users);
        io.emit('getUsers', users);
    })


    socket.on('sendMessage', ({senderid , recieverId, text}) => {
    
        const user = getUser(recieverId);
        
        
        io.to(user.socketId).emit('getMessage', {
            senderid, text 
        })
    })

    socket.on('disconnect',() => {
        console.log("User disconnected");
        removeUser(socket.id); 
        io.emit('getUsers', users);
    })
})

