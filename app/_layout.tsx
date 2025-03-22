import { Stack } from "expo-router";
import { useState } from "react";

export default function RootLayout() {
  const [isCoach, setIsCoach] = useState(false); // Ændre denne til true/false for test

  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" options={{headerShown: false}} />
      {isCoach ? (
        <Stack.Screen name="(playertabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(playertabs)" options={{ headerShown: false }} />
      )}
      <Stack.Screen name="+not-found"></Stack.Screen>
    </Stack>
  );
}
