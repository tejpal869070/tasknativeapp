import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { userLogin } from "../controller/UserController";
import * as SecureStore from "expo-secure-store";
 
export default function Login({ navigation }) {
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    if (password && mobile) {
      setFormError("");
      const userData = {
        password: password,
        mobile: mobile,
      };
      const response = await userLogin(userData);
      if (response.status === 200) {
        SecureStore.setItem("token", response.data.token);
        SecureStore.setItem("mobile", response.data.mobile);
        setPassword("");
        setMobile("");
        navigation.navigate("Dashboard");
      } else {
        setFormError(response.response.data.message);
      }
    } else {
      setFormError("Please fill in all fields");
    }
    setIsLoading(false);
  };

  return (
    <ScrollView className="bg-black mt-8">
      <View className="  h-screen  ">
        <Image
          source={require("../../assets/logog.webp")}
          className="w-40 h-40 m-auto"
        />
        <Text className="font-bold text-5xl text-white m-auto mt-[-100px]">
          {" "}
          TASK APP
        </Text>
        <View className="bg-white rounded-[50px]  w-full mt-[-50px]">
          <Text className="text-white text-center"> {formError} </Text>
          <TextInput
            placeholder="Mobile"
            className="w-3/4 m-auto bg-[red] border-2 py-2 border-gray-500 pl-4 rounded-full text-gray-800 font-semibold mt-6 mb-4"
            value={mobile}
            onChangeText={setMobile}
          />
          <TextInput
            placeholder="Password"
            className="w-3/4 m-auto bg-[red] border-2 py-2 border-gray-500 pl-4 rounded-full text-gray-800 font-semibold mb-6"
            value={password}
            onChangeText={setPassword}
          />
          <Text
            className="w-3/4 m-auto font-bold text-lg  text-white text-center py-3 rounded-full "
            onPress={handleLogin}
            style={{ backgroundColor: "#ff6e05" }}
          >
            {isLoading ? "Loading..." : "Login"}
          </Text>
          <Text
            className=" text-black text-center mt-6 mb-4"
            onPress={() => navigation.navigate("Register")}
          >
            Don't have and account? SignUp Now! 
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
