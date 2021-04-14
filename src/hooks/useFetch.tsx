import React, { useState, useEffect } from "react";
import { Ionicons, Feather, Entypo } from '@expo/vector-icons'
import { Alert } from "react-native";

export const useFetch = (city: string) => {

    const getIconIndex = (id: number) => {
        if (id <= 800) {
            return Math.floor(id / 100);
        }
        else {
            return Math.ceil(id / 100);
        }
    }

    let icons = [
        <Entypo name="air" size={40} color="white" />,
        <Entypo name="air" size={40} color="white" />,
        <Ionicons name="thunderstorm-outline" size={40} color="white" />,
        <Feather name="cloud-drizzle" size={40} color="white" />,
        <Entypo name="air" size={40} color="white" />,
        <Ionicons name="rainy-outline" size={40} color="white" />,
        <Ionicons name="snow-outline" size={40} color="white" />,
        <Entypo name="air" size={40} color="white" />,
        <Ionicons name="sunny-outline" size={40} color="white" />,
        <Ionicons name="cloudy-outline" size={40} color="white" />
    ];

    let defaultData = {
        name: 'Grad',
        country: 'DRŽAVA',
        temperature: 0,
        time: new Date().toLocaleDateString(),
        weatherDescription: 'Opis vremena',
        icon: icons[8],
        weatherMain: 'Vrijeme',
        wind: 0,
        clouds: 0,
        humidity: 0
    }

    const [outputData, setOutputData] = useState(defaultData);
    const [loading, setLoading] = useState(true);
    const [success,setSuccess] = useState(true);

    useEffect(() => {
        setLoading(true);
        setSuccess(false);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7d5f136c1924b102af5ce0a242c95e0a&lang=hr`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else if (response.status === 404) {
                    return Promise.reject('NOT_FOUND');
                }
                else {
                    return Promise.reject('FETCH_FAILED');
                }
            })
            .then(result => {
                setOutputData({
                    name: result.name,
                    country: result.sys.country,
                    temperature: Math.round((result.main.temp - 273.15) * 10) / 10,
                    time: new Date(result.dt * 1000).toLocaleDateString(),
                    weatherDescription: result.weather[0].description[0].toUpperCase() + result.weather[0].description.slice(1),
                    icon: icons[getIconIndex(result.weather[0].id)],
                    weatherMain: result.weather[0].main,
                    wind: result.wind.speed,
                    clouds: result.clouds.all,
                    humidity: result.main.humidity
                });
                setLoading(false);
                setSuccess(true);
            })
            .catch((error) => {
                setLoading(false);
                setSuccess(false);
            })
    }, [city]);

    return [outputData, loading, success] as const;
}
