import { Divider, IconButton, SwipeableDrawer, Toolbar, Typography, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { useState } from 'react';
import DrawerList from './DrawerList';
import CloseIcon from '@mui/icons-material/Close';
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
                PaperProps={{
                    sx: { width: "70%" },
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
                        <CloseIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                    <Typography variant='h6'>My-Task</Typography>
                </Toolbar>
                <Divider/>
                <DrawerList setOpen={setOpen} />
            </SwipeableDrawer>
        </>
    );
};

export default MobileDrawer;