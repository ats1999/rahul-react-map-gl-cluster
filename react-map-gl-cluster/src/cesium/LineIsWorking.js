import React,{useRef} from "react";
import { Viewer } from "resium";
import * as Resium from "resium";
import * as Cesium from 'cesium';
import flightData from "./data";
const terrainProvider = Cesium.createWorldTerrain();

const ResiumComp=()=>{
    let viewer,positions=[];
    const handleReady = tileset => {
        if (viewer) {
          //viewer.zoomTo(tileset);
        }
    };
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
                positions.push(dataPoint.longitude);
                positions.push(dataPoint.latitude);
                positions.push(dataPoint.height);
                return <>
                        <Resium.Entity 
                            name="Tokyo" 
                            description = {`Location: (${dataPoint.longitude}, ${dataPoint.latitude}, ${dataPoint.height})`}
                            position={position}
                        >
                            <Resium.PointGraphics pixelSize={10} />
                        </Resium.Entity>

                        {/* polyline */}
                        <Resium.Entity>
                            <Resium.PolylineGraphics
                                show
                                width={3}
                                material={Cesium.Color.RED}
                                positions={Cesium.Cartesian3.fromDegreesArrayHeights(positions)}
                            />
                        </Resium.Entity>
                    </>
            })
        }
    </Viewer>
}
export default ResiumComp;


/// ===========================  //
//222222


import React,{useRef} from "react";
import { Viewer } from "resium";
import * as Resium from "resium";
import * as Cesium from 'cesium';
import flightData from "./data";
const terrainProvider = Cesium.createWorldTerrain();
const positions = [];
flightData.map(dataPoint=>{
    positions.push(dataPoint.longitude);
    positions.push(dataPoint.latitude);
    positions.push(dataPoint.height);
})
const ResiumComp=()=>{
    let viewer;
    const handleReady = tileset => {
        if (viewer) {
          //viewer.zoomTo(tileset);
        }
    };
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
                // positions.push(dataPoint.longitude);
                // positions.push(dataPoint.latitude);
                // positions.push(dataPoint.height);
                return <>
                        <Resium.Entity 
                            key={`${idx}-point`}
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
    </Viewer>
}
export default ResiumComp;

///==========================
// 3333333
