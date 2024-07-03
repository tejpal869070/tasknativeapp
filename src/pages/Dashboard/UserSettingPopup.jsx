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
import { UpdateUserDetail } from "../../controller/UserController";

export default function UserSettingPopup({
  visible,
  onClose,
  userData,
  childRefresh1,
}) {
  const [updating, setUpdating] = useState(false);

  const [uname, setUname] = useState(userData.uname);
  const [email, setEmail] = useState(userData.email);
  const [upi_id, setUpi] = useState(userData.upi_id);
  const [bank_name, setBankName] = useState(userData.bank_name);
  const [ifsc_code, setIfsc] = useState(userData.ifsc_code);
  const [ac_no, setAccNo] = useState(userData.ac_no);
  const [ac_name, setAccname] = useState(userData.ac_name);

  const UpdateUserAccount = async () => {
    setUpdating(true);
    const formData = {
      uname: uname,
      email: email,
      upi_id: "",
      bank_name: bank_name,
      ac_no: ac_no,
      ac_name: ac_name,
      ifsc_code: ifsc_code,
    };
    const response = await UpdateUserDetail(formData);
    if (response) {
      if (response.status === true) {
        setUpdating(false);
        onClose();
        childRefresh1();
        return;
      } else{
        setUpdating(false);
        return;
      }
    }
    setUpdating(false);
    Alert.alert(
      "Error",
      "This email already in used.",
      [
        {
          text: "OK",
          onPress: () => onClose(),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end  align-top bg-black bg-opacity-50 mt-4">
        <ScrollView>
          <View className="bg-white flex flex-col items-center justify-center p-4 rounded w-full h-screen text-center">
            <Text className="text-center text-2xl font-bold mb-4">
              Edit Your Account
            </Text>
            <TextInput
              placeholder="Email"
              className="w-[80%] bg-[red] py-2 border-2 pl-2 rounded-lg text-black mb-3 "
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="User Name"
              className="w-[80%] bg-[red] py-2 border-2 pl-2 rounded-lg text-black mb-3 "
              value={uname}
              onChangeText={setUname}
            />
            <TextInput
              placeholder="Account Holder"
              className="w-[80%] bg-[red] py-2 border-2 pl-2 rounded-lg text-black mb-3 "
              value={ac_name}
              onChangeText={setAccname}
            />
            <TextInput
              placeholder="Bank Name"
              className="w-[80%] bg-[red] py-2 border-2 pl-2 rounded-lg text-black mb-3 "
              value={bank_name}
              onChangeText={setBankName}
            />
            <TextInput
              placeholder="Account No."
              className="w-[80%] bg-[red] py-2 border-2 pl-2 rounded-lg text-black mb-3 "
              value={ac_no}
              onChangeText={setAccNo}
            />
            <TextInput
              placeholder="IFSC Code"
              className="w-[80%] bg-[red] py-2 border-2 pl-2 rounded-lg text-black mb-3 "
              value={ifsc_code}
              onChangeText={setIfsc}
            />
            <Text
              onPress={UpdateUserAccount}
              className="text-center bg-black text-white py-3 rounded-lg w-1/2 mb-2 "
              style={{ backgroundColor: "green" }}
            >
              {updating ? "Updating..." : "Update"}
            </Text>
            <Text
              onPress={onClose}
              className="text-center bg-black text-white py-3 rounded-lg w-1/2 "
            >
              Close
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
