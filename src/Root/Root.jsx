import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../Components/Header/NavBar';
import Footer from '../Pages/Footer/Footer';

const Root = () => {
    return (
      <>
        <NavBar></NavBar>
        <Outlet></Outlet>
        <Footer></Footer>
      </>
    );
};

export default Root;