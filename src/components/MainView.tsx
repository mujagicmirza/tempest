
import { Roboto_100Thin, useFonts } from '@expo-google-fonts/roboto';
import { SimpleLineIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, ImageBackground, Text, TextInput, TouchableHighlight, View } from 'react-native';
// @ts-ignore
import background from '../assets/bgs/cloudyNight.jpg';
import { useFetch } from '../hooks/useFetch';
import { BlurBox } from './BlurBox';

export default function MainView() {

  const [city, setCity] = useState('Bihać');
  const [data, loading, success] = useFetch(city);

  let degC = '°ᶜ';

  let [fontsLoaded] = useFonts({
    Roboto_100Thin
  });


  if (!fontsLoaded) {
    return <Text>Loading...</Text>
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black', minHeight: Math.round(Dimensions.get('window').height) }}>
      <ImageBackground source={data.background} style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.2)' }}></View>

        <View style={{ padding: 20, flex: 1, paddingVertical: 30 }}>

          <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <SimpleLineIcons name='magnifier' size={22} color='white' style={{ marginRight: 10 }} />
            <TextInput placeholder='Potraži grad' onSubmitEditing={e => setCity(e.nativeEvent.text)} style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10, height: 40, flex: 10, marginRight: 10, paddingHorizontal: 10, color: 'white', fontFamily: 'Roboto_100Thin', fontSize: 16 }} placeholderTextColor="rgba(255,255,255,0.8)"></TextInput>
            <TouchableHighlight onPress={() => { let oldCity = city; setCity(' '); setCity(oldCity) }}>
              <SimpleLineIcons name='reload' size={22} color='white' />
            </TouchableHighlight>
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <Text style={{ color: 'white', fontSize: 44, fontFamily: 'Roboto_100Thin' }}>{data.name}</Text>
              <Text style={{ color: 'white', fontSize: 22, paddingLeft: 5, bottom: 5, fontFamily: 'Roboto_100Thin' }}>{data.country}</Text>
            </View>
            <Text style={{ color: 'white', fontSize: 22, fontFamily: 'Roboto_100Thin' }}>{data.time}</Text>
          </View>

          <View style={{ flex: 10, justifyContent: 'center' }}>
            <Text adjustsFontSizeToFit={true} numberOfLines={1} style={{ color: 'white', fontSize: 120, fontFamily: 'Roboto_100Thin' }}>{data.temperature}{degC}</Text>
            <View style={{ flexDirection: 'row' }}>
              {data.icon}
              <Text style={{ color: 'white', fontSize: 40, fontFamily: 'Roboto_100Thin', left: 5 }}>{data.weatherDescription}</Text>
            </View>
          </View>


          <View style={{ flex: 4, justifyContent: 'space-evenly', flexDirection: 'row' }}>
            <BlurBox title="Vjetar" value={data.wind} unit="m/s" />
            <BlurBox title="Vlažnost" value={data.humidity} unit="%" />
            <BlurBox title="Oblaci" value={data.clouds} unit="%" />
          </View>


        </View>
        {loading ? (
          <ActivityIndicator color='white' style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
        ) : <View></View>}

        {!success && !loading ?
          <View pointerEvents='none' style={{ position: 'absolute', bottom: 0, top: 0, right: 0, left: 0, paddingTop: 300, justifyContent: 'flex-start', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 22, fontFamily: 'Roboto_100Thin', padding: 20, backgroundColor: 'rgba(50,50,50,0.9)', borderRadius: 10 }}>Grad "{city}" nije pronađen.</Text>
          </View> : <View></View>}
      </ImageBackground>
    </View>

  );
}