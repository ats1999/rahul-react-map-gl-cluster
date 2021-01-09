import React,{useEffect} from "react";
import {Cartesian3,Color} from "cesium";

export default function Polyline({route,viewer}){
    console.log("Adding polyline")
    useEffect(() => {
        let positions = [];
        route.forEach(element => {
            positions.push(...element);
        });
        let line = viewer.entities.add({
            polyline: {
              positions:Cartesian3.fromDegreesArrayHeights(positions),
              width: 4,
              material:Color.RED
            }
        })
        return () => {
            // remove
        }
    }, []);

    return null;
}