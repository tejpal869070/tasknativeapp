import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { GetUserDetails } from "../../controller/UserController";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import UserSettingPopup from "./UserSettingPopup";
import ChangePassword from "./ChangePassword";

export default function UserProfile({
  navigation,
  handleLogoutRedirection,
  ReferrelsRedirection,
}) {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [logouting, setLogouting] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [isVisible2, setVisible2] = useState(false);

  const GetUserData = async () => {
    try {
      const response = await GetUserDetails();
      if (response.status === 200) {
        setUserData(response.data.data[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    setLogouting(true);

    const deleteMobilePromise = SecureStore.deleteItemAsync("mobile");
    const deleteTokenPromise = SecureStore.deleteItemAsync("token");

    await Promise.all([deleteMobilePromise, deleteTokenPromise]);
    handleLogoutRedirection();

    setLogouting(false);
  };

  useEffect(() => {
    GetUserData();
  }, []);

  const childRefresh1 = () => {
    GetUserData();
  };

  const userSetting = () => {
    setVisible(!isVisible);
  };

  const passwordPopup = () => {
    setVisible2(!isVisible2);
  };

  return (
    <ScrollView className="mt-10">
      <Image
        source={require("../../../assets/header2.png")}
        className="w-[100vw] h-[270px] m-auto "
      />
      <View className="w-full mt-[-240px] mb-10">
        <Image
          source={require("../../../assets/user.png")}
          className="w-32 h-32 m-auto "
        />
        <Text className="text-center text-4xl text-white font-bold mt-2">
          {userData && userData.uname}
        </Text>
        <Text className="text-center text-white text-lg font-semibold ">
          UID:{userData && userData.uid}
        </Text>
      </View>
      <View className="pl-4 mt-4 bg-gray-300 py-2 mx-4 rounded-lg">
        <Text className="text-lg font-semibold">
          Mobile : {userData && userData.mobile}
        </Text>
        <Text className="text-lg font-semibold">
          Email : {userData && userData.email}
        </Text>
      </View>

      <View className="  px-4 py-4">
        <TouchableOpacity
          onPress={ReferrelsRedirection}
          className="flex flex-col justify-between w-full py-2 rounded-lg px-2 bg-gray-300 mb-3"
        >
          <View className="flex flex-row justify-between">
            <Text className="text-lg font-semibold">Referral Income</Text>
            <Text className="text-lg font-semibold"> Rs.0 </Text>
          </View>
          <View className="flex flex-row justify-between mt-1">
            <Text className="text-lg font-semibold">Referral Code</Text>
            <Text className="text-lg font-semibold">
              {userData && userData.reffer_code}
            </Text>
          </View>
        </TouchableOpacity>
        <View className="flex flex-row justify-between w-full py-2 rounded-lg px-2 bg-gray-300 mb-3">
          <Text className="text-lg font-semibold">Total Earning</Text>
          <Text className="text-lg font-semibold">
            Rs.
            {userData && userData.total_earnning ? userData.total_earnning : 0}
            /-
          </Text>
        </View>
        <View className="flex flex-row justify-between w-full py-2 rounded-lg px-2 bg-gray-300 mb-3">
          <Text className="text-lg font-semibold">Bank Account</Text>
          <Text className="text-lg font-semibold">
            {userData && userData.bank_name}
          </Text>
        </View>
        <TouchableOpacity
          className="flex flex-row  w-full py-2 justify-center rounded-lg px-2 bg-gray-300 mb-3"
          style={{ backgroundColor: "#0e88c4" }}
          onPress={() => passwordPopup()}
        >
          <Text className="text-lg font-semibold text-white">
            Change Password
          </Text>
          <Text className="pt-1 pl-1">
            <MaterialCommunityIcons name="security" color="white" size={20} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row  w-full py-2 justify-center rounded-lg px-2 bg-gray-300 mb-3"
          style={{ backgroundColor: "#0e88c4" }}
          onPress={() => userSetting()}
        >
          <Text className="text-lg font-semibold text-white">Edit Profile</Text>
          <Text className="pt-1 pl-1">
            <MaterialCommunityIcons
              name="account-settings"
              color="white"
              size={20}
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row justify-center w-full py-2 rounded-lg px-2  mb-3"
          style={{ backgroundColor: "#0e88c4" }}
          onPress={logout}
        >
          <Text className="text-lg text-white text-center font-semibold">
            {logouting ? "Logouting..." : "Logout"}
          </Text>
          <Text className="pt-1.5 pl-1">
            <MaterialCommunityIcons
              name="power-settings"
              color="white"
              size={20}
            />
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        {isVisible ? (
          <UserSettingPopup
            onClose={userSetting}
            userData={userData}
            childRefresh1={childRefresh1}
          />
        ) : (
          ""
        )}
      </View>

      <View>
        {isVisible2 ? <ChangePassword onClose={passwordPopup} /> : ""}
      </View>
    </ScrollView>
  );
}
