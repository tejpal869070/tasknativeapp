import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/pages/Login";
import Dashboard from "./src/pages/Dashboard/Dashboard";
import Register from "./src/pages/Register";
import RegisterThanks from "./src/componentes/RegisterThanks";
import { useEffect, useState } from "react"; 
import WelcomePage from "./src/pages/WelcomePage";
import UserProfile from "./src/pages/Dashboard/UserProfile";
import WinningHistory from "./src/pages/Tasks/WinningHistory";
import Referrals from "./src/pages/Dashboard/Referrals";

const Stack = createStackNavigator();

export default function App() {
  // const [showWelcome, setShowWelcome] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowWelcome(true);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomePage} options={{headerShown:false}}/>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
          <Stack.Screen name="RegisterThanks" component={RegisterThanks} options={{ headerShown: false }}/>
          <Stack.Screen name="WinningHistory" component={WinningHistory} />
          <Stack.Screen name="Referrels" component={Referrals} />
          <Stack.Screen name="UerProfile" component={UserProfile}/>
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
