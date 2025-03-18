import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';



export default function Layout(){
    return (
        <Tabs>
            <Tabs.Screen 
                name="player-frontpage" 
                options={{ 
                    headerTitle: "Frontpage", 
                    tabBarLabel: "Frontpage",
                    tabBarIcon: () => <Ionicons name="home" size={30}></Ionicons>  
                }}
            />
            <Tabs.Screen
                name="player-calender"
                options={{ 
                    headerTitle: "Calender", 
                    tabBarLabel: "Calender",
                    tabBarIcon: () => <Fontisto name="date" size={30}></Fontisto>  
                }}
            />
            <Tabs.Screen
                name="player-profile"
                options={{ 
                    headerTitle: "Profile",
                    tabBarLabel: "Profile",
                    tabBarIcon: () => <AntDesign name="user" size={30}></AntDesign>
                }}
            />
        </Tabs>
    );
}
