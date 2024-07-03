import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  GetPlanBuyHistory,
  GetPlanDetails,
  GetUserDetails,
} from "../../controller/UserController";
import BuyPlanPopup from "./BuyPlanPopup";

export default function Vip() {
  const [history, setHistory] = useState([]);
  const [planData, setPlanData] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [singlePlan, setSingleplan] = useState();

  const [earningPot, setEarningPot] = useState();

  const [userData, setUserData] = useState();

  const [likeCount, setLikeCount] = useState();
  const [commentCount, setCommentCount] = useState();
  const [videoCount, setVideoCount] = useState();

  const PlanPopUp = (item) => {
    GetUserData() 
    setVisible(!isVisible);
    setSingleplan(item);
  };

  const PlanHistory = async () => {
    const response = await GetPlanBuyHistory();
    setHistory(response.data.data);
    setLikeCount(
      response.data.data
        .filter((entry) => entry.status === "Active")
        .reduce((total, current) => total + parseFloat(current.total_like), 0)
    );
    setCommentCount(
      response.data.data
        .filter((entry) => entry.status === "Active")
        .reduce(
          (total, current) => total + parseFloat(current.total_comment),
          0
        )
    );

    setVideoCount(
      response.data.data
        .filter((entry) => entry.status === "Active")
        .reduce((total, current) => total + parseFloat(current.total_video), 0)
    );
    setEarningPot(
      response.data.data
        .filter((entry) => entry.status === "Active")
        .reduce((total, current) => total + parseFloat(current.earn_upto), 0)
    );
  };

  const GetPlan = async () => {
    const response = await GetPlanDetails();
    setPlanData(response);
  };

  const refreshChield = () => {
    PlanHistory();
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
    PlanHistory();
    GetPlan();
    GetUserData();
  }, []);

  return (
    <ScrollView>
      <View className="pb-10">
        <View className="mt-10 w-full " />
        <View
          className="bg-black flex flex-row items-center justify-between"
          style={{ backgroundColor: "#ff5757" }}
        >
          <View className="w-1/2 ">
            <Image
              source={require("../../../assets/trophy.png")}
              className=" w-40 h-40"
            />
          </View>
          <View className="w-1/2 ">
            <Text className="text-white text-lg">
              Your current earning potential is :
            </Text>
            <Text className="text-white text-2xl font-semibold mt-2">
              Rs.{earningPot && earningPot}/-
            </Text>
          </View>
        </View>

        <Text className="text-center text-2xl font-bold mt-2">Tasks</Text>
        <View className="bg-gray-300 mx-4 p-2 mt-2 rounded-lg flex flex-row justify-around items-center">
          <Text className="mb-3 text-lg font-bold">You have : </Text>
          <View>
            <Text className="mb-1 text-lg font-bold">
              {likeCount && likeCount} Like tasks
            </Text>
            <Text className="mb-1 text-lg font-bold">
              {commentCount && commentCount} Video tasks
            </Text>
            <Text className="mb-1 text-lg font-bold">
              {videoCount && videoCount} Comment tasks
            </Text>
          </View>
        </View>
        <Text className="text-center font-bold text-2xl my-2 mt-6">
          Buy Plan
        </Text>

        <View className="flex flex-row flex-wrap items-center justify-around mx-2 mb-6">
          {planData &&
            planData.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  if (index !== 0) {
                    PlanPopUp(item);
                  }
                }}
                key={index}
                className={`w-[48%] h-40 rounded-lg flex align-center bg-gray-200 items-center justify-between mb-2 `}
                
              >
                <Text
                  className=" rounded-t-lg pl-1 text-xl text-white text font-bold bg-black w-full mb-2 py-1"
                  style={{ backgroundColor: "#73d8ff" }}
                >
                  {item.name}
                </Text>
                <Text className=" rounded-lg ">Earn upto</Text>
                <Text className=" rounded-lg text-2xl my-2 font-bold">
                  Rs.{item.earn_upto}
                </Text>
                <Text
                  className=" rounded-b-lg text-lg font-bold w-full  text-center py-1 "
                  style={{ backgroundColor: "#73d8ff" }}
                >
                  {item.price == 0 ? "Free" : `Price ${item.price}`}
                </Text>
              </TouchableOpacity>
            ))}
        </View>

        <View>
          {isVisible ? (
            <BuyPlanPopup
              onClose={PlanPopUp}
              data={singlePlan}
              userBalance={userData.wallet_balance}
              refreshChield={refreshChield}
            />
          ) : (
            ""
          )}
        </View>

        <View className="table-auto mt-4   mx-2 ">
          <View className="bg-gray-400 flex flex-row fixed ">
            <Text className="w-[12%] border-r-2 border-gray-300 font-bold p-2 ">
              No.
            </Text>
            <Text className="w-[16%]   font-bold p-2 ">Plan</Text>
            <Text className="w-[19%]   font-bold p-2 ">Status</Text>
            <Text className="w-[26%]   font-bold p-2 ">Buy</Text>
            <Text className="w-[26%]   font-bold p-2 ">Expire</Text>
          </View>

          <View>
            <View className="">
              {history &&
                history.map((item, index) => (
                  <View
                    className={`flex flex-row  ${
                      (index + 2) % 2 === 0 ? "bg-gray-100" : "bg-gray-300"
                    }`}
                    key={index}
                  >
                    <Text className="w-[12%] border-r-2 border-gray-300 p-2 ">
                      {index + 1}.
                    </Text>
                    <Text className="w-[16%]  p-2  text-left">{item.name}</Text>
                    <Text className="w-[19%] p-2 text-left">{item.status}</Text>
                    <Text className="w-[27%] p-2 text-left">
                      {item.date.split("T")[0]}
                    </Text>
                    <Text className="w-[27%] p-2 text-left">
                      {item.expire_date.split("T")[0]}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
