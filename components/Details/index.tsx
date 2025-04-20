import { useBalanceStore } from "@/store/useBalanceStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, View } from "react-native";

const Index = () => {
  const balance = useBalanceStore((state) => state.balance);
  const loadBalanceFromStorage = useBalanceStore(
    (state) => state.loadBalanceFromStorage
  );
  const [ratePerLitre, setRatePerLitre] = React.useState<number>(80);
  const days = Math.floor(balance / ratePerLitre);
  const remainder = balance % ratePerLitre;

  React.useEffect(() => {
    const loadData = async () => {
      await loadBalanceFromStorage();
      const storedRate = await AsyncStorage.getItem("ratePerLitre");
      if (storedRate !== null) {
        setRatePerLitre(Number(storedRate));
      } else {
        await AsyncStorage.setItem("ratePerLitre", "80");
      }
    };

    loadData();
  }, []);
  // React.useEffect(() => {
  //   const loadRate = async () => {
  //     try {
  //       const storedRate = await AsyncStorage.getItem("ratePerLitre");
  //       if (storedRate !== null) {
  //         setRatePerLitre(Number(storedRate));
  //       } else {
  //         await AsyncStorage.setItem("ratePerLitre", "80");
  //       }

  //       // Load Balance
  //       const storedBalance = await AsyncStorage.getItem("balance");
  //       if (storedBalance !== null) {
  //         // setBalance(Number(storedBalance));
  //       } else {
  //         await AsyncStorage.setItem("balance", "0"); // default
  //       }
  //     } catch (error) {
  //       console.error("Failed to load rate per litre", error);
  //     }
  //   };

  //   loadRate();
  // }, [balance]);
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f7f7f7" }}>
      <View
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 12,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 8,
        }}
      >
        {/* <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
          Dashboard
        </Text> */}

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {/* Milk Days Left */}
          <View
            style={{
              width: "48%",
              backgroundColor: "#e3f2fd",
              borderRadius: 10,
              padding: 15,
              marginBottom: 15,
            }}
          >
            <Text style={{ fontSize: 14, color: "#555" }}>Milk Days Left</Text>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "#1565c0" }}
            >
              {days} Days
            </Text>
          </View>

          {/* Rate Per Litre */}
          <View
            style={{
              width: "48%",
              backgroundColor: "#fff3e0",
              borderRadius: 10,
              padding: 15,
              marginBottom: 15,
            }}
          >
            <Text style={{ fontSize: 14, color: "#555" }}>Rate per Litre</Text>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "#ef6c00" }}
            >
              ₹{ratePerLitre}
            </Text>
          </View>

          {/* Current Balance */}
          <View
            style={{
              flex: 1,
              // width: "48%",
              backgroundColor: "#e8f5e9",
              borderRadius: 10,
              padding: 15,
              // marginBottom: 15,
            }}
          >
            <Text style={{ fontSize: 14, color: "#555" }}>Current Balance</Text>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "#2e7d32" }}
            >
              ₹{balance - remainder} + ₹{remainder}
            </Text>
          </View>
          {/* Remaining Balance */}
          {/* <View
            style={{
              width: "48%",
              backgroundColor: "#fce4ec",
              borderRadius: 10,
              padding: 15,
              marginBottom: 15,
            }}
          >
            <Text style={{ fontSize: 14, color: "#555" }}>Remaining ₹</Text>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "#ad1457" }}
            >
              ₹{remainder}
            </Text>
          </View> */}
        </View>
      </View>
    </View>
  );
};

export default Index;
