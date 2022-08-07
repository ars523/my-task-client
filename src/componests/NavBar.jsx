import React from 'react';
import TaskIcon from '@mui/icons-material/Task';
import {
    AppBar,
    Stack,
    Toolbar,
    Typography,
    useMediaQuery
} from '@mui/material'
import MobileDrawer from './MobileDrawer';
import { useSelector } from 'react-redux';
import AccountMenu from './AccountMenu';
const NavBar = () => {
    const { user } = useSelector(state => state.auth)
    const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));;
    return (
        <AppBar position="fixed" sx={{ zIndex: matches ? (theme) => theme.zIndex.drawer + 1 : null }}>
            <Toolbar>
                <MobileDrawer />
                <Stack direction='row' alignItems='center' spacing={1}>
                    <TaskIcon />
                    <Typography variant="h6" noWrap component="div">
                        MY-Task
                    </Typography>
                </Stack>
                {user && <AccountMenu/>}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;