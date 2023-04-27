import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {postActivities, getActivities} from '../actions/index';
import { useDispatch, useSelector } from "react-redux";
import './ActivityCreated.css'

function validate (input) {
    let errors = {};
    if (!input.name) {
    errors.name = 'You must fill this field above';
    } else if (!input.duration) {
    errors.duration = 'You must fill this field';
    } else if (!input.difficulty) {
    errors.difficulty = 'You must choose the difficulty';
    } else if (!input.season) {
    errors.difficulty = 'You must choose the season';
    } else if (!input.countryId === []) {
    errors.countryId = 'You must select a country'
    }
    return errors;
    }

export default function ActivityCreated(){
    const dispatch = useDispatch();
    const history = useHistory();
    const countries = useSelector((state)=> state.allCountries)
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        duration: '',
        difficulty: '',
        season: '',
        countryId: [],

    })

    function handleChange(el){
        setInput({
            ...input,
            [el.target.name] : el.target.value
        });
        setErrors(
            validate({
                ...input,
                [el.target.name] : el.target.value
            })
        )
    }

    function handleSubmit(el){
        el.preventDefault();
        if(input.name === '' || input.duration === '' || input.difficulty === '' || input.season === '' || input.countryId.length === 0) return alert('You must complete the fields');
        dispatch(postActivities(input));
        alert('Activity created successfully');
        setInput({
            name: '',
            duration: '',
            difficulty: '',
            season: '',
            countryId: []
        })
    };

    function handleSelect(el){
        setInput({
            ...input,
            countryId: [...input.countryId, el.target.value]
        })

    }

    function handleDelete(i){
        setInput({
            ...input,
            countryId: input.countryId.filter((ele)=>ele !== i)
        })
    };

    useEffect(()=>{
        dispatch(getActivities())
    },[]);

    return (
        <div className="CreationPage">

<Link to= '/home'>
   <button onClick={() => window.location.href="/home"}>Go home</button>
        </Link>

            <h1>Create your activity</h1>
            <form onSubmit = {(el)=>handleSubmit(el)}>
                <div>
                    <label >Name of the Activity: </label>
                    <input
                        onChange={(el)=>handleChange(el)}
                        type='text'
                        placeholder="Write an activity"
                        value={input.name}
                        name='name'
                    />
                </div>
                {errors.name && <p>{errors.name}</p>}

                <div>
                <label >Duration of the activity: </label>
                <input 
                    onChange={(el)=>handleChange(el)}
                    type ='text'
                    placeholder="Write the duration"
                    value = {input.duration}
                    name = 'duration'
                />
                </div>
                {errors.duration && <p>{errors.duration}</p>}

                <div>
                    <label>Difficulty of the activity: </label>
                    <input 
                        onChange={(el)=>handleChange(el)}
                        type='range'
                        placeholder="Write the difficulty of the activity"
                        name='difficulty'
                        min='1'
                        max='5'
                        value={input.difficulty}
                    />
                </div>
                {errors.difficulty && <p>{errors.difficulty}</p>}

                <div>
                    <label>Season: </label>
                    <select 
                        onChange={(el)=> handleChange(el)}
                        name='season'
                        value={input.season}
                    >
                        <option>Season: </option>
                        <option value='Summer'>Summer</option>
                        <option value='Autum'>Autum</option>
                        <option value='Winter'>Winter</option>
                        <option value='Spring'>Spring</option>  
                    </select>
                {errors.season && <p>{errors.season}</p>}
                </div>
                {errors.countryId && <p>{errors.countryId}</p>}
                
                <div>
            <select onChange={(e) => handleSelect(e)}>
                <option > Countries </option>
                {countries.map((v) => (
                    <option value={v.id}>{v.name}</option>
                ))}
            </select>
            </div>

            <div>
                {input.countryId.map((country)=>(
                    <div>
                        <input type='button' value='X' onClick={() => handleDelete(country)} />
                        <p>{country}</p>
                    </div>
                ))}
            </div>

            <div>
                <button type= 'submit'>Create Activity</button>
            </div>
               
                

            </form>

        </div>
    )
}
