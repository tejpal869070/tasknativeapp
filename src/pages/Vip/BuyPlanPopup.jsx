import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { BuyPlan } from "../../controller/UserController";

export default function BuyPlanPopup({ visible, onClose, data, userBalance, refreshChield }) {
  const [isBuying, setBuying] = useState(false);
  const [zero, setZero] = useState(false);

  const handleBuyPlan = async () => {
    setBuying(true);
    if (userBalance < data.price) {
      Alert.alert(
        "Insufficient Fund",
        "Please recharge your wallet to buy this plan",
        [
          {
            text: "OK",
            onPress: () => onClose(),
          },
        ],
        { cancelable: false }
      );
      setBuying(false)
      return
    }
    const response = await BuyPlan(data);
    if(response.data.status===true){
      Alert.alert(
        "Success",
        "You have successfully purchased plan.",
        [
          {
            text: "OK",
            onPress: () => onClose(),
          },
        ],
        { cancelable: false }
      );
      setBuying(false)
      refreshChield()
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end align-top bg-black bg-opacity-50">
        <View className="bg-white p-4 rounded w-full h-[70vh] text-center">
          <View className="flex flex-row justify-around w-full items-center bg-gray-200   rounded-lg">
            <View className="w-1/2 ">
              <Text className="text-4xl font-bold "> {data.name} </Text>
              <Text className="ml-1 mt-3"> Earn upto- </Text>
              <Text className="text-4xl font-bold ml-2 ">
                Rs.{data.earn_upto}
              </Text>
            </View>
            <View className="w-1/2 ">
              <Image
                source={require("../../../assets/gold.png")}
                className="w-40 h-40"
              />
            </View>
          </View>

          <View className=" mt-6 ">
            <Text className="mb-1 py-0.5 pl-2 text-lg bg-gray-200 font-semibold rounded-lg">
              {data.total_like} Like Task
            </Text>
            <Text className="mb-1 py-0.5 pl-2 text-lg bg-gray-200 font-semibold rounded-lg">
              {data.total_comment} Comment Task
            </Text>
            <Text className="mb-1 py-0.5 pl-2 text-lg bg-gray-200 font-semibold rounded-lg">
              {data.total_video} Video Task
            </Text>
          </View>
          <View className="w-full flex flex-row justify-center mt-8">
            <Text
              className="w-1/2 bg-gray-300 text-xl font-semibold text-white text-center py-2 rounded-lg"
              onPress={handleBuyPlan}
              style={{ backgroundColor: "#00bf63" }}
            >
              {isBuying ? `Buying...` : `Buy Rs.${data.price}`}
            </Text>
          </View>
          <View className="w-full flex flex-row justify-center mt-2 ">
            <Text
              className="w-1/2 bg-gray-300 text-center py-2 rounded-lg"
              onPress={onClose}
            >
              Close
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}
