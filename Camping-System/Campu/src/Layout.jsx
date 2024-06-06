import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from "../src/components/navbar";

function Layout({ children }) {
    const location = useLocation();

    console.log("Current Path:", location.pathname); // Add this log

    return (
        <>
            {location.pathname !== '/CamperHomePage' && <Navbar />}
            {children}
        </>
    );
}

export default Layout;
