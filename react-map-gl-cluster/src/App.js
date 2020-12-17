import React, { useState, useEffect, useRef } from "react";
import ReactMapGL from "react-map-gl";
import ClusterGroupMain from './cluster/ClusterGroupMain';
import { dataSet } from "./demo/data";
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
    latitude: 31.815485031139886,
    longitude: 76.92025126928692,
    zoom: 12,
    pitch: 0,
    bearing: 0
  });
  const mapRef = useRef(null);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        transitionDuration={300}
        mapStyle="mapbox://styles/rafilos556/ckhrp0auk0ol119s02qvctvh4"
        mapboxApiAccessToken="pk.eyJ1IjoicmFmaWxvczU1NiIsImEiOiJja2hoaHFwZjcwZ3pyMnFwNmY3aHY2eDg4In0.Ai4rUxBMjwoNzHTIDqmuBA"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
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
