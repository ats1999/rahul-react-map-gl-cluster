import DroneImage from "./right-arrow.svg"
var img1 = document.createElement('img');
img1.src=DroneImage;

const ICON__MAPPING = {
    marker: { x: 0, y: 0, width: 64,
      height: 64, mask: false
    }
};
export const getPathLayer=(idx,dataPoints,opacity=100,color)=>{
    return {
        id:`path-layer-static-${idx}`,
            data:[{
                    path:dataPoints,
                    name:"Drone altitude paths",
                    color:[255, 0, 25]
                }
            ],
            pickable: true,
            billboard:true,
            widthScale: 0,
            widthMinPixels: 2.5,
            getPath: d => d.path,
            getColor: [...color,opacity],
            getWidth: 2.5
    }
}

export const getIconLayer=(idx,lngLat,angle=0)=>{
    return {
        id: `drone-icon-layer-deck-${idx}`,
            data: [
                {name:`Drone-${idx}`,coordinates:lngLat}
            ],
            pickable: true,
            billboard:false,
            // iconAtlas and iconMapping are required
            // getIcon: return a string 
            // "https://res.cloudinary.com/bdevg/image/upload/v1606483976/right-arrow_pdxgkq.png"
            iconAtlas: "https://res.cloudinary.com/bdevg/image/upload/v1606483976/right-arrow_pdxgkq.png",
            getIcon: (d) => "marker",
            iconMapping: ICON__MAPPING,
            sizeScale: 10,
            getPosition: (d) => d.coordinates,
            getSize: (d) => 10,
            getColor: (d) => [Math.sqrt(d.exits), 140, 0],
            getPixelOffset:[0,0],
            getAngle:360-angle
    }
}