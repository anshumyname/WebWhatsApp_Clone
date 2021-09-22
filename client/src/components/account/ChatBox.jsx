import { Dialog, withStyles , Box, makeStyles} from "@material-ui/core";
import Menu from "../menu/menu";
import Chat from "../chat/Chat";
import { useContext } from "react";
import { UserContext } from "../context/UserProvier";
import EmptyChat from "../chat/EmptyChat";

const useStyles = makeStyles({
    component: {
        display: 'flex'
    },
    left_component : {
        minWidth: '380px'
    },
    right_component: {
        borderLeft: '1px solid rgba(0,0,0,0.5)',
        width: '80%',
        minWidth: 300,
        height: '100%'
    }
})

const style = {
    dialogPaper: {
        height: '95%',
        width: '91%',
        marginTop: '4%',
        // boxShadow: 'none',
        borderRadius: 0,
        maxHeight: '100%',
        maxWidth: '100%',
        overflow: 'hidden'
    }
}


const ChatBox= ({classes}) => {
    const classname = useStyles() 
    const { person } = useContext(UserContext);
    return (
        <Dialog open = {true}
                classes={{paper: classes.dialogPaper}}
                BackdropProps={{style: {backgroundColor: 'unset'}}}
        >
            <Box className={classname.component}>
                <Box className={classname.left_component}>
                    <Menu /> 
                </Box>
                <Box className={classname.right_component}>
                    {Object.keys(person).length ? <Chat/> : <EmptyChat /> }
                </Box>
            </Box>
        </Dialog>
    )
}

export default withStyles(style)(ChatBox);