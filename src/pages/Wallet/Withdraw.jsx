import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CancelWithdrawalRequest,
  GetUserDetails,
  GetUserPaymentHistory,
  WithdrawRequest,
} from "../../controller/UserController";

export default function Withdraw({ withdrawChildFunction1 }) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [amount, setAmount] = useState("0");
  const [formError, setFormError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [data, setData] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [singleWithdrawHistory, setSingleWithHistory] = useState();
  const [cancelling, setCancelling] = useState(false);

  const[isBankUpdated, setBankUpdated] = useState(false)

  const checkBank =async()=>{
    if(userData&&userData.ifsc_code===null){
      setBankUpdated(true)
    }
  }


  const GetUserData = async () => {
    try {
      const response = await GetUserDetails();
      if (response.status === 200) {
        setUserData(response.data.data[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleWithdrawal = async () => {
    setProcessing(true);
    if (amount === undefined || amount < 100) {
      setProcessing(false);
      return;
    } else if (amount > (userData && userData.winning_balance * 60) / 100) {
      setProcessing(false);
      return;
    } else if(userData&&userData.ifsc_code===null || userData.ac_name===null || userData.ac_no===null || userData.bank_name===null){
      alert("Please update your bank account.")
      setProcessing(false);
      return
    }
    try {
      const response = await WithdrawRequest(amount);
      if (response.status === 200) {
        toggleModal();
        setProcessing(false);
        withdrawChildFunction1();
      }
    } catch (error) {
      setFormError("Something went wrong");
      setProcessing(false);
    }
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const toggleModal2 = (item) => {
    setIsVisible2(!isVisible2);
    setSingleWithHistory(item);
  };

  const GetHistory = async () => {
    try {
      const response = await GetUserPaymentHistory();
      if (response.status === 200) {
        setData(response.data.data);
        setHistoryLoading(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    GetHistory();
    checkBank()
  }, []);

  useEffect(() => {
    GetUserData();
  }, []);

  const handleWithdrawalCancel = async (data) => {
    setCancelling(true);
    try {
      const response = await CancelWithdrawalRequest(data);
      if (response.status === 200) {
        setCancelling(false);
        withdrawChildFunction1();
        GetHistory();
        toggleModal2(null);
      } else {
        setCancelling(false);
        toggleModal2(null);
      }
    } catch (error) {
      console.log(error);
      setCancelling(false);
      toggleModal2(null);
    }
  };

  const Popup1 = ({ visible, data, onClose }) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View className="flex-1 justify-end align-top bg-black bg-opacity-50">
          <View className="bg-white p-4 rounded w-full h-[60vh] text-center">
            <View className="mt-16 mb-6">
              <Image
                source={require("../../../assets/question.jpg")}
                className="w-20 h-20 m-auto"
              />
            </View>
            <Text className="text-2xl  font-semibold mb-2 text-center">
              Are you sure to cancel withdrawal request of
            </Text>
            <Text className="text-2xl font-bold mb-2 text-center">
              Rs.{data && data.amount}
            </Text>

            <View className="flex flex-col mt-6">
              <Text
                onPress={() => handleWithdrawalCancel(data)}
                className=" w-1/2 m-auto mb-4 opacity-100 text-white   text-lg text-center font-bold rounded-lg py-2"
                style={{ backgroundColor: "#00bf63" }}
              >
                {cancelling ? "Processing..." : "Yes"}
              </Text>
              <TouchableOpacity
                onPress={toggleModal2}
                className="mt-4 w-1/2 m-auto"
              >
                <Text
                  className="text-white  text-lg text-center font-bold rounded-lg py-2"
                  style={{ backgroundColor: "#bb0506" }}
                >
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View className="flex bg-gray-100  rounded-lg flex-col  w-[90%] pt-6 m-auto">
      <Text className="font-bold text-2xl ml-1">Withdraw Your Earnings</Text>

      <View className="mt-4 pl-1">
        <Text className="mb-1 text-[16px] font-semibold">
          Account Holder: {userData && userData.ac_name}
        </Text>
        <Text className="mb-1 text-[16px] font-semibold">
          Bank: {userData && userData.bank_name}
        </Text>
        <Text className="mb-1 text-[16px] font-semibold">
          Account No.: {userData && userData.ac_no}
        </Text>
        <Text className="mb-1 text-[16px] font-semibold">
          IFSC Code: {userData && userData.ifsc_code}
        </Text>
      </View>

      <View
        className="w-[100%] flex   py-4 m-auto  mt-6 rounded-lg "
        style={{ backgroundColor: "#ff5757" }}
      >
        <Text className="text-white ml-5 mb-2 text-xl font-bold">
          Enter Amount
        </Text>
        <Text className="text-white ml-5 mb-1">Min : Rs.100/- </Text>
        <Text className="text-white ml-5">
        Withdrawable  : Rs.{userData && ((userData.winning_balance * 60) / 100).toFixed(2)}/-
        </Text>
        <View className="px-4">
          <TextInput
            className="bg-gray-50 border  mt-4 pl-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block   py-0.5"
            placeholder="Rs.2500/-"
            required=""
            value={amount}
            onChangeText={setAmount}
          />

          <TouchableOpacity onPress={handleWithdrawal}>
            <Text
              className="text-center  py-2 mt-4 rounded-lg font-bold text-white"
              style={{ backgroundColor: "#0e88c4" }}
            >
              {processing ? "Processing..." : "Withdraw"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={toggleModal}
      >
        <View className="flex-1 justify-end align-top bg-black bg-opacity-50">
          <View className="bg-white p-4 rounded w-full h-[70vh] text-center">
            <View className="mt-16 mb-6">
              <Image
                source={require("../../../assets/right.png")}
                className="w-20 h-20 m-auto"
              />
            </View>
            <Text className="text-2xl  font-semibold mb-2 text-center">
              Withdrawal request of
            </Text>
            <Text className="text-2xl font-semibold mb-2 text-center">
              Rs.{amount}
            </Text>
            <Text className="text-2xl font-semibold mb-2 text-center">
              is in process.
            </Text>
            <TouchableOpacity
              onPress={toggleModal}
              className="mt-4 w-1/2 m-auto"
            >
              <Text
                className="text-white  text-lg text-center font-bold rounded-lg py-2"
                style={{ backgroundColor: "#00bf63" }}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text className="py-4 text-center font-bold text-xl">
        You can cancel your pending withdrawals
      </Text>
      <View className="table-auto mt-4   ">
        <View className="bg-gray-400 flex flex-row fixed ">
          <Text className="w-[15%] font-bold p-2 ">No.</Text>
          <Text className="w-1/4   font-bold p-2 ">Amount</Text>
          <Text className="w-1/3   font-bold p-2 ">Type</Text>
          <Text className="w-1/3   font-bold p-2 ">Status</Text>
        </View>

        <ScrollView className="">
          {data &&
            data
              .filter(
                (item) =>
                  item.payment_type === "Withdrawal" &&
                  item.status === "Pending"
              )
              .reverse()
              .map((item, index) => (
                <TouchableOpacity
                  onPress={() => toggleModal2(item)}
                  key={index}
                >
                  <View
                    className={`flex flex-row ${
                      (index + 3) % 2 === 0 ? "bg-gray-200" : "bg-white"
                    }`}
                    key={index}
                  >
                    <Text className="w-[15%] p-2 ">{index + 1}.</Text>
                    <Text className="w-1/4  p-2  text-left">{item.amount}</Text>
                    <Text className="w-1/3 p-2 text-left">
                      {item.payment_type}{" "}
                    </Text>
                    <Text className="w-1/3 p-2 text-left">{item.status} </Text>
                  </View>
                </TouchableOpacity>
              ))}
        </ScrollView>
      </View>
      <Popup1
        visible={isVisible2}
        data={singleWithdrawHistory}
        onClose={toggleModal2}
      />
    </View>
  );
}
