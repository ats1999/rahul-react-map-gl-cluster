import React from "react";
import { Cartesian3, Color, Transforms } from "cesium";
import {BillboardCollection,Billboard} from "resium";
import img from "../deck.gl/right-arrow.svg";

const Marker=()=>{
    return <BillboardCollection modelMatrix={Transforms.eastNorthUpToFixedFrame(Cartesian3.fromDegrees(76.95301593603443, 31.837477821389978,50000))}>
            <Billboard 
                onClick={(mv,tg)=>console.log(mv,tg)}
                image={img}
                scale={0.3}
                position={new Cartesian3(76.95301593603443, 31.837477821389978,50000)}
            />
    </BillboardCollection>
}
export default Marker;