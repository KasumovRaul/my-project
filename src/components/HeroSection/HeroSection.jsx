import React from 'react'
import leftImg from '../../assets/320331s.jpg'
import centerImg from '../../assets/B88555s.jpg'
import rightImg from '../../assets/lates-hotspot-dt.jpg'
import './HeroSection.css'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";


const HeroSection = () => {

  return (

    <>
    <div className="HeroSection">
        <div className="HeroSection-wrapper">
           <div className="HeroSection-left-section">
                <ul>
                    <h5>Style Bedroom</h5>
                    <li>One bedroom, two</li>
                    <li>Very different looks</li>
                </ul>
           </div>
           <Link to='/chairPhoto/1'>
           <div className="HeroSection-right-section">
             <h2><span><FaArrowLeft /></span> GO SHOPPING </h2>
           </div>
           </Link>
        </div>
    </div>

    <div className="HeroSection2">
        <div className="HeroSection2-wrapper">
        <Link to='/bedroomCurtains/3'>
        <div className="HeroSection2-left-section">
        <h2>GO SHOPPING <span><FaArrowRight /></span></h2>
        </div>
        </Link>
        <div className="HeroSection2-right-section">
                <ul>
                    <h3>Style Curtains</h3>
                    <li>One bedroom, two</li>
                    <li>Very different looks</li>
                </ul>
           </div>
        </div>
    </div>

    <div className="HeroSection3">
      <div className="HeroSection3-wrapper">
        <div className="HeroSection3-left-section">
        
          <h3>THE MAVINN COLLECTION</h3>
          <p>Celebrating handcraft and creating jobs</p>
        </div>
        <div className="HeroSection3-right-section">
          <img src={rightImg} alt="" />
        </div>
      </div>
    </div>
    </>
  )
}

export default HeroSection