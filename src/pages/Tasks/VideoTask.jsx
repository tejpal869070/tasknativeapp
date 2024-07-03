import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  GetCommentTasks,
  GetLikeTasks,
  GetVideoTasks,
} from "../../controller/UserController";
import { ScrollView } from "react-native";
import { Linking } from "react-native";
import VideoTaskPop from "./VideoTaskPop";

export default function VideoTask() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);


  const [singleLikeData, setSingleLikeData] = useState();

  const [likeVisible, setLikeVisible] = useState(false);

  const openLikePopUp = (item) => {
    setLikeVisible(!likeVisible);
    setSingleLikeData(item);
  };

  const TaskData = async () => {
    const response = await GetVideoTasks();
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

  const childTaskRefresh=()=>{
    TaskData()
  }

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
                ) : item.platform === "Linkdin" ? (
                  <MaterialCommunityIcons
                    name="linkedin"
                    color="blue"
                    size={30}
                  />
                ) : (
                  ""
                )}
                <Text className="font-bold text-lg"> {item.status} </Text>
                <Text className="font-bold text-lg">
                  {" "}
                  <MaterialCommunityIcons
                    name="download"
                    color="black"
                    size={20}
                    onPress={() => Linking.openURL(item.url)}
                  />{" "}
                </Text>
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
                    onPress={() => openLikePopUp(item)}
                  />
                ) : item.status === "Canceled" ? (
                  <MaterialCommunityIcons
                    name="block-helper"
                    color="red"
                    size={25}
                    onPress={() => openLikePopUp(item)}
                  />
                ) : item.status === "Verifying" ? (
                  <MaterialCommunityIcons
                    name="timer-sand-complete"
                    color="blue"
                    size={25}
                    onPress={() => openLikePopUp(item)}
                  />
                ) : (
                  ""
                )}
              </View>
            ))}
      </View>
      <VideoTaskPop
        visible={likeVisible}
        onClose={openLikePopUp}
        data={singleLikeData}
        childTaskRefresh={childTaskRefresh}
      />
    </ScrollView>
  );
}
