const { Router } = require('express');
const axios = require ('axios');
const {Country, Activity} = require('../db');
const express = require('express');
const { Sequelize } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getInfoFromApi = async() => {
    const apiURL = await axios.get('https://restcountries.com/v3/all')
    const countryList = await apiURL.data.map(el => {
        return {
            id: el.cca3,
            name: el.name.common,
            flag: el.flags[0],
            continents:el.continents,
            capital:el.capital,
            subregion:el.subregion,
            area:el.area,
            population:el.population,
        };
    });
    
    return countryList;
};

const getInfoFromDb = async() => {
    return await Country.findAll({
        include:{
            model: Activity,
            attributes: ["name", "difficulty", "duration", "season"],
            through:{
                attributes:[],
            }
        }
    })
};

const getAllCountries = async () => {
    let apiInfo = await getInfoFromApi();
    const dbInfo = await getInfoFromDb();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
};

const getActivities = async ()=> {
    return await Activity.findAll();
}

router.get("/countries", async(req, res) =>{

   const name = req.query.name
   let totalCountries = await getAllCountries();

   if(name) {
    let countryName = await totalCountries.filter((el) => el.name.toLowerCase().includes(name.toLowerCase()));
    if(countryName.length) {
        res.status(200).send(countryName);
    } else {
        res.status(404).json({message: "Country not found"});
    }
   }else {
    res.status(200).send(totalCountries);
   }
});  

router.get("/countries/name", async (req, res) => {
    const name = req.query.name;

    try {
        const countries = await Country.findAll({where: {name:{[Sequelize.Op.iLike]: `%${name}%`}}})
        if(!countries || countries.length === 0){
            return res.status(404).send(`No countries were found matching "${name}".`)
        }
        res.json(countries);
    } catch (error){
        console.error(error)
        res.status(500).send(`There was an error searching for countries matching "${name}".`)
    }
});

router.get('/countries/:id', async (req, res) => {
    const { id } = req.params;
    const allCountries = await getAllCountries();
    try {
        if (id) {
            const countryId = await allCountries.filter(e => e.id == id);
            countryId.length ?
            res.status(200).json(countryId) :
            res.status(404).send('Country not found')
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/activities', async (req, res) => {
const {countryId, name, difficulty, duration, season } = req.body;


try {
    const activity = await Activity.create({ 
        countryId, 
        name, 
        difficulty, 
        duration, 
        season});
        
const countries = await Country.findAll({
    where: {id: countryId}
})
    await activity.addCountries(countries);
    res.json(activity);


} catch (error) {
    console.error(error);
    res.status(500).send('Error creating the activity');
}


});
router.use(express.json());  



router.get('/activities', async (req, res) => {
    const activities = await getActivities();
    return res.status(200).send(activities)
});  
module.exports = router;
