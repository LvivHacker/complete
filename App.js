
import { useFonts } from 'expo-font';
import * as Splashscreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
  Search, 
  CountryDetails, 
  AllReviews, 
  AddReviews, 
  Recommended, 
  PlaceDetails, 
  HotelDetails, 
  HotelList, 
  HotelSearch, 
  SelectRoom, 
  Payments, 
  Settings, 
  SelectedRoom, 
  Successful, 
  Failed, 
  PopularDestinations, 
  PaymentMethod, 
  PopularHotels } from './screens';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import AuthTopTab from './navigation/AuthTopTab';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddCard from './screens/setttings/AddCard';




const Stack = createNativeStackNavigator();

export default function App() {
  const [firstLaunch, setFirstLaunch] = useState(true);

  const appFirstLaunch = async () => {
    const onboarding = await AsyncStorage.getItem('first')
    if(onboarding !== null){
      setFirstLaunch(false)
    }else{
      setFirstLaunch(true)
    }
}

useEffect(() => {
  appFirstLaunch();
}, [])
  const [fontsLoaded] = useFonts({
    regular: require('./assets/fonts/regular.otf'),
    medium: require('./assets/fonts/medium.otf'),
    bold: require('./assets/fonts/bold.otf'),
    light: require('./assets/fonts/light.otf'),
    xtrabold: require('./assets/fonts/xtrabold.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await Splashscreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }



  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Bottom" screenOptions = {{headerShown: false}}>
        <Stack.Screen name='Bottom' component={BottomTabNavigation}/>
        <Stack.Screen name='Search' component={Search}/>
        <Stack.Screen name='CountryDetails' component={CountryDetails}/>
        <Stack.Screen name='Recommended' component={Recommended}/>
        <Stack.Screen name='AddReviews' component={AddReviews}/>
        <Stack.Screen name='AllReviews' component={AllReviews}/>
        <Stack.Screen name='PlaceDetails' component={PlaceDetails}/>
        <Stack.Screen name='HotelDetails' component={HotelDetails}/>
        <Stack.Screen name='HotelList' component={HotelList}/>
        <Stack.Screen name='HotelSearch' component={HotelSearch}/>
        <Stack.Screen name='SelectRoom' component={SelectRoom}/>
        <Stack.Screen name='PlacesByCountry' component={PopularDestinations}/>
        <Stack.Screen name='Payments' component={PaymentMethod}/>
        <Stack.Screen name='Success' component={Successful}/>
        <Stack.Screen name='AuthTop' component={AuthTopTab}/>
        <Stack.Screen name='Fail' component={Failed}/>
        <Stack.Screen name='Settings' component={Settings}/>
        <Stack.Screen name='SelectedRoom' component={SelectedRoom}/>
        <Stack.Screen name='AddCard' component={AddCard}/>
        <Stack.Screen name='PopularHotels' component={PopularHotels}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
