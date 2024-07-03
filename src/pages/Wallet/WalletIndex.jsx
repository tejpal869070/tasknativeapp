import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import History from "./History";
import { GetUserDetails, GetUserPaymentHistory } from "../../controller/UserController";
import Loader from "../../componentes/Loader";

export default function WalletIndex() {
  const [activeTab, setActiveTab] = useState("Deposit");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [history, SetHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    GetUserData()
  };

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

  const GetHistory = async () => {
    try {
      const response = await GetUserPaymentHistory();
      if (response.status === 200) {
        SetHistory(response.data.data)
        setHistoryLoading(false);
      }
    } catch (error) {}
  };

  const withdrawChildFunction1=()=>{
    GetUserData()
  }

  useEffect(() => {
    GetUserData();
  }, []);

  useEffect(() => {
    GetHistory();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Deposit":
        return <Deposit />;
      case "Withdraw":
        return <Withdraw withdrawChildFunction1={withdrawChildFunction1} />;
      case "History":
        return <History history={history}/>;
      default:
        return null;
    }
  };
  return (
    <ScrollView className="mt-8">
      <View className="bg-black h-48 w-full ">
        <View className="pt-6 p-6 flex flex-row  justify-between">
          <Text className="text-white font-semibold text-xl">Hyy Tarun</Text>
          <Image
            source={require("../../../assets/user.png")}
            className="w-10 h-10"
          />
        </View>
        <View className="px-5 flex flex-row justify-between">
          <View>
            <Text className="text-white">Wallet Balance</Text>
            <Text className="text-white text-lg font-semibold">
              Rs.{loading ? "00" : userData.wallet_balance}
            </Text>
          </View>
          <View>
            <Text className="text-white">Winning Balance</Text>
            <Text className="text-white text-lg font-semibold">
              Rs.{loading ? "00" : userData.winning_balance}
            </Text>
          </View>
        </View>
      </View>
      <View
        className="w-[90%] flex flex-row justify-around items-center align-center h-28 m-auto mt-[-45] rounded-lg "
        style={{ backgroundColor: "#ff5757" }}
      >
        <TouchableOpacity
          className="flex justify-center text-center items-center"
          onPress={() => handleTabPress("Deposit")}
        >
          <Image
            source={require("../../../assets/deposit.png")}
            className="w-10 h-10"
          />
          <Text className="text-white">Deposit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex justify-center text-center items-center"
          onPress={() => handleTabPress("Withdraw")}
        >
          <Image
            source={require("../../../assets/withdraw.png")}
            className="w-10 h-10"
          />
          <Text className="text-white">Withdraw</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex justify-center text-center items-center"
          onPress={() => handleTabPress("History")}
        >
          <Image
            source={require("../../../assets/transection.png")}
            className="w-10 h-10"
          />
          <Text className="text-white">History</Text>
        </TouchableOpacity>
      </View>
      {historyLoading ? (
        <Loader/>
      ) : (
        <View className="w-full">{renderTabContent()}</View>
      )}
    </ScrollView>
  );
}
