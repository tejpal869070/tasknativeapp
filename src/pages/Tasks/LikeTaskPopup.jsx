import React, { useState } from "react";
import { Alert, Linking, TextInput } from "react-native";
import { Modal, Text, View } from "react-native";
import { UpdateLikeCommentTask } from "../../controller/UserController";

export default function LikeTaskPopup({ visible, onClose, data, childTaskRefresh }) {
  const [userName, setUserName] = useState();
  const [formError, setFormError] = useState(false);

  const handleLike = async () => {
    if (!userName) {
      setFormError(true);
      return;
    }
    try {
      const response = await UpdateLikeCommentTask(userName, data.id);
      if (response.status === true) {
        onClose();
        setUserName("");
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
          <Text className="text-center mt-6 mb-2"> {formError} </Text>
          <View className="w-full flex flex-row items-center justify-center">
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
            className="text-center mt-16"
            onPress={() => {
              onClose();
              setUserName("");
              setFormError(false);
            }}
          >
            close
          </Text>
        </View>
      </View>
    </Modal>
  );
}
