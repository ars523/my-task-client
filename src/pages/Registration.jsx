import React from 'react';
import withAuth from '../hoc/withAuth';

const Registration = ({children}) => {
    return (
        <>
            {children}
        </>
    );
};

export default withAuth(Registration, 'signup');