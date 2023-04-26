import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getCountries, filterByContinent, orderByName, orderByPopulation, filterByActivity, getActivities} from "../actions";
import { Link } from "react-router-dom";
import Card from './Card';
import './Home.css';
import Paginado from "./Paginated";
import countryCard from "./Card";
import SearchBar from "./SearchBar";

export default function Home(){

const dispatch = useDispatch()

const allCountries = useSelector((state) =>state.countries)
const allActivities = useSelector((state)=> state.activities)

const [currentPage, setCurrentPage] = useState(1)
const [countriesPerPage, setCountriesPerPage] = useState(10)
const indexOfLastCountry = currentPage * countriesPerPage
const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)
const [, setOrden] = useState('')

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}

function reloadButton(ele) {
    ele.preventDefault()
    dispatch(getCountries())
}

useEffect(() => {
    dispatch(getCountries())
    dispatch(getActivities())
}, [dispatch])

function handleFilterContinent(ele){
    dispatch(filterByContinent(ele.target.value));
    setCurrentPage(1);
}

const handlefilterByActivities = (e) => {
    e.preventDefault();
    if (e.target.value === "x") {
      dispatch(getCountries());
    }
    dispatch(filterByActivity(e.target.value));
    setCurrentPage(1);
  };

function handleSort(ele){
    ele.preventDefault();
    dispatch(orderByName(ele.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${ele.target.value}`)
}

function handleSort2(ele){
    ele.preventDefault();
    dispatch(orderByPopulation(ele.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${ele.target.value}`)
}

return (
    <div className="home">
        <Link to='/activities'>Create Activity</Link>
        <h1 className="title">Know more about the countries in the world</h1>
        <button className = "buttonReload" onClick={(e)=> {reloadButton(e)}}>
            Reload countries
        </button>
        <div>
            <select className="Asc-Desc" onChange={(el) => {handleSort(el)}}>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
            </select>

            <select className="Population" onChange={(el) => {handleSort2(el)}}>
                <option value="May a men">Higher population</option>
                <option value="Men a may">Lower population</option>
            </select>

            <select
        onChange={handlefilterByActivities}
      >

        <option onChange = {e => handlefilterByActivities(e)}value="All" disable="selected hidden">
        Turistic Activities 
        </option>
        {allActivities?.map((activity, index) => (// mapeamos el array de actividades, y creamos una opcion por cada actividad
          <option key={index} value={activity.name}>
            {activity.name}
          </option>
        ))}
      </select>

            <select onChange={(ele) => handleFilterContinent(ele)} className="Continents">
                <option value ="All">All</option>
                <option value ="Africa">Africa</option>
                <option value ="Antarctica">Antarctica</option>
                <option value ="Asia">Asia</option>
                <option value ="Europe">Europe</option>
                <option value ="North America">North America</option>
                <option value="Oceania">Oceania</option>
                <option value ="South America">South America</option>
            </select> 

<Paginado 
countriesPerPage={countriesPerPage}
allCountries={allCountries.length}
paginado = {paginado}
/>

<SearchBar/>

{currentCountries?.map((el)=>{
    return (
        <div className= 'cartas' key = {el.id}>
            <Link className="Cards" to={"/home/" + el.id}>
                <Card name={el.name} 
                flag={el.flag} 
                continents={el.continents}
                capital = {el.capital}
                population = {el.population}
                />
            </Link>
        </div>
    )
})} 
        
        </div>
    </div>
    
)
}