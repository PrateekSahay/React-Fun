import React from 'react'
import { Link, Route, Routes, useLocation,Navigate } from 'react-router-dom'
import Prod1 from './Prod1'
import Prod2 from './Prod2'

const About = () => {
    const {pathname} = useLocation()
    const location = useLocation();
    console.log(location);
  return (
    <>
    <div>About</div>
    {/* <Link to */}
    <Link to={`${pathname}/prod1`}>Prod1</Link>
    <Link to={`${pathname}/prod2`}>Prod2</Link>
    <Routes>
        <Route path={`${pathname}/prod1`} element={<Prod1 />} />                    
        <Route path={`${pathname}/prod2`} element={<Prod2 />} />
    </Routes>
    </>
  )
}

export default About