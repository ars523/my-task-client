import { Box, CssBaseline, Toolbar } from '@mui/material';
import React from 'react';
import PermanentDrawer from '../componests/PermanentDrawer';
import NavBar from '../componests/NavBar';
import useMediaQuery from '@mui/material/useMediaQuery';
const LayoutPrimary = ({children}) => {
    const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <NavBar />
            {matches && <PermanentDrawer />}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: '2rem',
                    bgcolor: '#eee',
                    minHeight: '100vh'
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default LayoutPrimary;