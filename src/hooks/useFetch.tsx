import React, { useState, useEffect } from "react";
import { Ionicons, Feather, Entypo } from '@expo/vector-icons'
import { Alert } from "react-native";
import moment from "moment";

import defaultBG from '../assets/bgs/cloudyNight.jpg';

import cloudyDay from '../assets/bgs/cloudyDay.jpg';
import cloudyNight from '../assets/bgs/cloudyNight.jpg';

import drizzleDay from '../assets/bgs/drizzleDay.jpg';
import drizzleNight from '../assets/bgs/drizzleNight.jpg';

import mistDay from '../assets/bgs/mist.jpg';
import mistNight from '../assets/bgs/mist.jpg';

import snowDay from '../assets/bgs/snow.jpg';
import snowNight from '../assets/bgs/snow.jpg';

import thunderstormDay from '../assets/bgs/thunderstormDay.jpg';
import thunderstormNight from '../assets/bgs/thunderstormNight.jpg';

import clearDay from '../assets/bgs/clearDay.jpg';
import clearNight from '../assets/bgs/clearNight.jpg';

export const useFetch = (city: string) => {

    const weatherIdToIndex = (id: number) => {
        if (id <= 800) {
            return Math.floor(id / 100);
        }
        else {
            return Math.ceil(id / 100);
        }
    }

    const getBackground = (weatherID: number, currentHour: number) => {

        let dayNightIndex = (currentHour > 5 && currentHour < 20) ? 0 : 1;
        let bgs = [
            [cloudyDay, cloudyNight],
            [cloudyDay, cloudyNight],
            [thunderstormDay, thunderstormNight],
            [drizzleDay, drizzleNight],
            [cloudyDay, cloudyNight],
            [drizzleDay, drizzleNight],
            [snowDay, snowNight],
            [mistDay, mistNight],
            [clearDay, clearNight],
            [cloudyDay, cloudyNight],
        ]

        // return bgs[weatherIdToIndex(weatherID)][dayNightIndex];
        return bgs[8][0];
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
        time: new Date().toLocaleTimeString(),
        weatherDescription: 'Opis vremena',
        icon: icons[8],
        weatherMain: 'Vrijeme',
        wind: 0,
        clouds: 0,
        humidity: 0,
        background: cloudyNight
    }

    const [outputData, setOutputData] = useState(defaultData);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(true);

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
                let currentHour = moment().utc().add(result.timezone * 1000).hour();
                setOutputData({
                    name: result.name,
                    country: result.sys.country,
                    temperature: Math.round((result.main.temp - 273.15) * 10) / 10,
                    time: moment().utc().add(result.timezone * 1000).format("HH:mm"),
                    weatherDescription: result.weather[0].description[0].toUpperCase() + result.weather[0].description.slice(1),
                    icon: icons[weatherIdToIndex(result.weather[0].id)],
                    weatherMain: result.weather[0].main,
                    wind: result.wind.speed,
                    clouds: result.clouds.all,
                    humidity: result.main.humidity,
                    background: getBackground(result.weather[0].id,currentHour)
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
