import React from "react";
import {Marker} from "react-map-gl";
export default class Pin extends Marker {
    render() {
      const {longitude,latitude,marker} = this.props;
      console.log(this.props)
      return <Marker longitude={longitude} latitude={latitude} offsetTop={0} offsetLeft={-40}>
            {marker}
        </Marker>
  }
}