import React from 'react'
import Navbar from '../components/navbar/Navbar'
import ShopNavbar from '../components/ShopNavbar/ShopNavbar'
import SofaNavbar from '../components/sofaNavbar/SofaNavbar'
import ChairNavbar from '../components/chairNavbar/ChairNavbar'
import AccessoriesNavbar from '../components/accessoriesNavbar/AccessoriesNavbar'
import HeroSection from '../components/HeroSection/HeroSection'
import AccessSection from '../components/AccessSection/AccessSection'
import BedroomCurtains from './bedroomCurtains/BedroomCurtains'
import GridHero from '../components/gridHero/GridHero'
import GridHero2 from '../components/gridHero2/GridHero2'


const Home = () => {
  return (
    <div>
        <ShopNavbar/>
        <SofaNavbar/>
        <ChairNavbar/>
        <AccessoriesNavbar/>
        <HeroSection/>
        <AccessSection/>
       <GridHero/>
       <GridHero2/>
    </div>
  )
}

export default Home