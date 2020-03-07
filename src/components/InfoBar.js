import React from 'react'
import onlineIcon from '../icons/onlineIcon.png'
import closeIcon from '../icons/closeIcon.png'

import './InfoBar.css'

const InfoBar = ({room}) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="onlineImage" />
      <h3>{room}</h3>

    </div>
    <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="closeImage"/></a>

    </div>
  </div>

)


export default InfoBar