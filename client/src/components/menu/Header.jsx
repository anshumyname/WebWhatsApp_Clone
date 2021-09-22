import {Box, makeStyles} from '@material-ui/core';
import {Chat } from '@material-ui/icons';

import { useContext, useState } from 'react';
import { AccountContext } from '../context/AccountProvider';
import HeaderMenu from './HeaderMenu';
import InfoDrawer from '../drawer/InfoDrawer';

const useStyles = makeStyles({
    header: {
        height: '35px',
        background: '#ededed',
        padding: '10px 10px 16px 16px',
        display: 'flex',
        alignItems: 'center',

    },
    avatar: {
        height: '35px',
        width: '35px',
        borderRadius: '50%'
    },
    icons: {
        marginLeft: 'auto',
        '& > *': {
            marginLeft: 2,
            padding: '8px'
        },
        '& :first child':{
            fontSize: 33,
            marginRight: '0px',
            marginTop: '2px',

        }
    }
})


const Header = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { account } = useContext(AccountContext);

    const toggleDrawer = () =>{
        setOpen(true);
    }
    return (
        <>
        <Box className={classes.header}>
            <img className= {classes.avatar} src={account.imageUrl} alt="display pic" onClick={() => toggleDrawer()}></img>
            <Box className={classes.icons}>
                <Chat />
                <HeaderMenu/>
            </Box>
        </Box>
        <InfoDrawer open ={open} setOpen={setOpen}/>
        </>
    );

}

export default Header;