import { Drawer,  Box, Typography} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

import Profile from './Profile';

const useStyles = makeStyles({
    header: {
        backgroundColor: '#00bfa5',
        height: '82px',
        color: '#fff',
        display: 'flex',
        '& > *' : {
            marginTop: 'auto',
            padding: 15,
            fontWeight: 600,
        }
    },
    component: {
        background: '#ededed',
        height: '85%',

        
    }
})

const InfoDrawer = ({open, setOpen})=> {
    const classes = useStyles();
    const handleClose = () =>{
        setOpen(false);
    }
    return ( 
        <Drawer open={open} onClose={handleClose} >
            <Box className={classes.header}>
                <ArrowBack onClick={handleClose}/>
                <Typography>Profile</Typography>
            </Box>
            <Box className={classes.component}>
                <Profile />
            </Box>
        </Drawer>
    )
}

export default InfoDrawer;