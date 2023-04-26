import React from "react";

export default function countryCard ({ name, flag, continents, id }) {
    return (
        <div>
        <h3>Name: {name}</h3>
        <img src={flag} alt="Not Found" width="400px" height="200px" className="img"/>
        <h4>Continent: {continents}</h4>
        </div>
    )
};