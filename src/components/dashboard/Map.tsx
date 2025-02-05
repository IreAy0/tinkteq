import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

interface MapProps {
  locations: [number, number][];
}

const Map: React.FC<MapProps> = ({ locations }) => {
  return (
    <MapContainer center={[20, 0]} zoom={2} className="w-full h-full" scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {locations.map((location, index) => (
        <Marker key={index} position={location}>
          <Popup>Shipment Location {index + 1}</Popup>
        </Marker>
      ))}
  </MapContainer>
  )
}

export default Map