"use strict";
const mapRouter = require('express').Router();
const { response } = require('../index');
const convert = require('xml-js');
const fs = require('fs');
mapRouter.get('/', (request, response) => {
    const xmlFile = fs.readFileSync('./maps/temp.xml', 'utf8');
    const jsonData = JSON.parse(convert.xml2json(xmlFile, { compact: true, spaces: 2 }));
    let street = jsonData.osm.way.find(x => x._attributes.id === '151372374');
    response.json(street);
});
module.exports = mapRouter;
