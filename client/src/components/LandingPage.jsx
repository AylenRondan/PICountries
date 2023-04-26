import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage(){
    return (
        <div className='landingPage'>
            <h1 className='title'>Welcome to my Country page! </h1>
            <Link to = '/home'>
                <button className='button'>Go to Home</button>
            </Link>
        </div>
    )
};