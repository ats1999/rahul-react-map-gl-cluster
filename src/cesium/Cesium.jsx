import React from "react";
import * as Cesium from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
//window.CESIUM_BASE_URL = '/';
import flightData from "./data";

const sleep = (ms) =>{
  return new Promise((res)=>{
    setTimeout(()=>res(),ms);
  })
}
export default function CesiumComp(){
    const [position,setPosition]=React.useState(Cesium.Cartesian3.fromDegrees(flightData[0].longitude, flightData[0].latitude, flightData[0].height));

    React.useEffect(()=>{
      Cesium.Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_TOKEN;
      const viewer = new Cesium.Viewer('cesiumContainer', {
          terrainProvider: Cesium.createWorldTerrain()
      }); 
      // const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());   
      
      // Fly the camera to San Francisco at the given longitude, latitude, and height.
      viewer.camera.flyTo({
        destination : Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
        orientation : {
          heading : Cesium.Math.toRadians(0.0),
          pitch : Cesium.Math.toRadians(-15.0),
        }
      });
 
    const positions = [];
    for (let i = 0; i < flightData.length; i++) {
      const dataPoint = flightData[i];
      const position = Cesium.Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.height);
      positions.push(dataPoint.longitude);
      positions.push(dataPoint.latitude);
      positions.push(dataPoint.height);

      viewer.entities.add({
        description: `Location: (${dataPoint.longitude}, ${dataPoint.latitude}, ${dataPoint.height})`,
        position: position,
        point: { pixelSize: 10, color: Cesium.Color.RED }
      });
    }

    let line = viewer.entities.add({
      polyline: {
        positions:Cesium.Cartesian3.fromDegreesArrayHeights(positions),
        width: 4,
        material:Cesium.Color.RED
      }
    })
    //loadModel(viewer,start,stop,positionProperty);
    loadModel(viewer)
    },[]);
    
    async function loadModel(viewer) {
      // Load the glTF model from Cesium ion.
      const airplaneUri = await Cesium.IonResource.fromAssetId(247501);
      const airplaneEntity = viewer.entities.add({
        position: position,
        // Attach the 3D model instead of the green point.
        model: { uri: airplaneUri },
        path: new Cesium.PathGraphics({ width: 3 })
      });
      
      viewer.trackedEntity = airplaneEntity;
      for (let i = 0; i < flightData.length; i++){
        await sleep(1000);
        const dataPoint = flightData[i];
        const tempPos = Cesium.Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.height);
        airplaneEntity.position = tempPos
      }
    }
    React.useEffect(() => {
      //console.log(position)
    }, [position])
    return  <div id="cesiumContainer"></div>;
}