import React, { useState } from "react";
import { Alert, TextInput } from "react-native";
import { Modal, Text, View } from "react-native";
import { UpdateLikeCommentTask } from "../../controller/UserController";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { Linking } from "react-native";

export default function CommentTaskPopup({ visible, onClose, data, childTaskRefresh }) {
  const [userName, setUserName] = useState();
  const [formError, setFormError] = useState(false);
  const [isCopied, setCopied] = useState(false);

  const handleLike = async () => {
    if (!userName || !isCopied) {
      setFormError(true);
      return;
    }
    try {
      const response = await UpdateLikeCommentTask(userName, data.id);
      if (response.status === true) {
        onClose();
        setUserName("");
        setCopied(false);
        childTaskRefresh()
        Linking.openURL(data.task_url);
      } else {
        Alert.alert(
          "Error",
          "You have not done task",
          [
            {
              text: "OK",
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Server error.",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: false }
      );
    }
  };

  const copyToClipboard = () => {
    const textToCopy =
      data && data.comment_details !== null
        ? data.comment_details
        : "Hyy there !";
    Clipboard.setString(textToCopy);
    setCopied(true);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        className="flex-1 justify-end align-top  bg-opacity-50"
        style={{ backgroundColor: "#00000082" }}
      >
        <View className="bg-white p-4 rounded w-full h-[60vh] text-center">
          <Text className="text-center text-lg ">
            Please Enter {data && data.platform} username
          </Text>
          <View className="w-full flex flex-row items-center justify-center">
            <MaterialCommunityIcons name="arrow-down" color="blue" size={20} />
          </View>
          <Text className="text-center text-lg ">Copy Comment</Text>
          <View className="w-full flex flex-row items-center justify-center">
            <MaterialCommunityIcons name="arrow-down" color="blue" size={20} />
          </View>
          <Text className="text-center text-lg ">
            Write copied comment on post.
          </Text>
          <Text className="text-center mt-4 mb-2"> {formError} </Text>
          <View className="w-full flex flex-col items-center justify-center">
            <TextInput
              placeholder="@username"
              className={`w-3/4    py-2 pl-4 rounded-full text-gray-800 font-semibold  mb-4 ${
                formError
                  ? "border-2 border-gray-800"
                  : "border-2 border-gray-400"
              } `}
              value={userName}
              onChangeText={setUserName}
            />
            <TouchableOpacity
              onPress={copyToClipboard}
              className="bg-gray-300 w-3/4 text-center py-2 rounded-full font-bold"
            >
              <Text className="text-center">
                {" "}
                {isCopied ? "Copied" : "Copy Comment"}{" "}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="w-full flex flex-row items-center justify-center">
            <Text
              onPress={handleLike}
              className="text-center my-4 py-2.5 bg-gray-200 rounded-full w-3/4 text-white text-lg font-semibold"
              style={{ backgroundColor: "#ff6e05" }}
            >
              Do task
            </Text>
          </View>
          <Text
            className="text-center mt-6"
            onPress={() => {
              onClose();
              setUserName("");
              setCopied(false);
            }}
          >
            close
          </Text>
        </View>
      </View>
    </Modal>
  );
}
