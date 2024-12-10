import React from 'react'
import './SofaNavbar.css'
import sofaImg from '../../assets/curtains1.jpg'

const SofaNavbar = ({isVisible}) => {

    if(!isVisible) return null;

  return (

    <>
    <div className="sofaNavbar">
        <div className="sofaNavbar-wrapper">
            <div className="box">
                <h1>Living Room</h1>
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
                <h1>Bedroom</h1>
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
                <h1>Shop by Brand</h1>
                <ul>
                    <li>Emma</li>
                    <li>Jasper Conran</li>
                    <li>MADE</li>
                    <li>Simba</li>
                    <li>Umbra</li>
                    <li>Novogratz</li>
                </ul>
            </div>
           
            <div className="box">
                <img src={sofaImg} alt="" />
            </div>
            <div className="box">
                <h1>Home Office</h1>
                <ul>
                    <li>All Home office</li>
                    <li>Desks</li>
                    <li>Office Chairs</li>
                    <li>Shelves & Bookcases</li>
                    <li></li>
                </ul>
            </div>
            <div className="box">
                <h1>Dining Room</h1>
                <ul>
                    <li>Bar Stools</li>
                    <li>Benches</li>
                    <li>Dining Tables</li>
                    <li>Dining Chairs</li>
                    <li>Sideboards</li>
                </ul>
            </div>
        </div>
    </div>
    </>
  )
}

export default SofaNavbar