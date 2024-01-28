import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <ul className='nav'>
        <li>
            <Link to='/'>Home</Link>
        </li>
        <li>
            <Link to='/about'>About</Link>
        </li>
        <li>
            <Link to='/help'>Help</Link>
        </li>
        <li>
            <Link to='/helpAxios'>HelpAxios</Link>
        </li>
        <li>
            <Link to='/product/2'>Product</Link>
        </li>
    </ul>
  )
}

export default Nav