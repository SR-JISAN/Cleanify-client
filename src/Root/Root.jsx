import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../Components/Header/NavBar';

const Root = () => {
    return (
      <>
        <NavBar></NavBar>
        <Outlet></Outlet>
        <h1 className="bg-primary">footer</h1>
      </>
    );
};

export default Root;