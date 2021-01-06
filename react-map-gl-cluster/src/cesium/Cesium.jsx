import React from "react";
import { createWorldTerrain  } from "cesium";
import {dataSet} from "../deck.gl/data";
import { Viewer, GeoJsonDataSource} from "resium";
import Marker from "./Marker";
import Line from "./Line";
const terrainProvider = createWorldTerrain();


const data = {
    type: "Feature",
    properties: {
      name: "Coors Field",
      amenity: "Baseball Stadium",
      popupContent: "<b>This is where the Rockies play!</b>",
    },
    geometry: {
      type: "LineString",
      coordinates: dataSet,
    },
};
  
export default function CesiumComp(){
    return <Viewer full terrainProvider={terrainProvider}>
        <Marker/>
        <Line/>
    <GeoJsonDataSource markerSymbol="#" fill="#ffffff" data={data}/>
  </Viewer>
}