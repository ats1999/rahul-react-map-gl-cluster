import React from "react";
import React, { useState, useRef } from "react";
import ReactMapGL from "react-map-gl";
import ClusterGroupMain from './cluster/ClusterGroupMain';
import { dataSet } from "./demo/data";
import Deck from "./deck.gl/Deck.Gl";
const data = dataSet.map(point=>{
  return {
    longitude:point[0],
    latitude:point[1]
  }
});
export default function App() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 650, // , [-87.61694, 41.86625]
    latitude: 31.925535319073248,
    longitude: 77.04358645459227,
    zoom: 10,
    pitch: 59,
    bearing: 60
  });
  const mapRef = useRef(null);
  return (
    <div className="App">
      <h1>Hello, thanks for your time</h1>
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        transitionDuration={300}
        mapStyle="mapbox://styles/rafilos556/ckhrp0auk0ol119s02qvctvh4"
        mapboxApiAccessToken="pk.eyJ1IjoicmFmaWxvczU1NiIsImEiOiJja2hoaHFwZjcwZ3pyMnFwNmY3aHY2eDg4In0.Ai4rUxBMjwoNzHTIDqmuBA"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        <Deck viewport={viewport}/>
        <ClusterGroupMain
            mapRef={mapRef}
            viewport={viewport}
            onViewportChange={setViewport}
            points={data}
            marker={<img alt="" height={40} width={40} src="https://img.icons8.com/emoji/48/000000/helicopter-emoji.png"/>}
        />
      </ReactMapGL>
    </div>
  );
}





//import Cesium from "./cesium/Cesium";
//import Cesium from "./cesium/Flight";
//import Cesium from "./cesium/Resium";
//import Cesium from "./cesium-test/CesiumRoot";