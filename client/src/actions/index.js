import axios from 'axios';


export function getCountries(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/countries");
        
        return dispatch({
            type:'GET_COUNTRIES',
            payload: json.data
        })
    }
}

export function getDetail(id) {
    return async function(dispatch){
        try{
            let json= await axios.get(`http://localhost:3001/countries/${id}` );
            return dispatch({
                type:'GET_DETAIL',
                payload: json.data,
            })
        } catch(error){
            console.log(error);
        }
    };
}

export function getActivities() {
    return async function(dispatch){
        var json= await axios.get("http://localhost:3001/activities",{

        });
        return dispatch({
            type: 'GET_ACTIVITIES',
            payload: json.data,
        })
    }   
    // return async function (dispatch) {
    //     try {
    //     let json = await axios.get("http://localhost:3001/activities");
    //     return dispatch({
    //         type: 'GET_ACTIVITIES',
    //         payload: json.data,
    //     });
    //     } catch (error) {
    //     alert("There is not activities");
    //     console.log(error);
    //     }
    // };
}

export function postActivities(payload){
    return async function(dispatch){
        const data = await axios.post("http://localhost:3001/activities", payload);
        console.log(data)
        return data;
    };
}

export function searchCountries(name){
    return async function(dispatch){
        try{
            let json = await axios.get("http://localhost:3001/countries?name=" + name)
            return dispatch({
                type: 'SEARCH_COUNTRIES',
                payload: json.data
            });
        } catch(error){
            alert("Country not found")
        }
    }
}

export function restartDetail(){
    return(dispatch) => {
        dispatch({
            type: 'RESET_DETAIL',
        });
    };
}

export const filterByContinent = (continents)=> {
    return{
        type: 'FILTER_BY_CONTINENT',
        payload: continents,
    } 
}

export function filterByActivity (activity) {
    return {
        type: 'FILTER_BY_ACTIVITY',
        payload: activity

        }
    }

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload,
    }
}

export function orderByPopulation(payload){
    return{
        type: 'ORDER_BY_POPULATION',
        payload
    }
}

