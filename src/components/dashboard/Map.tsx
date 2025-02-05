import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import Image from '../../assets/map-pin.png'
interface MapProps {
  locations: [number, number][];
}

const customIcon = new L.Icon({
  iconUrl: Image, 
  iconSize: [32, 32], 
  iconAnchor: [16, 32], 
  popupAnchor: [0, -32]
})

const Map: React.FC<MapProps> = ({ locations }) => {
  return (
    <MapContainer center={[20, 0]} zoom={2} className="w-full h-full" scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {locations.map((location, index) => (
        <Marker key={index} position={location} icon={customIcon}>
        <Popup>{location}</Popup>
        </Marker>
      ))}
  </MapContainer>
  )
}

export default Map