import React from "react";
import { View, Text, StyleSheet } from "react-native";

const InputGroup = ({ label, children, style, required = false }) => {
  return (
    <View style={[styles.inputGroup, style]}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.requiredAsterisk}>*</Text>}
      </Text>
      {children}
      {required && <Text style={styles.requiredText}></Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    color: "#333",
  },
  requiredAsterisk: {
    color: "#bc010c",
    fontWeight: "bold",
    marginLeft: 2,
  },
  requiredText: {
    fontSize: 11,
    color: "#bc010c",
    fontStyle: "italic",
    marginTop: 2,
  },
});

export default InputGroup;
