import React from 'react'
import './HomeScreen.css'
import Overviews from '../apis/overviews.json'
import OverviewCard from '../components/OverviewCard'

const HomeScreen = () => {
  return (
    <div id="overview" className="pageContainer">
      <p className="pageHeading">Overview</p>
      <div className="line" />
      <div className="scroll__container" id="overview__container">
        {Overviews.map((overview) => (
          <OverviewCard
            imgURL={overview.imgURL}
            value={overview.value}
            title={overview.title}
          />
        ))}
      </div>
    </div>
  )
}

export default HomeScreen
