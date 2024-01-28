import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({progress = 0}) => {
  return (
    <>
        <h1>Progress Bar</h1>
        <div className='progressBar-container'>
            <div className='progressBar-fill' style={{
                transform: `translateX(${progress -  100}%)`
            }}></div>  
        </div>  
    </>
  )
}

export default ProgressBar