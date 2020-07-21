import React from "react";
import { GoogleApiWrapper } from "google-maps-react";
import HeatMap from "google-maps-react/dist/components/HeatMap";
import { MAP_GRADIENT } from "../constants";
import { StMap } from "./styled";
import { calcMapWeight } from "../utils";

function MapContainer({ google, cityData: { lat, lng }, listings }) {
    const positions = listings.map(({ lat, lng, availableDays, reviews }) => ({
        lat,
        lng,
        weight: calcMapWeight({ availableDays, reviews })
    }))
    return (
      <StMap
        google={google}
        initialCenter={{ lat: lat, lng: lng }}
        zoom={14}
      >
          <HeatMap
            opacity={0.8}
            gradient={MAP_GRADIENT}
            positions={positions}
          />
      </StMap>
    );

}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyC5XSu8Do0irPEnkgkba1HxZT58WcqOSIA'),
    libraries: ["visualization"]
})(MapContainer)
