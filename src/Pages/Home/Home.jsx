import React from 'react';
import Banner from '../../Components/Banner';
import PopularContests from './PopularContests';
import WinnerSection from './WinnerSection';

const Home = () => {

    

    return (
        <>
        <Banner></Banner>
        <PopularContests></PopularContests>
        <WinnerSection></WinnerSection>
        </>
    );
};

export default Home;