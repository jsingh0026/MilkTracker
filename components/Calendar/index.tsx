import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBalanceStore } from "@/store/useBalanceStore";

export default function Index() {
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("calendar");
      if (stored) setMarkedDates(JSON.parse(stored));
    })();
  }, []);

  // const onDayPress = async (day: { dateString: string }) => {
  //   const date = day.dateString;

  //   const updatedMarks = {
  //     ...markedDates,
  //     [date]:
  //       markedDates[date]?.status === "NAGA"
  //         ? {
  //             selected: true,
  //             marked: true,
  //             dotColor: "green",
  //             status: "Milk Received",
  //           }
  //         : { selected: true, marked: true, dotColor: "red", status: "NAGA" },
  //   };

  //   setMarkedDates(updatedMarks);
  //   await AsyncStorage.setItem("calendar", JSON.stringify(updatedMarks));
  // };
  const balance = useBalanceStore((state) => state.balance);
  const [ratePerLitre, setRatePerLitre] = React.useState<number>(80);
  const setBalance = useBalanceStore((state) => state.setBalance);
  React.useEffect(() => {
    const loadData = async () => {
      const storedRate = await AsyncStorage.getItem("ratePerLitre");
      if (storedRate !== null) {
        setRatePerLitre(Number(storedRate));
      } else {
        await AsyncStorage.setItem("ratePerLitre", "80");
      }
    };

    loadData();
  }, []);
  const onDayPress = async (day: { dateString: string }) => {
    const date = day.dateString;
    const currentStatus = markedDates[date]?.status;
    const updatedMarks = { ...markedDates };

    let updatedBalance = balance;

    if (!currentStatus) {
      // First tap → Milk Received (green)
      updatedMarks[date] = {
        selected: true,
        marked: true,
        dotColor: "green",
        status: "Milk Received",
      };
      updatedBalance -= ratePerLitre; // Deduct ratePerLitre from balance
    } else if (currentStatus === "Milk Received") {
      // Second tap → NAGA (red)
      updatedMarks[date] = {
        selected: true,
        marked: true,
        dotColor: "red",
        status: "NAGA",
      };
      updatedBalance += ratePerLitre; // Revert balance since milk wasn't received
    } else if (currentStatus === "NAGA") {
      // Third tap → Unselected (remove mark)
      delete updatedMarks[date];
    }

    setMarkedDates(updatedMarks);
    setBalance(updatedBalance); // Update Zustand balance state
    await AsyncStorage.setItem("calendar", JSON.stringify(updatedMarks));
    await AsyncStorage.setItem("balance", updatedBalance.toString());
  };
  // const onDayPress = async (day: { dateString: string }) => {
  //   const date = day.dateString;
  //   const currentStatus = markedDates[date]?.status;

  //   let updatedMarks = { ...markedDates };

  //   if (!currentStatus) {
  //     // First tap → Milk Received (green)
  //     updatedMarks[date] = {
  //       selected: true,
  //       marked: true,
  //       dotColor: "green",
  //       status: "Milk Received",
  //     };
  //   } else if (currentStatus === "Milk Received") {
  //     // Second tap → NAGA (red)
  //     updatedMarks[date] = {
  //       selected: true,
  //       marked: true,
  //       dotColor: "red",
  //       status: "NAGA",
  //     };
  //   } else if (currentStatus === "NAGA") {
  //     // Third tap → unselected (remove mark)
  //     delete updatedMarks[date];
  //   }

  //   setMarkedDates(updatedMarks);
  //   await AsyncStorage.setItem("calendar", JSON.stringify(updatedMarks));
  // };
  return (
    // <View style={styles.container}>
    <Calendar
      markedDates={markedDates}
      onDayPress={onDayPress}
      // markingType="custom"
      theme={{
        selectedDayBackgroundColor: "#6200ee",
        dotColor: "#ffffff",
        todayTextColor: "#6200ee",
      }}
    />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
