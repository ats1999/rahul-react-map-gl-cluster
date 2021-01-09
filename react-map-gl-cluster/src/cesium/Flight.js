import React from "react";
import * as Cesium from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
//window.CESIUM_BASE_URL = '/';
import flightData from "./data";

export default function CesiumComp(){
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

    const timeStepInSeconds = 30;
    const totalSeconds = timeStepInSeconds * (flightData.length - 1);
    const start = Cesium.JulianDate.fromIso8601("2020-03-09T23:10:00Z");
    const stop = Cesium.JulianDate.addSeconds(start, totalSeconds, new Cesium.JulianDate());
    viewer.clock.startTime = start.clone();
    viewer.clock.stopTime = stop.clone();
    viewer.clock.currentTime = start.clone();
    viewer.timeline.zoomTo(start, stop);
    // Speed up the playback speed 50x.
    viewer.clock.multiplier = 50;
    // Start playing the scene.
    viewer.clock.shouldAnimate = true;

    // The SampledPositionedProperty stores the position and timestamp for each sample along the radar sample series.
    const positionProperty = new Cesium.SampledPositionProperty();

    for (let i = 0; i < flightData.length; i++) {
      const dataPoint = flightData[i];

      // Declare the time for this individual sample and store it in a new JulianDate instance.
      const time = Cesium.JulianDate.addSeconds(start, i * timeStepInSeconds, new Cesium.JulianDate());
      const position = Cesium.Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.height);
      // Store the position along with its timestamp.
      // Here we add the positions all upfront, but these can be added at run-time as samples are received from a server.
      positionProperty.addSample(time, position);

      viewer.entities.add({
        description: `Location: (${dataPoint.longitude}, ${dataPoint.latitude}, ${dataPoint.height})`,
        position: position,
        point: { pixelSize: 10, color: Cesium.Color.WHITE }
      });
    }

    loadModel(viewer,start,stop,positionProperty);
    },[]);
    
    async function loadModel(viewer,start,stop,positionProperty) {
      // Load the glTF model from Cesium ion.
      const airplaneUri = await Cesium.IonResource.fromAssetId(246327);
      const airplaneEntity = viewer.entities.add({
        availability: new Cesium.TimeIntervalCollection([ new Cesium.TimeInterval({ start: start, stop: stop }) ]),
        position: positionProperty,
        // Attach the 3D model instead of the green point.
        model: { uri: airplaneUri,scale:1,minimumPixelSize:200 },
        // Automatically compute the orientation from the position.
        orientation: new Cesium.VelocityOrientationProperty(positionProperty),    
        path: new Cesium.PathGraphics({ width: 3,material:Cesium.Color.RED })
      });
      
      viewer.trackedEntity = airplaneEntity;
    }
    return  <div id="cesiumContainer"></div>;
}
