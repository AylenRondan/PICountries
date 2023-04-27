import React from "react";
import { Link } from "react-router-dom";

export default function Card ({ name, flag, continents, id }) {
    return (
        <div>
        <img src={flag} alt="Not Found" width="400px" height="200px" className="img"/>
        <Link to= {`/detail/${id}`}><h3>Name: {name}</h3></Link>
        <h4>Continent: {continents}</h4>
        </div>
    )
};