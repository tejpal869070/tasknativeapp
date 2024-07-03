import React, { useState } from "react";
import { ScrollView, TextInput, View, Text, Image } from "react-native";
import { userRegistration } from "../controller/UserController";

export default function Register({ navigation }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [referCode, setReferCode] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setIsLoading(true);
    if (userName && password && email && mobile ) {
      setFormError("");
      const userData = {
        userName: userName,
        password: password,
        email: email,
        mobile: mobile,
        reffer_by: referCode,
      };
      const response = await userRegistration(userData);
      if (response.status === 200) {
        console.log("register success");
        navigation.navigate("RegisterThanks");
      } else {
        setFormError(response.response.data.message);
      }
    } else if(mobile.length<10){
      setFormError("Please enter valid Mobile no.")
    } else if(password.length<6){
      setFormError("Password should be 6 and above")
    } else {
      setFormError("Please fill in all fields");
    }
    setIsLoading(false);
  };
  return (
    <ScrollView className="bg-black mt-8">
      <View className=" h-screen  ">
        <Image
          source={require("../../assets/logog.webp")}
          className="w-40 h-40 m-auto"
        />
        <Text className="font-bold text-5xl text-white m-auto "> TASK APP</Text>
        <View className="w-full bg-white rounded-[50px]">
          <Text className="text-black text-center mt-2"> {formError} </Text>
          <TextInput
            placeholder="Username"
            className="w-3/4 m-auto bg-[red] border-2 py-2 border-gray-500 pl-4 rounded-full text-gray-800 font-semibold mt-6 mb-2"
            value={userName}
            onChangeText={setUserName}
          />
          <TextInput
            placeholder="Password"
            className="w-3/4 m-auto bg-[red] border-2 py-2 border-gray-500 pl-4 rounded-full text-gray-800 font-semibold mt-4 mb-2"
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            placeholder="Email"
            className="w-3/4 m-auto bg-[red] border-2 py-2 border-gray-500 pl-4 rounded-full text-gray-800 font-semibold mt-4 mb-2"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Mobile"
            className="w-3/4 m-auto bg-[red] border-2 py-2 border-gray-500 pl-4 rounded-full text-gray-800 font-semibold mt-4 mb-2"
            value={mobile}
            onChangeText={setMobile}
          />
          <TextInput
            placeholder="Referrel Code"
            className="w-3/4 m-auto bg-[red] border-2 py-2 border-gray-500 pl-4 rounded-full text-gray-800 font-semibold mt-4 mb-2"
            value={referCode}
            onChangeText={setReferCode}
          />
          <Text
            className="w-3/4 m-auto font-bold text-lg  text-white text-center mt-4 py-3 rounded-full "
            style={{ backgroundColor: "#ff6e05" }}
            onPress={handleSignUp}
          >
            {isLoading ? "Loading..." : "SignUp"}
          </Text>
          <Text
            className="text-black my-4  text-center "
            onPress={() => navigation.navigate("Login")}
          >
            Already have an account ? Login now !
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
