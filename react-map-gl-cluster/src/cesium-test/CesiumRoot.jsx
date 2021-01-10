import React,{useState,useEffect} from "react";
import { Viewer } from "resium";
import * as Resium from "resium";
import * as Cesium from 'cesium';
import flightData from "./data";
const terrainProvider = Cesium.createWorldTerrain();
const sleep = (ms) =>{
    return new Promise((res)=>{
      setTimeout(()=>res(),ms);
    })
}

const initPositionsOfPolyline = [];
flightData.map(dataPoint=>{
    initPositionsOfPolyline.push(dataPoint.longitude);
    initPositionsOfPolyline.push(dataPoint.latitude);
    initPositionsOfPolyline.push(dataPoint.height);
    return dataPoint;
});

const ResiumComp=()=>{
    let viewer;
    const [posModel, setPosModel] = useState(null);
    const [airplaneUri, setAirplaneUri] = useState(null);
    const handleReady = tileset => {
        if (viewer) {
          //viewer.zoomTo(tileset);
        }
    };

    const airPlaneURI = async() => {
        // 247493, 246327->247501
        const uri = await Cesium.IonResource.fromAssetId(247501)
        setAirplaneUri(uri);
    };



    useEffect(()=>{
        Cesium.Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_TOKEN;
        
        const movePlane = (i) =>{
            const dataPoint = flightData[i];
            const position = Cesium.Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.height);
            setPosModel(position);
            if(flightData.length>i) 
                setTimeout(()=>movePlane(i+1),5000);
            else return;
        }
        movePlane(0);
        airPlaneURI();
    },[]);

    return <Viewer
    full terrainProvider={terrainProvider}
    ref={e=>{
        viewer = e && e.cesiumElement;
    }}
    style={{
        position: "absolute",
        top: 0,
        left: 100,
        right: 0,
        bottom: 100,
      }}
    >
        {/* <Resium.Cesium3DTileset url={Cesium.IonResource.fromAssetId(5714)} onReady={handleReady}/> */}
        {
            flightData.map((dataPoint,idx)=>{
                const position = Cesium.Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.height);
                return <>
                        <Resium.Entity 
                            key={`point-${idx}`}
                            name="Tokyo" 
                            description = {`Location: (${dataPoint.longitude}, ${dataPoint.latitude}, ${dataPoint.height})`}
                            position={position}
                        >
                            <Resium.PointGraphics key={`pointgraphics-${idx}`} pixelSize={10} />
                        </Resium.Entity>
                    </>
            })
        }
        {/* polyline */}
        <Resium.Entity key={`entity-polyline`}>
            <Resium.PolylineGraphics
                show
                width={3}
                material={Cesium.Color.RED}
                positions={Cesium.Cartesian3.fromDegreesArrayHeights(initPositionsOfPolyline)}
                key={`entity-PolylineGraphics`}
            />
        </Resium.Entity>
        {/* Model */}
        {
            (airplaneUri&&posModel)&&<Resium.Entity
                tracked	
                position={posModel}
                key={`model`}
            >
                <Resium.ModelGraphics
                    scale={1}
                    uri={airplaneUri}
                    minimumPixelSize={50}
                    show
                    pixelSize={50}
                    color={Cesium.Color.WHITE}
                    key={`model-graphics`}
                />
            </Resium.Entity>
        }
    </Viewer>
}
export default ResiumComp;