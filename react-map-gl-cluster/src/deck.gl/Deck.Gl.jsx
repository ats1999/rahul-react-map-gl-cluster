import React,{useState,useEffect} from "react";
import DeckGL from '@deck.gl/react';
import {PathLayer,IconLayer} from '@deck.gl/layers';
import {getPathLayer,getIconLayer} from "./util";
import {dataSet} from "./data";
import * as turf from '@turf/turf';

const Deck=({viewport})=>{
    const [lngLat,setLngLat] = useState([76.81577407490902, 32.194621525271316]);
    const [droneAngle,setDroneAngle] = useState(0);
    
    const update=(iteration)=>{
        if(iteration>=dataSet.length) return;

        // get bearing netween two points
        const point1 = turf.point(dataSet[iteration-1]);
        const point2 = turf.point(dataSet[iteration]);
        const bearingDrone = turf.bearing(point1, point2);
        setDroneAngle(bearingDrone);

        setLngLat(new Array(dataSet[iteration][0],dataSet[iteration][1],5000));
        setTimeout(()=>update(iteration+1),50)
    }

    useEffect(()=>{
        update(1);
    },[]);

    return <DeckGL viewState={viewport}>
        <PathLayer
            {...getPathLayer("this_is_PathLayer",dataSet,255,[245, 0, 45])}
        />
        <IconLayer
            {...getIconLayer("this_is_IconLayer",lngLat,droneAngle)}
        />
    </DeckGL>
}

export default Deck;