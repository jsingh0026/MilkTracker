import { Text, TouchableOpacity, View } from "react-native";
import Calendar from "@/components/Calendar";
import Details from "@/components/Details";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RechargeModal from "@/components/RechargeModal";

export default function Index() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        paddingBottom: insets.bottom,
      }}
    >
      <Calendar />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          // alignItems: "center",
          paddingHorizontal: insets.left,
        }}
      >
        <Details />
        <View style={{ paddingHorizontal: 20 }}>
          <Button
            style={{ borderRadius: 10, padding: 5 }}
            mode="contained-tonal"
          >
            <Text style={{ fontSize: 18 }}>History</Text>
          </Button>
          <View style={{ height: 15 }} />
          <RechargeModal />
        </View>
      </View>
    </View>
  );
}
