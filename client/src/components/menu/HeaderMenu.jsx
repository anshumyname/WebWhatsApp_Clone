import { MoreVert } from "@material-ui/icons";
import { useState, useContext } from "react";
import {Menu, MenuItem,makeStyles} from '@material-ui/core';
import { GoogleLogout } from "react-google-login";
import { clientid } from "../../constants/data";
import { AccountContext } from "../context/AccountProvider";

import InfoDrawer from "../drawer/InfoDrawer";

const useStyles = makeStyles({
    menuitem: {
        fontSize: 14,
        padding: '15px 60px 5px 24px',
        color: '#4a4a4a',
    },
    logout: {
        border: 'none! important',
        boxShadow: 'none! important',
        '& >  *': {
            padding: '0px! important'
        }

    }
})

const HeaderMenu = () => {
    const [open, setOpen] = useState(false);
    const [opendrawer, setOpendrawer] = useState(false);
    const classes = useStyles();
    const {setAccount} = useContext(AccountContext);
    const handleClose = ()=>{
        setOpen(false);
    }

    const handleClick = (event) => {
        setOpen(event.currentTarget)
    }

    const toggleDrawer = () =>{
        setOpendrawer(true);
    }

    const OnLogoutSuccess = ()=>{
        alert("you have been logged out sucessfully");
        console.clear();
        setAccount(null);
    }
    return (
        <>
            <MoreVert onClick={handleClick}/>
            <Menu
                id="simple-menu"
                anchorEl={open}
                keepMounted
                open={Boolean(open)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <MenuItem className= {classes.menuitem} onClick={() => {handleClose(); toggleDrawer()}}>Profile</MenuItem>
                <MenuItem  className= {classes.menuitem} onClick={handleClose}>
                    <GoogleLogout
                        clientId={clientid}
                        buttonText="LogOut"
                        onLogoutSuccess={OnLogoutSuccess}
                        cookiePolicy={'single_host_origin'}
                        className={classes.logout}
                    >
                        
                    </GoogleLogout>
                </MenuItem>
            </Menu>
            <InfoDrawer open ={opendrawer} setOpen={setOpendrawer}/>
        </>
    )
}

export default HeaderMenu;