"use strict";
const mapRouter = require('express').Router();
const { response } = require('../index');
const convert = require('xml-js');
const fs = require('fs');
const xmlFile = fs.readFileSync('./maps/temp.xml', 'utf8');
const jsonData = JSON.parse(convert.xml2json(xmlFile, { compact: true, spaces: 2 }));
const overpassFile = fs.readFileSync('./maps/NK_from_overpass.json', 'utf8');
const jsonDataOverpassBbox = JSON.parse(overpassFile);
mapRouter.get('/', (request, response) => {
    response.json(jsonData);
});
mapRouter.get('/nodesinstreet', (request, response) => {
    let street = jsonData.osm.way.find(x => x._attributes.id === '151372374');
    let streetName = filterByValue(street.tag, "name");
    let nextStreetNameArray;
    let nodesInStreet = [];
    street.nd.forEach((node) => {
        let currentNodeId = node._attributes.ref;
        let nodeInDB = filterByValue(jsonData.osm.way, currentNodeId);
        if (nodeInDB.length > 1) {
            nextStreetNameArray = filterByValue(nodeInDB, "name");
            for (let i = 0; i < nextStreetNameArray.length; i++) {
                let nextStreetName = filterByValue(nextStreetNameArray[i].tag, "name");
                if (nextStreetName[0]._attributes.v != streetName[0]._attributes.v) {
                    nodesInStreet.push({
                        ...node,
                        nextStreet: {
                            id: nextStreetNameArray[i]._attributes.id,
                            name: nextStreetName[0]._attributes.v
                        }
                    });
                }
            }
        }
        else {
            nodesInStreet.push(node);
        }
    });
    let nodeData = [];
    nodesInStreet.forEach(node => nodeData.push(jsonData.osm.node.find(x => x._attributes.id === node._attributes.ref)));
    let nodesInStreetCoordinates = [];
    nodeData.forEach(data => nodesInStreetCoordinates.push({
        nodeId: data._attributes.id,
        streetName: streetName[0]._attributes.v,
        nextStreet: '0',
        lat: data._attributes.lat,
        lon: data._attributes.lon
    }));
    response.json(nodesInStreet);
});
mapRouter.get('/overpass/nodesinstreet', (request, response) => {
    let streetData = [];
    let nodeData = [];
    jsonDataOverpassBbox.elements.forEach(element => {
        if (element.type == "way") {
            streetData.push(element);
        }
        else if (element.type == "node") {
            nodeData.push(element);
        }
    });
    if (!nodeData) {
        console.log("no nodeData");
    }
    streetData.forEach((street) => {
        street.nodes.forEach((element, index) => {
            let nodeCoordinates = filterByValue(nodeData, element.toString());
            street.nodes[index] = nodeCoordinates;
        });
    });
    streetData.forEach((street) => {
        let flattenedNodes = [].concat.apply([], street.nodes);
        street.nodes = flattenedNodes;
    });
    response.json(streetData);
});
mapRouter.get('/nextstreet', (request, response) => {
    let nextStreet = filterByValue(jsonData.osm.way, '26876446');
    response.json(nextStreet);
});
const filterByValue = (array, value) => array.filter((data) => JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1);
module.exports = mapRouter;
