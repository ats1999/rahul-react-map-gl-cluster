/*
<Cesium
    drones={drones}
    threeD={threeD}
    droneRoutes={droneRoutes}
    wayPoints={wayPoints}
    routeDiversions={routeDiversions}
    completedPathDrones={completedPathDrones}
/>
*/


import React,{useState,useEffect} from "react";
import  {Ion,Viewer,IonResource,Cartesian3,createWorldTerrain} from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import dataSet from "./data";
import Polylines from "./Polylines";

export default function CesiumRoot(){
    const [drones, setDrones] = useState([]);
    const [droneRoutes, setDroneRoutes] = useState(dataSet);
    const [wayPoints, setWayPoints] = useState([]);
    const [routeDiversions, setRouteDiversions] = useState([]);
    const [completedPathDrones, setCompletedPathDrones] = useState([]);
    const [droneURI, setDroneURI] = useState("");
    const [viewer, setViewer] = useState(null);

    async function loadModel(){
        const cesiumDroneURI = await IonResource.fromAssetId(247501);
        setDroneURI(cesiumDroneURI);
    }

    useEffect(() => {
        Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_TOKEN;
        let v = new Viewer('cesiumContainer', {
            terrainProvider: createWorldTerrain()
        });
        setViewer(v) 
        loadModel();
        v.camera.flyTo({
            destination : Cartesian3.fromDegrees(76.92025126928692, 31.815485031139886, 0),
            // orientation : {
            //   heading : Cesium.Math.toRadians(0.0),
            //   pitch : Cesium.Math.toRadians(-15.0),
            // }
        });
        return () => {
            // remove map
        }
    }, []);

    return  <>
                <div id="cesiumContainer"></div>
                <Polylines viewer={viewer} routes={droneRoutes}/>
            </>
}