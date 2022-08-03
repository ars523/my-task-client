import React from 'react';
import {
    Drawer,
    Toolbar,
    Box,
} from '@mui/material'
import DrawerList from './DrawerList';

const drawerWidth = 240
const PermanentDrawer = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' , backgroundColor: 'primary.main', color:'primary.contrastText'},
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <DrawerList/>
            </Box>
        </Drawer>
    );
};

export default PermanentDrawer;