import React from "react";
import {Entity,PolylineGraphics} from "resium";
import {Color,Cartesian3} from "cesium";
import flightData from "./data";

const positions = [];
flightData.map(dataPoint=>{
    positions.push(dataPoint.longitude);
    positions.push(dataPoint.latitude);
    positions.push(dataPoint.height);
    return dataPoint;
});

export default function Waypoints(){
    return <Entity>
        <PolylineGraphics
            show
            width={3}
            material={Color.RED}
            positions={Cartesian3.fromDegreesArrayHeights(positions)}
        />
    </Entity>
}