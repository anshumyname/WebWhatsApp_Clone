import Message from './Message';
import {Box , makeStyles} from '@material-ui/core';
import Footer from './Footer';
import { useContext, useState, useEffect, useRef } from 'react';
import { AccountContext } from '../context/AccountProvider';
import { newMessage, getMessage } from '../../service/api';




const useStyles = makeStyles({
    wrapper: {
        backgroundImage: `url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'})`,
        backgroundSize: '50%',
    },
    component: {
        height: '79vh',
        overflow: 'scroll',
    },
    container: {
        padding: '1px 80px'
    }

})


const Messages = ({ conversation, person}) => {
    const scrollRef = useRef();
    const classes = useStyles();
    const [value, setValue] = useState();
    const { account, socket, newMessageFlag, setnewMessageFlag} = useContext(AccountContext);
    const [messages , setMessages] = useState([]);
    
    const [incomingMessage, setincomingMessage] = useState(null);

    const recieverId =  conversation?.members?.find(member => member !== account.googleId);

    useEffect(()=> {
        socket.current.on('getMessage', data => {
            
            setincomingMessage({
                sender: data.senderid,
                text: data.text,
                createdAt: Date.now()
            })
        })
    },[])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({transition: 'smooth'})
    },[messages])

    useEffect(()=>{
        incomingMessage && conversation?.members?.includes(incomingMessage.sender) && 
            setMessages(prev => [...prev, incomingMessage]);

    },[incomingMessage, conversation])

    useEffect(()=>{
        const getMessageDetails = async () => {
            let data = await getMessage(conversation._id);
            setMessages(data);
        }
        getMessageDetails();
    },[conversation?._id, person._id, newMessageFlag])

    const sendText =  async (e) => {
        let code = e.keyCode || e.which;
        if(!value) return;

        if(code === 13 ){
            let message = {
                sender: account.googleId, 
                conversationid: conversation._id,
                text: value
            }

            socket.current.emit('sendMessage', {
                senderid: account.googleId,
                recieverId: recieverId,
                text: value,
            })

            await newMessage(message);
            setValue("");
            setnewMessageFlag(prev=> !prev);
        }
    }


    
    return (
        <Box className={classes.wrapper}>
             <Box className={classes.component}>
                {
                    messages && messages.map((message) => (
                        <Box className={classes.container} ref={scrollRef}>
                            <Message message={message}/>
                        </Box>
                    ))

                }   
             </Box>
             <Footer sendText={sendText} setValue={setValue} value={value}/>
        </Box>
    )
}

export default Messages;