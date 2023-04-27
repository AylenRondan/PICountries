import React from "react";
import {useEffect} from 'react'
import { Link, useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { getDetail } from "../actions/index";
import './Detail.css'

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch()

    const {id} = useParams();

    useEffect(()=>{
        dispatch(getDetail(id)) //accedo al id del detail
    },[dispatch, id])

    const myCountry = useSelector((state)=> state.detail)
    console.log(myCountry)

    return (
        <div className="cardDetail">
        
        <div>{
            myCountry.length > 0 ?
            <div>
                <div>
                <img src={myCountry[0].flag ? myCountry[0].flag : myCountry[0].flag} width='250px' height='175px' />  
                </div>

                <div className="card" >
                <h1>Country: {myCountry[0].name}</h1>
                <div>
                    <h2>ID: {myCountry[0].id}</h2>
                    <h2>Continent: {myCountry[0].continents}</h2>
                    <h2>Capital: {myCountry[0].capital}</h2>
                    <h2>Subregion: {myCountry[0].subregion}</h2>
                    <h2>Area: {myCountry[0].area} km2</h2>
                    <h2>Population: {myCountry[0].population}</h2>
                </div>
                </div>      

            </div> : <div>
                <h1> Loading... </h1>
            </div>

        }</div>
        <Link to= '/home'>
   <button onClick={() => window.location.href="/home"}>Go home</button>
        </Link>
        </div>
        
    
    );
}
    
