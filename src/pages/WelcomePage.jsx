import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { CheckUserToken } from "../controller/UserController";
import { TouchableOpacity } from "react-native";

export default function WelcomePage({ navigation }) {
  const checkAuthentication = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const mobile = await SecureStore.getItemAsync("mobile");

      await new Promise((resolve) => setTimeout(resolve, 3000));
      if (token && mobile) {
        const response = await CheckUserToken(token, mobile);
        if (response.data.status === true) {
          navigation.navigate("Dashboard");
        } else {
          navigation.navigate("Login");
        }
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      navigation.navigate("Login");
    }
  };
  useEffect(() => {
    checkAuthentication();
  }, [navigation]);




  return (
    <TouchableOpacity
      activeOpacity={1}
      className=""
      onPress={checkAuthentication}
    >
      <Image
        source={require("../../assets/coral2.gif")}
        resizeMode="cover"
        width={100}
        height={100}
        style={{ width: "100%", height: "100%" }}
        onLoad={checkAuthentication}
      />
    </TouchableOpacity>
  );
}
