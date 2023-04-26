const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    detail: [],
    }

function rootReducer(state = initialState, action){
    switch (action.type) {
        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }

        case 'DETAIL':
            return {
                ...state,
                detail: action.payload
            }
        
        case 'RESET':
            return {
                ...state,
                detail: []
            }  
            
        case 'FILTER_BY_CONTINENT':
            const filterByContinent = state.allCountries
            const filteredCont = action.payload === 'All' ? filterByContinent : filterByContinent.filter(e => e.continent === action.payload)
            return {
                ...state,
                countries: filteredCont
            }
        
        case 'FILTER_BY_ACTIVITY':
            const countries2 = state.allCountries
            // filtramos los paises por actividad
            //usando filter para filtrar los paises que tengan la actividad que buscamos
            // (c) es cada pais del array countries2
            // (c) es cada actividad del array activities
            // retornamos los paises que tengan la actividad que buscamos
            // con find buscamos la actividad que buscamos en el array activities
            // si c.name es igual a la actividad que buscamos, retornamos el pais
            const countriesFiltered = countries2.filter((c) => { return c.activities?.find((c) => { return c.name === action.payload})}); 

            if (action.payload === "All") {
                return { ...state, 
                    countries: state.allCountries }
            } else {
                return {
                    ...state,
                    countries: countriesFiltered
                }
        }

        case 'POST_ACTIVITIES':
            return{
                ...state
            }

        case 'GET_ACTIVITIES':
            return{
                ...state,
                activities:action.payload
            }    
 
        case 'ORDER_BY_NAME':
            let orderCountriesByName = action.payload === 'asc' ?
                state.countries.sort(function(a, b){
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function(a, b){
                    if(a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name){
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                countries: orderCountriesByName
        }

        case 'ORDER_BY_POPULATION':
            let orderCountriesByPopulation = action.payload === 'May a men' ? state.countries.sort((a, b) => {
                if (a.population < b.population) {
                return 1;
                }
                if (a.population > b.population) {
                return -1
                }
                return 0;
            }) : 
                state.countries.sort((a, b) => {
                if (a.population < b.population) {
                    return -1;
                }
                if (a.population > b.population) {
                    return 1;
                }
                return 0;
                })
                    
            return {
                ...state,
                countries: orderCountriesByPopulation
        }

        case 'SEARCH_COUNTRIES':
            return {
            ...state,
            countries: action.payload
        }
            
            
        default:
            return state;
    }

}

export default rootReducer;