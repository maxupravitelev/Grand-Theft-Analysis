const mapRouter = require('express').Router()
const { response } = require('../index')

const convert = require('xml-js');
const fs = require('fs');

/* .get street */
mapRouter.get('/', (request, response) => {

// mapRouter.get('/:id', async (request, response) => {

    const xmlFile = fs.readFileSync('./maps/temp.xml', 'utf8');

    const jsonData = JSON.parse(convert.xml2json(xmlFile, {compact: true, spaces: 2}));
    
    let street = jsonData.osm.way.find(x => x._attributes.id === '151372374')


    // response.json(jsonData.osm.way)
    response.json(jsonData)

  })

mapRouter.get('/nodesinstreet', (request, response) => {

    // mapRouter.get('/:id', async (request, response) => {
    
        const xmlFile = fs.readFileSync('./maps/temp.xml', 'utf8');
    
        const jsonData = JSON.parse(convert.xml2json(xmlFile, {compact: true, spaces: 2}));
        
        let street = jsonData.osm.way.find(x => x._attributes.id === '151372374')
    
        let nodesInStreet = []

        street.nd.forEach(node => nodesInStreet.push(node))

        let nodeArr = []

        nodesInStreet.forEach(node => nodeArr.push(jsonData.osm.node.find(x => x._attributes.id === node._attributes.ref))) 

        let finalArr = []

        nodeArr.forEach(data => finalArr.push({lat: data._attributes.lat, lon: data._attributes.lon}))


        response.json(finalArr)
    
      })

module.exports = mapRouter