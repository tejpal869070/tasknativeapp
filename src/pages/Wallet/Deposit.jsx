import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Alert,
} from "react-native";
import {
  DepositRequest,
  GetDepositMethod,
} from "../../controller/UserController";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native";

export default function Deposit() {
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [formError, setFormError] = useState("");
  const [depositing, setDepositing] = useState(false);
  const [data, setData] = useState();

  const [amount, setAmount] = useState();
  const [transection_id, setTransectionid] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    amount: "",
    transection_id: "",
    id: 1,
  });

  const handleChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const DepositMethod = async () => {
    try {
      const response = await GetDepositMethod();
      if (response.status === 200) {
        setData(response.data.data[0]);
        setLoading(false);
      } else {
        console.log("went wrong");
      }
    } catch (error) {
      setPageError("error");
    }
  };

  const handleDeposit = async () => {
    setDepositing(true);
    if (formData.amount < 100) {
      setFormError("Minimum amount is 100");
      setDepositing(false);
      return;
    } else if (formData.transection_id < 10345) {
      setFormError("Please enter vaild transection id");
      setDepositing(false);
      return;
    } else if (!selectedImage) {
      setFormError("Please select payment screenshot");
      setDepositing(false);
      return;
    }
    setFormError("");
    try {
      const response = await DepositRequest(formData, selectedImage);
      if (response.data.status === true) {
        setDepositing(false);
        setSelectedImage(null);
        setFormData({
          amount: "",
          transection_id: "",
        });
        Alert.alert(
          "Success",
          "Deposit request sent successfully",
          [
            {
              text: "OK",
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      setDepositing(false);
      Alert.alert(
        "Error",
        "Server error. Please try again.",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: false }
      );
    }
  };

  useEffect(() => {
    DepositMethod();
  }, []);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImage(result.assets[0]);
      }
    } catch (error) {
      console.log("Error selecting image:", error);
    }
  };

  return (
    <View className="flex bg-gray-100  rounded-lg flex-col justify-center items-center text-center align-center w-[90%] pt-6 m-auto">
      <Text className="font-bold text-xl ">Scan QR Code or pay on UPI id</Text>
      {loading ? (
        <Text className="w-40 h-40 m-auto mt-4"></Text>
      ) : (
        <View className="">
          <Image
            source={{ uri: data.qr_code }}
            className="w-40 h-40 m-auto mt-4"
          />
          <Text className="text-center mt-2 text-lg font-semibold">
            UPI: {data.upi_id}
          </Text>
        </View>
      )}

      <View
        className="w-[100%] flex   py-4 m-auto  mt-6 rounded-lg "
        style={{ backgroundColor: "#73d8ff" }}
      >
        <Text className="text-white text-center  text-xl font-bold">
          Complete your deposit
        </Text>
        <Text className="text-center mt-1 mb-1"> {formError} </Text>
        <View className="px-4">
          <TextInput
            className="bg-gray-50 border  mt-4 pl-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block   py-0.5"
            placeholder="Transection id"
            required=""
            value={formData.transection_id}
            onChangeText={(text) => handleChange("transection_id", text)}
          />

          <View className="w-full  flex flex-row items-center justify-between align-center  ">
            <TextInput
              className="bg-gray-50 border  mt-4 pl-2 w-[48%] border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block   py-0.5"
              placeholder="Amount"
              required=""
              value={formData.amount}
              onChangeText={(text) => handleChange("amount", text)}
            />

            <Text
              className="w-[48%] text-center mt-4  bg-gray-200  py-2 rounded-lg"
              onPress={selectImage}
            >
              Select Image
            </Text>
          </View>
          {selectedImage && (
            <Text className="text-right text-xs mt-1" > {selectedImage.fileName} </Text>
          )}
          <TouchableOpacity onPress={handleDeposit}>
            <Text
              className="text-center py-2 mt-2 rounded-lg font-semibold"
              style={{ backgroundColor: "#00bf63" }}
            >
              {depositing ? "Processing..." : "Submit"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
