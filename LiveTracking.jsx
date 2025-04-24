import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
{
const containerStyle = {
    width: '100%',
    height: '100vh',
};

const defaultCenter = {
    lat: 28.6139, // New Delhi
    lng: 77.2090
};

const LiveTracking = () => }{
    const [currentPosition, setCurrentPosition] = useState(defaultCenter);

    useEffect(() => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        // Initial position
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({ lat: latitude, lng: longitude });
            },
            (error) => {
                console.error("Error getting location:", error);
            }
        );

        // Watch position continuously
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({ lat: latitude, lng: longitude });
            },
            (error) => {
                console.error("Error watching position:", error);
            },
            { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={17}
            >
                <Marker position={currentPosition} />
            </GoogleMap>
        </LoadScript>
    );
};

export default LiveTracking;
