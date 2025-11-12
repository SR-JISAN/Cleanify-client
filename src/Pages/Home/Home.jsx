import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Recent from '../../Components/RecentIssues/Recent';
import VolunteerCTA from '../../Components/VolenteerCTA/VolunteerCTA';
import Category from '../../Components/Banner/Category';
import Community from '../../Components/Community/Community';
import useTitle from '../../Hook/UseTitle';



const Home = () => {
    useTitle("Home")
    return (
        <div>
            <Banner></Banner>
           <Category></Category>
           <Recent></Recent>
           <Community></Community>
           <VolunteerCTA></VolunteerCTA>
           
        </div>
    );
};

export default Home;