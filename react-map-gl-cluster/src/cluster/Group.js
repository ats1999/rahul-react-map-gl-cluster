import React from "react";
export default class Group extends React.PureComponent {
    render() {
      const {
        cluster,textAsIcon,viewport,
        superCluster,map,onViewportChange
      } = this.props;
      // if you want to access the leaves in this cluster group
      // const leaves = superCluster.getLeaves(cluster.properties.cluster_id, 3);
      // the number of leaves in this cluster group 
      const count = cluster.properties.point_count_abbreviated;
      console.log(`superCluster: ${superCluster}`)
      return (
        <div onClick={(e)=>{
          if(superCluster.points && superCluster.points.length>0){
            // get first point of the cluster
            const point =  superCluster.points[0].geometry.coordinates;
            let zoom = map.getZoom();
            zoom = zoom+2;
            zoom = zoom>=20?20:zoom;

            onViewportChange({...viewport,zoom:zoom,longitude:point[0],latitude:point[1]})
          }
        }}>
          <div style={{
            height:"70px",
            width:"70px",
            padding:"10px",
            borderRadius:"50%",
            backgroundColor:"rgb(10, 127, 138,0.5)",
          }}>
            {/* Inner div */}
            <div style={{
              borderRadius:"50%",
              height:"100%",
              width:"100%",
              backgroundColor:"#3f51b5",
              display:"flex",
              justifyContent:"center",
              alignContent:"center",
              flexDirection:"column",
              border:"2px solid #26507e",
              position:"relative"
            }}>
              <div
                style={{
                  position:"absolute",
                  height:"20px",
                  width:"20px",
                  borderRadius:"50%",
                  top:"-7px",
                  left:"32px",
                  display:"flex",
                  backgroundColor:'#f33a51',
                  justifyContent:"center",
                  alignContent:"center",
                  flexDirection:"column",
                }}
              >
                <p style={{color:"white",fontSize:"15px",fontWeight:"bold",
                  marginTop:"14px",marginLeft:"5px"
                }}>{textAsIcon}</p>
              </div>
  
              <p style={{textAlign:"center",margin:"auto",color:"white",fontSize:"25px",fontWeight:"bold"}}>
                {count}
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
