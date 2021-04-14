import { BlurView } from 'expo-blur'
import React, { FunctionComponent } from 'react'
import { Text } from 'react-native';
type BlurBoxProps = {
    title: string,
    value: number,
    unit: string
}

export const BlurBox: FunctionComponent<BlurBoxProps> = ({ title, value, unit }) => {
    return (
        <BlurView intensity={40} tint={'dark'} style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', borderColor: 'rgba(255,255,255,0.5)', borderWidth: 0.5,borderRadius: 15, padding: 6, minWidth: 100,flex:1,marginHorizontal:10}}>
            <Text style={{ color: 'white', fontFamily: 'Roboto_100Thin', fontSize: 22 }}>
                {title}
            </Text>
            <Text style={{ color: 'white', fontFamily: 'Roboto_100Thin', fontSize: 44 }}>
                {value}
            </Text>
            <Text style={{ color: 'white', fontFamily: 'Roboto_100Thin', fontSize: 16 }}>
                {unit}
            </Text>
        </BlurView>
    )
}
