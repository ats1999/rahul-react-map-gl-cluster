import React from "react";
import { Cartesian3, Transforms } from "cesium";
import {PolylineCollection,Polyline} from "resium";
import {dataSet} from "../deck.gl/data";
const positions = [];
for(let i=0; i<dataSet.length; i++)
    positions.push(new Cartesian3(dataSet[i][0],dataSet[i][1],dataSet[i][2]));

const Line=()=>{
    //length={}
    return <PolylineCollection  modelMatrix={Transforms.eastNorthUpToFixedFrame(Cartesian3.fromDegrees(76.95301593603443, 31.837477821389978,50000))}>
            <Polyline 
                width={2}
                positions={positions}
                loop
            />
    </PolylineCollection>
}
export default Line;