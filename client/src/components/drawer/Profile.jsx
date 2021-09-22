import {Box, makeStyles, Typography} from '@material-ui/core'
import { useContext } from 'react';
import { AccountContext } from '../context/AccountProvider';


const useStyles = makeStyles({
    image: {
        display: 'flex',
        justifyContent: 'center',
    },
    dp: {
        width: 200,
        height: 200,
        borderRadius: '50%',
        padding: '10px 0'
    },
    namecontainer: {
        backgroundColor: '#fff',
        padding: '12px 30px 2px',
        boxShadow: '0px 1px 3px rgba(0,0,0,0.08)',
        '& :first-child':{
            fontSize: 12,
            color: '#009688'
        },
        '& :last-child':{
            color: '#4A4A4A',
            margin: '14px 0px'
        }
    },
    description:{
        padding: '10px 20px 28px 30px',
        '& > *': {
            fontSize: 12,
            color: 'rgba(0,0,0,0.5)'
        }
    }
})
const Profile = () => {

    const classes = useStyles();
    const { account } = useContext(AccountContext);
    return(
        <>
            <Box className={classes.image}>
                <img src= {account.imageUrl} alt="DP" className={classes.dp}></img>
            </Box>
            <Box className={classes.namecontainer}>
                <Typography>Your Name</Typography>
                <Typography>{account.name}</Typography>
            </Box>
            <Box className={classes.description}>
                <Typography>
                    This is not your username or pin. This name will be visible to your Whatsapp contacts
                </Typography>
            </Box>
            <Box className={classes.namecontainer}>
                 <Typography>About</Typography>
                <Typography>Eat! Sleep! Code! Repeat!</Typography>
            </Box>
        </>
    )
}

export default Profile;