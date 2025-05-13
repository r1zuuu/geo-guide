"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Client({ geoData, getCountryStyle, activeFilter }) {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "90vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoData && (
        <GeoJSON key={activeFilter} data={geoData} style={getCountryStyle} />
      )}
    </MapContainer>
  );
}
