
import { useContext } from "react";
import { UserContext } from "../context/UserProvier";
import { Box, Typography, makeStyles } from '@material-ui/core';
import { Search , MoreVert, More} from "@material-ui/icons";
import { AccountContext } from "../context/AccountProvider";
const useStyles = makeStyles({
    header: {
        display: 'flex',
        height: 35,
        background: '#ededed',
        padding: '10px 16px',
        alignItems: 'center'
    },
    dp: {
        width: 37,
        height: 37,
        borderRadius: '50%',
        padding: '0 2px',
    },
    name: {
        marginLeft: 10,
    },
    status: {
        fontSize: 12,
        marginLeft: 10,
        color: 'rgb(0,0,0,0.6)'

    },
    rightcontainer: {
        marginLeft : 'auto',
        '& >*':{
            padding: 8,
            fontSize: 22,
            color: '#919191'

        }
    }
})

const ChatHeader = () => {
    const { person } = useContext(UserContext);
    const classes = useStyles();

    const {activeUsers} =  useContext(AccountContext);

    return (
        <Box className={classes.header}>
            <img src={person.imageUrl} alt="DP" className={classes.dp}></img>
            <Box>
                <Typography className={classes.name}>{person.name}</Typography>
                <Typography className={classes.status}>
                    {
                        activeUsers?.find(user => user.userId === person.googleId) ? "Online": "Offline"
                    }
                </Typography>
            </Box>
            <Box className={classes.rightcontainer}>
                <Search />
                <MoreVert />
            </Box>
        </Box>
    )
}

export default ChatHeader;