import { IconButton, SwipeableDrawer, Toolbar, Typography, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { useState } from 'react';
import DrawerList from './DrawerList';

const MobileDrawer = () => {
    const [open, setOpen] = useState(false)
    const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    return (
        <>
            {!matches && <IconButton
                disableRipple
                size='large'
                onClick={() => setOpen(!open)}
                sx={{
                    color: 'primary.contrastText',
                    pl: 0
                }}
            >
                <MenuIcon sx={{ fontSize: 36 }} />
            </IconButton>}
            <SwipeableDrawer
                anchor='left'
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                sx={{
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { boxSizing: 'border-box', backgroundColor: 'primary.main', color: 'primary.contrastText' },
                }}
            >
                <Toolbar>
                    <IconButton
                        disableRipple
                        size='large'
                        onClick={() => setOpen(!open)}
                        sx={{
                            color: 'primary.contrastText',
                            pl: 0
                        }}
                    >
                        <MenuIcon sx={{ fontSize: 36 }} />
                    </IconButton>
                    <Typography variant='h6'>MY-Task</Typography>
                </Toolbar>
                <DrawerList setOpen={setOpen} />
            </SwipeableDrawer>
        </>
    );
};

export default MobileDrawer;