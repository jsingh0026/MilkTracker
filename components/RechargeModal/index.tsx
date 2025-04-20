// components/RechargeModal.tsx
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  // TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, TextInput } from "react-native-paper";
import { useBalanceStore } from "@/store/useBalanceStore";

const RechargeModal = ({}: any) => {
  const [amount, setAmount] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const setBalance = useBalanceStore((state) => state.setBalance);

  const onClose = () => setModalVisible(false);

  const handleRecharge = async () => {
    const newAmount = parseInt(amount);
    if (!isNaN(newAmount)) {
      const storedBalance = await AsyncStorage.getItem("balance");
      const currentBalance = parseInt(storedBalance || "0");
      const updatedBalance = currentBalance + newAmount;
      await AsyncStorage.setItem("balance", updatedBalance.toString());
      setBalance(updatedBalance);
      setAmount("");
    }
    onClose();
  };

  const handleChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    setAmount(numericText);
  };

  return (
    <>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 5,
              width: "85%",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                marginBottom: 15,
                fontWeight: "600",
              }}
            >
              Recharge Balance
            </Text>

            <TextInput
              style={{
                width: "100%",
                // borderBottomWidth: 1,
                // borderColor: "#ccc",
                // marginBottom: 20,
                // padding: 8,
                // fontSize: 16,
              }}
              mode="outlined"
              keyboardType="number-pad"
              placeholder="Enter amount"
              value={amount}
              onChangeText={handleChange}
            />
            <View
              style={{
                marginTop: 30,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onPress={onClose}
                mode="contained-tonal"
                style={{ borderRadius: 8, flex: 1 }}
              >
                Cancel
              </Button>
              <View style={{ width: 20 }} />
              <Button
                onPress={handleRecharge}
                mode="contained"
                style={{ borderRadius: 8, flex: 1 }}
              >
                Recharge
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      <Button
        onPress={() => setModalVisible(true)}
        style={{ borderRadius: 10, padding: 5 }}
        mode="contained"
      >
        <Text style={{ fontSize: 18 }}>Recharge</Text>
      </Button>
    </>
  );
};

export default RechargeModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    padding: 8,
    fontSize: 16,
  },
  button: {
    // backgroundColor: "#1565c0",
    // paddingHorizontal: 30,
    // paddingVertical: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  close: {
    borderRadius: 8,
    marginTop: 10,
  },
});
