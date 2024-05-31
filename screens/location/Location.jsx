import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import fetchUserLocation from '../../hook/fetchLocation';

const Location = () => {
    const { location, errorMsg } = fetchUserLocation();
    const [region, setRegion] = useState(null);

    useEffect(() => {
        if (location) {
            setRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        }
    }, [location]);

    const initialRegion = {
        latitude: 35.6855,
        longitude: 139.68884,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    if (errorMsg) {
        return (
            <View style={styles.centered}>
                <Text>{errorMsg}</Text>
            </View>
        );
    }

    return (
        <MapView 
            initialRegion={initialRegion} 
            region={region} 
            onRegionChangeComplete={setRegion}
            style={styles.mapStyle}
        >
            {location && (
                <Marker 
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }} 
                    title={"My location"} 
                />
            )}
        </MapView>
    );
};

export default Location;

const styles = StyleSheet.create({
    mapStyle: {
        width: "100%",
        height: "100%",
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
