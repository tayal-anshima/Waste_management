import React from 'react'
import Card from './Card'
import citizenImg from '../../assets/images/citizen.png'
import collectorImg from '../../assets/images/garbageCollector.png'
export default function Cards() {
  return (
    <div id="#SignUp" className=" md:flex bg-white p-10  align-center">
        <Card
         img={citizenImg}
         title="Citizen"
         content="Want to avail the service of garbage collector to collect your garbage ..."
          linkTo="/citizens"/>
        <Card
         img={collectorImg}
         title="Garbage Collector"
         content="Want to register yourself as a Garbage Collector...."
         linkTo="/collector"/>
    </div>
  )
}
