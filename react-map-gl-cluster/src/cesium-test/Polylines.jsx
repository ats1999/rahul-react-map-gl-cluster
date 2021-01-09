import React from "react";
import Polyline from "./Polyline";
const Polylines = props => props.routes.map((route,idx)=>
                {
                    props.viewer && <Polyline 
                    key={`drone-route-${idx}`} 
                    route={route}
                    viewer={props.viewer}
                />
                }
            );
export default Polylines;