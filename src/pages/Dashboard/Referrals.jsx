import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { GetReferData, GetUserDetails } from "../../controller/UserController";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import * as Clipboard from "expo-clipboard";

export default function Referrals() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const [userData, setUserData] = useState();

  const [successRef, setSuccessRef] = useState(0);
  const [pendingRef, setPendingRef] = useState(0);

  const [isCopied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const textToCopy = userData && userData.reffer_code;
    Clipboard.setString(textToCopy);
    setCopied(true);
  };

  const GetMyReferrals = async () => {
    try {
      const response = await GetReferData();
      setData(response.data);
      const successRefCount = await response.data.filter(
        (item) => item.status === "Success"
      ).length;
      const pendingRefcount = await response.data.filter(
        (item) => item.status === "Pending"
      ).length;

      setSuccessRef(successRefCount);
      setPendingRef(pendingRefcount);

      setLoading(false);
    } catch (error) {
      setError("Something went wrong. Please login again.");
      setLoading(false);
    }
  };

  const GetUserData = async () => {
    try {
      const response = await GetUserDetails();
      if (response.status === 200) {
        setUserData(response.data.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetMyReferrals();
    GetUserData();
  }, []);

  return (
    <ScrollView className="px-2">
      <View className="w-full ">
        <Image
          source={require("../../../assets/referbg.jpeg")}
          className="w-full h-40"
        />
      </View>
      <View className="pb-4 mt-4 bg-gray-300 rounded-lg">
        <View className="flex flex-row justify-between px-2 py-4">
          <Text className="w-1/3">Total Referrals</Text>
          <Text className="w-1/4">Success</Text>
          <Text className="w-1/4">Pending</Text>
          <Text className="w-1/4">Earnings</Text>
        </View>
        <View className="flex flex-row justify-between px-2">
          <Text className="w-1/3 text-lg font-semibold">
            {data && data.length}
          </Text>
          <Text className="w-1/4 text-lg font-semibold"> {successRef} </Text>
          <Text className="w-1/4 text-lg font-semibold"> {pendingRef} </Text>
          <Text className="w-1/4 text-lg font-semibold"> +₹10 </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={copyToClipboard}
        className="flex flex row items-center pt-3"
      >
        <Text
          className="text-right p-2 rounded-full text-white font-bold  "
          style={{ backgroundColor: "#cc4646" }}
        >
          {isCopied ? "Copied" : "Copy Code"}
        </Text>
      </TouchableOpacity>

      <View className="bg-gray-400 flex flex-row fixed mt-4">
        <Text className="w-[10%] font-bold p-1.5 ">No.</Text>
        <Text className="w-1/4   font-bold p-2 ">Name</Text>
        <Text className="w-1/5   font-bold p-2 ">Level</Text>
        <Text className="w-1/4   font-bold p-2 ">Status</Text>
        <Text className="w-1/4   font-bold p-2 ">Earning</Text>
      </View>
      {data &&
        data.reverse().map((item, index) => (
          <View
            className={`flex flex-row ${
              (index + 3) % 2 === 0 ? "bg-gray-200" : "bg-white"
            }`}
            key={index}
          >
            <Text className="w-[10%] p-2 ">{index + 1}.</Text>
            <Text className="w-1/4  p-2  text-left"> {item.username}</Text>
            <Text className="w-1/5 p-2  text-left"> {item.level}</Text>
            <Text className="w-1/4 p-2 text-left">{item.status} </Text>
            <Text className="w-1/4 p-2 text-left">+₹5 </Text>
          </View>
        ))}
    </ScrollView>
  );
}
