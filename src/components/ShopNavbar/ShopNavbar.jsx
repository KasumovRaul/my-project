import React from 'react'
import './ShopNavbar.css'
import ShopAllImg from '../../assets/bed4.jpg';

const ShopNavbar = ({isVisible}) => {

    if(!isVisible) return null;  // Eğer isVisible false ise hiçbir şey render edilmez

  return (
    <>
        <div className="shopNavbar">
            <div className="shopNavbar-wrapper">
                <div className="box">
                    <h1>Furniture</h1>
                    <ul>
                        <li>Beds</li>
                        <li>Bedside Tables</li>
                        <li>Chest of Drawers</li>
                        <li>Coffee Tables</li>
                        <li>Dining Tables</li>
                        <li>Dressing Table</li>
                        <li>Mattressers</li>
                        <li>Shelves</li>
                        <li>Sideboards</li>
                        <li>Side Tables</li>
                    </ul>
                </div>
                <div className="box">
                    <h1>Lighting</h1>
                    <ul>
                        <li>All Lighting</li>
                        <li>Celling Lights</li>
                        <li>Floor Lamps</li>
                        <li>Lamp Shades</li>
                        <li>Pendant Lights</li>
                        <li>Table & Desk Lamps</li>
                        <li></li>
                    </ul>
                </div>
                <div className="box">
                    <h1>Home Accessories</h1>
                    <ul>
                        <li>Mirrors</li>
                        <li>Wall Art</li>
                        <li>Vases</li>
                        <li>Clocks</li>
                    </ul>
                </div>
                <div className="box">
                    <h1>My Brand</h1>
                    <ul>
                        <li>MADE</li>
                        <li>Anglepoise</li>
                        <li>Asiatic Rugs</li>
                        <li>Brabantia</li>
                        <li>Dutch Rose</li>
                        <li>Emma</li>
                        <li>HouseOf</li>
                        <li>paper Collective</li>
                        <li>Paper Collective</li>
                        <li>Simba</li>
                        <li>Simba</li>
                        <li>SolarCentre</li>
                        <li>Yard</li>
                    </ul>
                </div>
                <div className="box">
                <img src={ShopAllImg} alt="" />
                </div>
            </div>
        </div>
    </>
  )
}

export default ShopNavbar