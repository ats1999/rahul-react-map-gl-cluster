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

const positions = [];
flightData.map(dataPoint=>{
    positions.push(dataPoint.longitude);
    positions.push(dataPoint.latitude);
    positions.push(dataPoint.height);
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
        const uri = await Cesium.IonResource.fromAssetId(246327)
        setAirplaneUri(uri);
    };

    const movePlane = async() =>{
        airPlaneURI();
        for(let i=0; i<flightData.length; i++){
            const dataPoint = flightData[i];
            const position = Cesium.Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.height);
            setPosModel(position);
            await sleep(100);
        }
    }

    useEffect(()=>{
        Cesium.Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_TOKEN;
        movePlane();
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
                            <Resium.PointGraphics pixelSize={10} />
                        </Resium.Entity>
                    </>
            })
        }
        {/* polyline */}
        <Resium.Entity>
            <Resium.PolylineGraphics
                show
                width={3}
                material={Cesium.Color.RED}
                positions={Cesium.Cartesian3.fromDegreesArrayHeights(positions)}
            />
        </Resium.Entity>
        {/* Model */}
        {
            (airplaneUri&&posModel)&&<Resium.Entity
                tracked	
                position={posModel}
            >
                <Resium.ModelGraphics
                    scale={1}
                    uri={airplaneUri}
                    minimumPixelSize={100}
                    runAnimations
                    show
                    color={Cesium.Color.WHITE}
                />
            </Resium.Entity>
        }
    </Viewer>
}
export default ResiumComp;