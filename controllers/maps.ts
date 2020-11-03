const mapRouter = require('express').Router()
const { response } = require('../index')

const convert = require('xml-js');
const fs = require('fs');

const xmlFile = fs.readFileSync('./maps/temp.xml', 'utf8');
    
const jsonData = JSON.parse(convert.xml2json(xmlFile, {compact: true, spaces: 2}));

/* .get street */
mapRouter.get('/', (request, response) => {
    
  response.json(jsonData)
})

/* get nodes via street id */
mapRouter.get('/nodesinstreet', (request, response) => {

// mapRouter.get('/:id', async (request, response) => {
    
  let street = jsonData.osm.way.find(x => x._attributes.id === '151372374')
      
  let nodesInStreet = []
  street.nd.forEach(node => nodesInStreet.push(node))

  let nodeData = []
  nodesInStreet.forEach(node => nodeData.push(jsonData.osm.node.find(x => x._attributes.id === node._attributes.ref))) 

  let nodesInStreetCoordinates = []
  nodeData.forEach(data => nodesInStreetCoordinates.push({lat: data._attributes.lat, lon: data._attributes.lon}))

  response.json(nodesInStreetCoordinates)
})



module.exports = mapRouter