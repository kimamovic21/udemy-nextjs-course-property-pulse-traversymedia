'use client';
import { useState, useEffect } from "react";
import { setDefaults, fromAddress } from "react-geocode";
import Map, { Marker } from 'react-map-gl';
import Image from "next/image";
import pin from '@/assets/images/pin.svg'
import 'mapbox-gl/dist/mapbox-gl.css';
import Spinner from "./Spinner";

const PropertyMap = ({ property }) => {
  // console.log('property: ', property);

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: '100%',
    height: '500px',
  });
  const [geocodeError, setGeocodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: 'en',
    region: 'us',
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(`
            ${property.location.street}
            ${property.location.city}
            ${property.location.state}
            ${property.location.zip}
        `);

        // Check for results 
        if (res.results.length === 0) {
          // No results fount
          setGeocodeError(true);
          setLoading(false);
          return;
        };

        const { lat, lng } = res.results[0].geometry.location;
        // console.log('latitude:', lat);
        // console.log('longitude:', lng);

        setLat(lat);
        setLng(lng);
        setViewport({
            ...viewport,
            latitude: lat,
            longitude: lng
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setGeocodeError(true);
        setLoading(false);
      }
    };
    
    fetchCoords();
  }, []);

  if (loading) return <Spinner loading={loading} />

  // Handle case where geocoding failed
  if (geocodeError) {
    return <div className="text-xl">No location data found!</div>
  };

  return !loading && (
    <Map 
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import('mapbox-gl')}
        initialViewState={{
            longitude: lng,
            latitude: lat,
            zoom: 15,
        }}
        style={{ width: '100%', height: 500 }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
    >
        <Marker 
            longitude={lng} 
            latitude={lat} 
            anchor="bottom"
        >
            <Image 
                src={pin} 
                alt="location" 
                width={40} 
                height={40} 
            />
        </Marker>
    </Map>
  );
};

export default PropertyMap;
