import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useState, useEffect } from "react";

const fetchUserLocation = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
            return false;
        }
        return true;
    };

    const getLocation = async () => {
        const hasPermission = await getPermissions();
        if (!hasPermission) return;

        let location = await Location.getCurrentPositionAsync({});
        let newLocation = {
            id: 442,
            title: "Your Current Location",
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };
        setLocation(newLocation);
    };

    useEffect(() => {
        getLocation();
    }, []);

    return { location, errorMsg };
};

export default fetchUserLocation;
