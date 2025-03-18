import { View, StyleSheet } from "react-native";
import { Stack, Link } from "expo-router";

export default function NotFoundScreen(){
    return (
        <>
            <Stack.Screen options={{title:"Page Not Found"}}></Stack.Screen>
            <View>
                <Link href={"/"}>
                Go back to home screen</Link>
            </View>
        </>
    )
}