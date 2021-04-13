import React,{useState,useEffect} from "react";
import {ModelGraphics,Entity} from "resium";
import {Color,IonResource,Cartesian3} from "cesium";
import flightData from "./data";


export default function Drones(){
    const [dronePos, setDronePos] = useState(null);
    const [droneURI, setDroneURI] = useState(null);
    const getDroneURI = async() => {
        // 247493, 246327->247501
        const uri = await IonResource.fromAssetId(247501)
        setDroneURI(uri);
    };
    const movePlane = React.useCallback(async(i)=>{
        const dataPoint = flightData[i];
        const position = Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.height);
        setDronePos(position);
        console.log("Hello",i)
        if(i<flightData.length)
            setTimeout(()=>movePlane(i+1),10);
    }, []);

    useEffect(()=>{
        getDroneURI();
        movePlane(0);
    },[movePlane]);

    if(!dronePos || !droneURI) return null;
    return <Entity tracked 
            position={dronePos}
        >
            <ModelGraphics
                show
                minimumPixelSize={50}
                uri={droneURI}
                show
                pixelSize={50}
                color={Color.WHITE}
            />
    </Entity>
}