import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Text, View } from "react-native";
import { GetWinningWalletHistory } from "../../controller/UserController";

export default function WinningHistory() {
  const [winningData, setWinningData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWinnigHistory = async () => {
      try {
        const fetchedData = await GetWinningWalletHistory();
        setWinningData(fetchedData.data.reverse());
        setLoading(false);
      } catch (error) {
        return <div>Loading...</div>;
      }
    };

    getWinnigHistory();
  }, []);
  return (
    <ScrollView>
      <View className="table-auto mt-4 px-4  ">
        <View className="bg-gray-400 flex flex-row fixed ">
          <Text className="w-[15%] font-bold p-2 ">No.</Text>
          <Text className="w-1/4   font-bold p-2 ">Amount</Text>
          <Text className="w-1/3   font-bold p-2 ">Type</Text>
          <Text className="w-1/3   font-bold p-2 ">Status</Text>
        </View>
        {loading ? (
          Array.from({ length: 50 }).map((_, index) => (
            <View
              key={index}
              className={`flex flex-row  ${
                (index + 2) % 2 === 0 ? "bg-gray-200" : "bg-white"
              }`}
            >
              <Text className="h-8 w-[15%] p-2"></Text>
              <Text className="h-8 w-1/4 p-2 text-left"></Text>
              <Text className="h-8 w-1/3 p-2 text-left"></Text>
              <Text className="h-8 w-1/3 p-2 text-left"></Text>
            </View>
          ))
        ) : (
          <ScrollView>
            {winningData &&
              winningData.reverse().map((item, index) => (
                <View
                  className={`flex flex-row ${
                    (index + 3) % 2 === 0 ? "bg-gray-200" : "bg-white"
                  }`}
                  key={index}
                >
                  <Text className="w-[15%] p-2 ">{index + 1}.</Text>
                  <Text className="w-1/4  p-2  text-left">{item.amount}</Text>
                  <Text className="w-1/3 p-2 text-left">
                    {item.type}
                  </Text>
                  <Text className="w-1/3 p-2 text-left">{(item.date).split('T')[0]} </Text>
                </View>
              ))}
          </ScrollView>
        )}
      </View>
    </ScrollView>
  );
}
