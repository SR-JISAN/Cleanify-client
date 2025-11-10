import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Slider from '../../Components/Banner/Slider';
import Recent from '../../Components/RecentIssues/Recent';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Slider></Slider>
           <Recent></Recent>
        </div>
    );
};

export default Home;