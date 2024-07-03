import React from 'react'
import { Image, View } from 'react-native'

export default function Loader() {
  return (
    <View className="h-[100vh] w-[100vw]  flex items-center pt-40" >
        <Image source={require("../../assets/loader1.gif")} className="w-50 h-50"/>
    </View>
  )
}
