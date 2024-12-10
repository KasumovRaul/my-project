import React from 'react'
import './AccessoriesNavbar.css'
import ImgAccess from '../../assets/StoolsImg.jpg'

const AccessoriesNavbar = ({isVisible}) => {

    if(!isVisible) return null;

  return (
    <>
    <div className="accessoriesNavbar">
        <div className="accessoriesNavbar-wrapper">
        <div className="box">
                <h1>Table</h1>
                 <ul>
                    <li>Room Furniture</li>
                    <li>Coffee Tables</li>
                    <li>Console Tables</li>
                    <li>Nest of Tables</li>
                    <li>Side Tables</li>
                    <li>Sideboards</li>
                    <li>Bookcases</li>
                    <li>Units</li>
                 </ul>
            </div>
            <div className="box">
                <h1>Table Room</h1>
                <ul>
                    <li>All Bedroom Furniture</li>
                    <li>Beds</li>
                    <li>Bedside Tables</li>
                    <li>Chest of Drawers</li>
                    <li>Dressing Tables</li>
                    <li>Mattresses</li>
                    <li>Stools & Ottomans</li>
                    <li>Wardrobes</li>
                </ul>
            </div>
            <div className="box">
                <img src={ImgAccess} alt="" />
            </div>
            <div className="box">
                <h1>Shop by Table</h1>
                <ul>
                    <li>Emma</li>
                    <li>Jasper Conran</li>
                    <li>MADE</li>
                    <li>Simba</li>
                    <li>Umbra</li>
                    <li>Novogratz</li>
                </ul>
            </div>
           
        </div>
    </div>
    </>
  )
}

export default AccessoriesNavbar