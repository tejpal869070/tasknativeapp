import React, { useState } from "react";
import { Alert, Modal, Text, TextInput, View } from "react-native";
import { ChangeUserPassword } from "../../controller/UserController";

export default function ChangePassword({ visible, onClose }) {
  const [isChanging, setChanging] = useState(false);
  const [formError, setFormError] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [reNewPassword, setReNewPassword] = useState();

  const handleChangePassword = async () => {
    setChanging(true)
    if (!oldPassword && !newPassword) {
      setFormError("Please enter all fields");
      setChanging(false)
      return;
    } else if (newPassword !== reNewPassword) {
      setFormError("New password doesn't match.");
      setChanging(false)
      return;
    }

    const formData = {
      password: oldPassword,
      new_password: newPassword,
    };

    const response = await ChangeUserPassword(formData);
    if(response.error===false){
        setChanging(false)
        Alert.alert(
            "Success",
            "Password changed successfully.",
            [
              {
                text: "OK",
                onPress: () => onClose(),
              },
            ],
            { cancelable: false }
          );
    } else{
        setChanging(false)
        setFormError("Old Password is wrong !")
    }
    setChanging(false)
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end align-top bg-black bg-opacity-50">
        <View className="bg-white p-4 flex flex-col items-center justify-center rounded w-full h-[60vh] text-center">
          <Text className="text-center mb-4"> {formError} </Text>
          <TextInput
            className="w-3/4  bg-[red] border-2 py-2 border-gray-500 pl-4 rounded-full text-gray-800 font-semibold mb-6"
            placeholder="Old Password"
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TextInput
            className="w-3/4  bg-[red] border-2 py-2 border-gray-500 pl-4 rounded-full text-gray-800 font-semibold mb-6"
            placeholder="Re Enter new Password"
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            className="w-3/4  bg-[red] border-2 py-2 border-gray-500 pl-4 rounded-full text-gray-800 font-semibold mb-6"
            placeholder="Re Enter new Password"
            value={reNewPassword}
            onChangeText={setReNewPassword}
          />
          <Text
            className="w-3/4  font-bold text-lg  text-white text-center py-3 rounded-full "
            style={{ backgroundColor: "#ff6e05" }}
            onPress={handleChangePassword}
          >
            {isChanging ? "Changing..." : "Change"}
          </Text>
          <Text className="mt-4" onPress={onClose}>
            Close
          </Text>
        </View>
      </View>
    </Modal>
  );
}
