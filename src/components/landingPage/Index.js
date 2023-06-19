import React from 'react'
import NavBar from './NavBar'
import Carousel from './Carousel'
import Service from './Service'
import Team from './Team'

import Contact from './Contact'
import './style.css'
import MyFooter from './myfooter'



const Index = () =>
{
    return (
        <div>
            <NavBar />
            <Carousel />
            <Service />
            <Team />
            {/* <Contact /> */}
            <MyFooter />
            
        </div>
    )
}

export default Index