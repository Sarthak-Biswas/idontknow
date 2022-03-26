import React from 'react'
import './OverviewCard.css'

const OverviewCard = ({ title, imgURL, value }) => {
  return (
    <div className="overview__card">
      <img src={imgURL} alt="" />
      <div className="overview__card__right">
        <p>{title}</p>
        <p id="overview__card__right__value">{value}+</p>
      </div>
    </div>
  )
}

export default OverviewCard
