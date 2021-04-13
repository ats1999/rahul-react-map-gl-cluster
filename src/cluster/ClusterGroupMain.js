import React,{useEffect,useState} from 'react'
import Cluster from './Cluster';
import Group from "./Group";
import Pin from "./Pin";

function ClusterGroupMain(props) {
    const {mapRef,onViewportChange,
        points,viewport,marker} = props;

    if(!mapRef || !points || points.length<=0) return null;
    return <div>
            <Cluster
                radius={25}
                map={mapRef.current.getMap()}
                extent={512}
                nodeSize={40}
                element={clusterProps => (
                    <Group viewport={viewport} map={mapRef.current.getMap()} onViewportChange={onViewportChange} {...clusterProps} />
                )}
            >
                {points.map((point, i) => (
                    <Pin
                        key={`pin-route-${i}`}
                        longitude={point.longitude}
                        latitude={point.latitude}
                        marker={marker}
                    />
                ))}
            </Cluster>
    </div>
}

    

export default ClusterGroupMain
