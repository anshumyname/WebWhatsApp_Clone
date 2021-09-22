import { useEffect, useState, useContext } from "react";
import { getConversation, getUsers } from "../../service/api";

import {Box, makeStyles} from '@material-ui/core';
import Conversation from './Conversation';

import {AccountContext } from '../context/AccountProvider';

const useStyles = makeStyles({
    component: {
        height: '81vh',
        overflow: 'overlay',

    }
})


const Conversations = ({text}) => {
    const [users, setUsers]  = useState([]);
    const { account, socket, setActiveUsers}  = useContext(AccountContext);
    const classes = useStyles();

    

    useEffect(()=> {
        const fetchData = async() => {
            const data = await getUsers();
            const filtereddata = data.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
            setUsers(filtereddata);
        }
        fetchData();
    },[text]);

    useEffect(() => {
        socket.current.emit('addUser', account.googleId);
        socket.current.on('getUsers', users => {
            setActiveUsers(users);
        })
    },[account])


    return (
        <Box className={classes.component}> 
            {
                users.map((user) => (
                    user.googleId!== account.googleId && 
                        <Conversation user={user}/>
                    // <p>Hello</p>
                ))
            }
        </Box>
    );

}

export default Conversations;