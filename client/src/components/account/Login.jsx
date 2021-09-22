import { Dialog, withStyles , Box, Typography, makeStyles, ListItem, List} from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { GoogleLogin } from 'react-google-login';
import { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";
// import AccountCon
import { clientid } from "../../constants/data";
import { addUser } from "../../service/api";

const useStyles = makeStyles({
    component: {
        // display: 'flex'
        // display: useMediaQuery(theme.breakpoints.up('sm'))? 'block':'flex',
    },
    left_component: {
        padding: '56px 0px 0px 56px',
    },
    qrcode: {
        height: 264,
        width: 264,
        padding: '50px 0px 0px 50px'
    },
    title: {
        fontSize: 26,
        marginBottom: '35px',
        color: '#525252',
        fontFamily:'Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif',
        fontWeight: 300,


    },
    list: {
        '& > *': {
            fontSize: 15,
            padding: '0px',
            marginBottom: '15px',
            marginTop: '15px',
            lineHeight: '28px',
            color: '#4a4a4a',

        }
    }
})

const style = {
    dialogPaper: {
        height: '95%',
        width: '55%',
        marginTop: '12%',
        // boxShadow: 'none',
        borderRadius: 0,
        maxHeight: '100%',
        maxWidth: '100%',
        overflow: 'hidden'
    }
}

const Login = ({classes}) => {
    const theme = useTheme();
    const classname = useStyles();
    // const clientid = '159779189553-crqfhl17l4ch61uk8lusoelejv9pqmnr.apps.googleusercontent.com';
    const qrurl = 'https://www.ginifab.com/feeds/qr_code/img/qrcode.jpg';
    const {account, setAccount} = useContext(AccountContext);


    const OnLoginSuccess = async (res) =>{
        console.log('Login successs');
        setAccount(res.profileObj);
        await addUser(res.profileObj)
    }

    const OnLoginFailure = (error)=>{
        console.log('Login Failured', error);
    }

    return (
        <Dialog 
            open={true} 
            classes={{paper: classes.dialogPaper}}
            BackdropProps={{style: {backgroundColor: 'unset'}}} 
        >
            <Box className={classname.component} style={{display: useMediaQuery(theme.breakpoints.up('lg'))? 'flex':'block'}} >
                <Box className={classname.left_component} >
                    <Typography className={classname.title}>To use Whatsapp on your computer:</Typography>
                    <List className={classname.list}>
                        <ListItem>1. Open Whatsapp on your phone</ListItem>
                        <ListItem>2. Tap Menu or Settings and select Linked Devices</ListItem>
                        <ListItem>3. Point Your Phone to this screen to capture the code</ListItem>
                    </List>
                </Box>
                <Box style={{position: 'relative'}}>
                    
                    <img src ={qrurl} alt='qr' className={classname.qrcode} ></img>
                    <Box style={{position: 'absolute', left: '50%', top: '50%'}}>
                    <GoogleLogin 
                        clientId={clientid}
                        buttonText=""
                        isSignedIn={true}
                        onSuccess={OnLoginSuccess}
                        onFailure={OnLoginFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    </Box>
                </Box>
            </Box>
        </Dialog>
    )
}

export default withStyles(style)(Login);
