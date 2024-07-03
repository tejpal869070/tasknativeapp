import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { GetUserPaymentHistory } from "../../controller/UserController";
import Loader from "../../componentes/Loader";

export default function History() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const GetHistory = async () => {
    try {
      const response = await GetUserPaymentHistory();
      if (response.status === 200) {
        setData(response.data.data);
        setLoading(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    GetHistory();
  }, []);
  return (
    <View>
      <View className="table-auto mt-4 px-4  h-[60vh] ">
        <View className="bg-gray-400 flex flex-row fixed ">
          <Text className="w-[15%] font-bold p-2 ">No.</Text>
          <Text className="w-1/4   font-bold p-2 ">Amount</Text>
          <Text className="w-1/3   font-bold p-2 ">Type</Text>
          <Text className="w-1/3   font-bold p-2 ">Status</Text>
        </View>
        {loading ? (<Loader/>) : (
          <ScrollView>
            {data &&
              data.reverse().map((item, index) => (
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
              ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}
