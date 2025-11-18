// components/SearchablePicker.jsx
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

const SearchablePicker = ({
  selectedValue,
  onValueChange,
  items,
  placeholder = "Selecione uma opção",
  style,
  disabled = false,
}) => {
  return (
    <Dropdown
      style={[styles.dropdown, style, disabled && styles.disabled]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={items}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      searchPlaceholder="Digite para buscar..."
      value={selectedValue}
      onChange={(item) => onValueChange(item.value)}
      // Configurações para evitar problemas com teclado
      autoScroll={false}
      keyboardAvoiding={Platform.OS === "ios"} // true para iOS
      showsVerticalScrollIndicator={true}
      // Melhor comportamento do modal
      modalProps={{
        animationType: "slide",
        transparent: true,
        presentationStyle: "overFullScreen",
        hardwareAccelerated: true,
        statusBarTranslucent: true,
      }}
      // Configurações da lista
      flatListProps={{
        keyboardShouldPersistTaps: "handled",
        showsVerticalScrollIndicator: true,
      }}
      // Evita que o dropdown abra quando disabled
      disable={disabled}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 56,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  disabled: {
    backgroundColor: "#f5f5f5",
    borderColor: "#e0e0e0",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#9e9e9e",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#333",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
});

export default SearchablePicker;
