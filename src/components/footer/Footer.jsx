import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

import './Footer.css'

const Footer = () => {

  return (

    <>
    <div className="footer">
        <div className="footer-wrapper">
            <div className="footer-leftSide">
                <h2>40% Off Your First Order</h2>
                <div className="footer-desc">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Inventore aspernatur vitae a mollitia doloribus eaque?</p>
                    </div>
                <div className="footer-leftSide-input">
                    <input type="email" placeholder='Email Address'/>
                    <i><FaPlus /></i>
                </div>
                <div className="footer-leftSide-socialMedia">
                    <ul>
                        <li><FaInstagram />
                        </li>
                        <li><FaFacebookF />
                        </li>
                        <li><RiTwitterXFill />
                        </li>
                        <li><FaYoutube />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-RightSide">
                <div className="footer-box1">
                    <ul>
                        <li>About Us</li>
                        <li>Help</li>
                        <li>Returns</li>
                        <li>GuideShopLocations</li>
                        <li>Bonobos App</li>
                        <li>Jobs</li>
                        <li>Email Us</li>
                    </ul>
                </div>
                <div className="footer-box2">
                    <ul>
                        <li>Teachers</li>
                        <li>Students</li>
                        <li>Military</li>
                        <li>Terms</li>
                        <li>Site Map</li>
                        <li>Accessibility</li>
                        <li>Give Us</li>
                    </ul>
                </div>
                <div className="footer-box3">
                    <ul>
                        <li>Site Map</li>
                        <li>FeedBack</li>
                        <li>Military</li>
                        <li>Cookie</li>
                        <li>Fashion</li>
                        <li>Accessibility</li>
                        <li>Give Us</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Footer


import sofaImg from '../../assets/SofaImg.jpg'

<img src={sofaImg} alt="" />