import React, { useState } from "react";
import { Alert, Linking, TextInput } from "react-native";
import { Modal, Text, View } from "react-native";
import {
  UpdateLikeCommentTask,
  UpdateVideoTask,
} from "../../controller/UserController";

export default function VideoTaskPop({
  visible,
  onClose,
  data,
  childTaskRefresh,
}) {
  const [userName, setUserName] = useState();
  const [formError, setFormError] = useState(false);
  const[submitting, setSubmitting] = useState(false)

  const handleLike = async () => {
    setSubmitting(true)
    if (!userName) {
      setFormError(true);
      setSubmitting(false)
      return;
    }
    try {
      const response = await UpdateVideoTask(userName, data.id);
      if (response.status === true) {
        childTaskRefresh();
        setSubmitting(false)
        onClose()
      }
    } catch (error) {
      setFormError(error.response.data.message)
      setSubmitting(false)
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
              placeholder="url"
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
              {submitting ? "Processing..." : "Submit"}
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
