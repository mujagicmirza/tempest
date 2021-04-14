import { Roboto_100Thin, useFonts } from '@expo-google-fonts/roboto';
import { StyleProp, Text, TextStyle } from 'react-native';

type Props = {
    text: String,
    children: JSX.Element,
    style: StyleProp<TextStyle>
}

export default function MText({ text, children, style }: Props) {

    let [fontsLoaded] = useFonts({
        Roboto_100Thin
    });
    return (
        <Text style={{ color: 'white', fontFamily: 'Roboto_100Light' }}></Text>
    )
}
