import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as parkingLot from "./parking.geojson";

export default function Mapbox() {
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });
  const [selectedParkingLot, setSelectedParkingLot] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedParkingLot(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibmFkaW1rMSIsImEiOiJja2doaGh5dWowM292MnpudW03MHc2MzdwIn0.TU9JkM8-F3FZ5RKTTO3n9A"
        mapStyle="mapbox://styles/nadimk1/ckghhntfd19g51ao0zjbqcu65"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {parkingLot.features.map((parkingLot) => (
          <Marker
            key={parkingLot.id}
            latitude={parkingLot.geometry.coordinates[1]}
            longitude={parkingLot.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                setSelectedParkingLot(parkingLot);
              }}
            >
              <img src="/Assets/Parking-Log.svg" alt="Parking Lot Icon" />
            </button>
          </Marker>
        ))}

        {selectedParkingLot ? (
          <Popup
            latitude={selectedParkingLot.geometry.coordinates[1]}
            longitude={selectedParkingLot.geometry.coordinates[0]}
            onClose={() => {
              setSelectedParkingLot(null);
            }}
          >
            <div>
              <h2>{selectedParkingLot.text}</h2>
              <p>{selectedParkingLot.place_name}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}
