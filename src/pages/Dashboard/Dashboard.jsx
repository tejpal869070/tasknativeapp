import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserProfile from "./UserProfile";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import WalletIndex from "../Wallet/WalletIndex";
import MyTask from "../Tasks/MyTask";
import Vip from "../Vip/Vip";

const Tab = createBottomTabNavigator();

export default function Dashboard({ navigation }) {
  const handleLogoutRedirection = () => {
    navigation.navigate("Welcome");
  };

  const ReferrelsRedirection = () => {
    navigation.navigate("Referrels");
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Tasks"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color="black" size={20} />
          ),
          headerShown: false,
        }}
      >
        {() => <MyTask />}
      </Tab.Screen>
      <Tab.Screen
        name="VIP"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="gold" color="black" size={20} />
          ),
          headerShown: false,
        }}
      >
        {() => <Vip />}
      </Tab.Screen>
      <Tab.Screen
        name="Peofile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color="black" size={20} />
          ),
          headerShown: false,
        }}
      >
        {() => (
          <UserProfile
            handleLogoutRedirection={handleLogoutRedirection}
            ReferrelsRedirection={ReferrelsRedirection}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Wallet"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wallet" color="black" size={20} />
          ),
          headerShown: false,
        }}
      >
        {() => <WalletIndex />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
