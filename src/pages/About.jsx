import React from 'react'
import "./About.css"
const About = () => {
  return (
    <div className='about'>
      <h1>About this <a href="/">
          Mini<b>Blog</b>
        </a></h1>
      <p className='text'>This is a project developed by me, to concluse my React JS course in Udemy, with th teacher Matheus Battisti. Hope you like it.</p>
      <p className='emoji'>:)</p>
    </div>
  )
}

export default About