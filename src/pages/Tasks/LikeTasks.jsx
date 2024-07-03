import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { GetLikeTasks } from "../../controller/UserController";
import { ScrollView } from "react-native";
import LikeTaskPopup from "./LikeTaskPopup.jsx";

export default function LikeTasks() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const[singleLikeData,setSingleLikeData] = useState()

  const [likeVisible, setLikeVisible] = useState(false);

  const openLikePopUp = (item) => {
    setLikeVisible(!likeVisible);
    setSingleLikeData(item)
  };

  const childTaskRefresh=()=>{
    TaskData()
  }


  const TaskData = async () => {
    const response = await GetLikeTasks();
    if (response.status === 200) {
      setData(response.data.data);
      setLoading(false);
    } else if (!response) {
      setData([]);
      setLoading(false);
    } else {
      setData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    TaskData();
  }, []);

  return (
    <ScrollView>
      <View className="px-4 ">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <View
                key={index}
                className="bg-gray-300 h-12 w-full mt-2 rounded-full flex flex-row items-center justify-around"
              />
            ))
          : data &&
            data.map((item, index) => (
              <View
                key={index}
                className="bg-gray-300 h-12 w-full mt-2 rounded-full flex flex-row items-center justify-around"
              >
                {item.platform === "Instagram" ? (
                  <MaterialCommunityIcons
                    name="instagram"
                    color="red"
                    size={30}
                  />
                ) : item.platform === "Facebook" ? (
                  <MaterialCommunityIcons
                    name="facebook"
                    color="blue"
                    size={30}
                  />
                ) : (
                  ""
                )}
                <Text className="font-bold text-lg"> {item.status} </Text>
                <Text
                  className="font-bold text-lg"
                  style={{ color: "#008000" }}
                >
                  +₹0.4
                </Text>
                {item.status === "Completed" ? (
                  <MaterialCommunityIcons
                    name="compass"
                    color="green"
                    size={25}
                  />
                ) : item.status === "Pending" ? (
                  <MaterialCommunityIcons
                    name="arrow-right"
                    color="red"
                    size={25}
                    onPress={()=>openLikePopUp(item)}
                  />
                ) : item.status === "Canceled" ? (
                  <MaterialCommunityIcons
                    name="block-helper"
                    color="red"
                    size={25}
                  />
                ) : item.status === "Verifying" ? (
                  <MaterialCommunityIcons
                    name="timer-sand-complete"
                    color="blue"
                    size={25}
                  />
                ) : (
                  ""
                )}
              </View>
            ))}
      </View>

      <LikeTaskPopup
        visible={likeVisible} 
        onClose={openLikePopUp}
        data={singleLikeData}
        childTaskRefresh={childTaskRefresh}
      />
    </ScrollView>
  );
}
