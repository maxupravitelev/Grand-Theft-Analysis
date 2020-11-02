const mapRouter = require('express').Router()
const { response } = require('../index')

const convert = require('xml-js');
const fs = require('fs');

/* .get specific street */
mapRouter.get('/', async (request, response) => {

// mapRouter.get('/:id', async (request, response) => {

    const xmlFile = fs.readFileSync('./maps/start.xml', 'utf8');

    // parse xml file as a json object
    const jsonData = JSON.parse(convert.xml2json(xmlFile, {compact: true, spaces: 2}));
    
    console.log(jsonData)

    const street = jsonData.way.find(x => x._id === '71827680'
        );

    console.log(street)
    response.json(street)
  })

module.exports = mapRouter