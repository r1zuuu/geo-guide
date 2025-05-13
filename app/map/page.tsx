"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamiczny import Client.jsx
const MapClient = dynamic(() => import("./Client"), { ssr: false });

const filters = {
  yellow: ["NL", "GB"],
  left: ["GB", "JP", "TH"],
  streetview: ["NL", "GB", "DE", "JP", "AE", "TH", "LA", "SN"],
};

export default function MapPage() {
  const [geoData, setGeoData] = useState(null);
  const [activeFilter, setActiveFilter] = useState("");

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  const getCountryStyle = (feature) => {
    const code = feature.properties.ISO_A2;
    const isHighlighted = activeFilter && filters[activeFilter]?.includes(code);
    return {
      fillColor: isHighlighted ? "green" : "#ccc",
      weight: 1,
      color: "#666",
      fillOpacity: 0.6,
    };
  };

  return (
    <div className="w-full h-screen">
      <div className="flex gap-2 p-2">
        <button onClick={() => setActiveFilter("yellow")}>Żółte tablice</button>
        <button onClick={() => setActiveFilter("left")}>Lewa strona jazdy</button>
        <button onClick={() => setActiveFilter("streetview")}>Street View</button>
        <button onClick={() => setActiveFilter("")}>Resetuj</button>
      </div>
      <MapClient geoData={geoData} getCountryStyle={getCountryStyle} activeFilter={activeFilter} />
    </div>
  );
}
