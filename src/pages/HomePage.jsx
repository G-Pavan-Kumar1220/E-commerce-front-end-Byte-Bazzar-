import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryNavbar from '../components/Nav';
import Offers from '../components/Offers';
import HomePageProductGrid from '../components/HomePageProductGrid';

function HomePage() {
  return (
    <>
      <Header />
      <CategoryNavbar />
      <Offers />
      <HomePageProductGrid />
      <Footer />
    </>
  );
}

export default HomePage;