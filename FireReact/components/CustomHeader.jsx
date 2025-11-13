import React from "react";
import { StatusBar } from "react-native";
import { Header } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TopBar() {
  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: "#BC010C" }}>
      <StatusBar barStyle="light-content" backgroundColor="#BC010C" />
      <Header
        backgroundColor="#BC010C"
        placement="center"
        leftComponent={{
          text: "FIRE",
          style: { color: "#fff", fontWeight: "bold", fontSize: 20 },
        }}
        rightComponent={{ icon: "settings", color: "#fff" }}
        containerStyle={{
          // Removido width: 410
          width: "100%",
          borderBottomWidth: 0,
        }}
      />
    </SafeAreaView>
  );
}
