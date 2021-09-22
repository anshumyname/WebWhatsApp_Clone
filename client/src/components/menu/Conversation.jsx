
import {Box, Typography, makeStyles} from '@material-ui/core';
import { useContext , useState, useEffect} from 'react';
import { AccountContext } from '../context/AccountProvider';
import { setConversation } from '../../service/api.js';
import { UserContext } from '../context/UserProvier';
import { getConversation } from '../../service/api.js';

const useStyles = makeStyles({
    displaypic: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        padding: '0px 14px',
        
    },
    component: {
        display: 'flex',
        height: 40,
        padding: '13px 0px',
        cursor: 'pointer',
    },
    timestamp:{
        fontSize: 12,
        marginLeft: 'auto',
        marginRight: 20,
        color: '#00000099',

    },
    text:{
        color: 'rgba(0,0,0,0.6)',
        fontSize: 14,
    }
})


const Conversation = ({user}) => {
    const url = user.imageUrl;
    const classes = useStyles();
    const { account, newMessageFlag } = useContext(AccountContext);
    const { setperson } = useContext(UserContext);
    const [ message , setMessage] = useState({});

    useEffect(() => {
        const getConversationMessage = async () => {
            const data  = await getConversation({ sender: account.googleId, receiver: user.googleId});
            setMessage({text: data.message, timestamp: data.updatedAt});
            // console.log(data)
        }
        getConversationMessage();
        

    },[newMessageFlag])

    const setUser = async () => {
        setperson(user);
        await setConversation({senderId: account.googleId, recieverId: user.googleId})
    }

    return (
        <Box className={classes.component} onClick={()=> setUser()}>
            <Box >
                <img src={url} alt="displaypic" className = {classes.displaypic} />
            </Box>
            <Box style={{width: '100%'}}>
                <Box style={{display: 'flex'}}>
                    <Typography>{user.name}</Typography>
                    {
                        message.text && 
                        <Typography className={classes.timestamp}>
                            {new Date(message.timestamp).getHours()}:{new Date(message.timestamp).getMinutes()}
                        </Typography>
                    }
                </Box>
                <Box className={classes.text}>{message.text}</Box>
            </Box>
        </Box>
    )
}


export default Conversation;