import React from 'react'
import { Button, Image, Text, View } from 'react-native'

export default function RegisterThanks({ navigation }) {
  return (
    <View className="flex flex-col justify-center items-center h-screen bg-white">
        <Image source={require("../../assets/img2.jpg")} className="w-40  h-40"/>
        <Text className="mb-10 text-2xl font-gold">Thanks for register with us</Text>
        <View className="w-full">
        <Text style={{ backgroundColor: "#ff6e05" }} className="w-1/2 m-auto font-bold text-lg  text-white text-center mt-4 py-3 rounded-lg" onPress={()=>navigation.navigate("Login")}>Login Now !</Text>
        </View>
    </View>
  )
}
