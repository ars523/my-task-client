import { Alert } from '@mui/material';
import React from 'react';

const Error = ({message}) => {
    return (
        <Alert severity="error">
            {message}
        </Alert>
    );
};

export default Error;