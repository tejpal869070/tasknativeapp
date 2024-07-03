import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import LikeTasks from "./LikeTasks";
import CommentTask from "./CommentTask";
import VideoTask from "./VideoTask";
import WinningHistory from "./WinningHistory";

export default function MyTask({ navigation }) {
  const [activeTab, setActiveTab] = useState("Like");

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Like":
        return <LikeTasks />;
      case "Comment":
        return <CommentTask />;
      case "Video":
        return <VideoTask />;
      case "WinningHistory" :
        return <WinningHistory/>
      default:
        return null;
    }
  };
  return (
    <View className="mt-8">
      <Image
        source={require("../../../assets/header.png")}
        className="w-full h-[270px] m-auto"
      />
      <View className="w-full flex flex-row justify-around items-center align-center h-28 m-auto    ">
        <TouchableOpacity
          className="flex justify-center text-center items-center  p-5 pt-7 rounded-lg"
          onPress={() => handleTabPress("Like")}
        >
          <Image
            source={require("../../../assets/like.png")}
            className="w-[42px] h-[34px]"
          />
          <Text className="text-black mt-2">Like</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex justify-center text-center items-center  p-2.5 rounded-lg"
          onPress={() => handleTabPress("Comment")}
        >
          <Image
            source={require("../../../assets/comment.png")}
            className="w-14 h-14"
          />
          <Text className="text-black">Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex justify-center text-center items-center  p-4 rounded-lg"
          onPress={() => handleTabPress("Video")}
        >
          <Image
            source={require("../../../assets/videoicon.png")}
            className="w-12 h-12"
          />
          <Text className="text-black">Video</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity  onPress={() => handleTabPress("WinningHistory")} className="text-right mt-[-10px] pr-2 border-b-2 bg-gray-200">
        <Text className="text-right" >Winning History</Text>
      </TouchableOpacity>

      {renderTabContent()}
    </View>
  );
}
