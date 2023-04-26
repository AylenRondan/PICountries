import React from "react";
import {useState} from 'react';
import { useDispatch } from "react-redux";
import { searchCountries } from "../actions";

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(el){
        el.preventDefault()
        setName(el.target.value)
        console.log(name)
    }

    function handleSubmit(el){
        el.preventDefault();
                if (name.length === 0) return alert('You should introduce a country');
                dispatch(searchCountries(name))
                setName('')
    }

    return (
        <div>
            <input
            type = 'text'
            placeholder="Search..."
            onChange={(el)=>handleInputChange(el)}
            />
            <button type='submit' onClick={(el) => handleSubmit(el)}>Search</button>
        </div>
    )
}