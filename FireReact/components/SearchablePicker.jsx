// components/SearchablePicker.js
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const SearchablePicker = ({
  selectedValue,
  onValueChange,
  items,
  placeholder = "Selecione uma opção",
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    if (searchText) {
      const filtered = items.filter((item) =>
        item.label.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  }, [searchText, items]);

  const handleSelect = (value) => {
    onValueChange(value);
    setModalVisible(false);
    setSearchText("");
    Keyboard.dismiss();
  };

  const handleClose = () => {
    setModalVisible(false);
    setSearchText("");
    Keyboard.dismiss();
  };

  const selectedItem = items.find((item) => item.value === selectedValue);
  const displayText = selectedItem ? selectedItem.label : placeholder;

  return (
    <View>
      <TouchableOpacity
        style={[styles.trigger, style]}
        onPress={() => setModalVisible(true)}
      >
        <Text
          style={[styles.triggerText, !selectedValue && styles.placeholderText]}
        >
          {displayText}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleClose}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Selecione uma opção</Text>

                {/* Campo de busca */}
                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Digite para buscar..."
                    value={searchText}
                    onChangeText={setSearchText}
                    autoFocus={true}
                  />
                  {searchText ? (
                    <TouchableOpacity
                      style={styles.clearButton}
                      onPress={() => setSearchText("")}
                    >
                      <Text style={styles.clearText}>×</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>

                {/* Lista de resultados */}
                <FlatList
                  data={filteredItems}
                  keyExtractor={(item) => item.value}
                  style={styles.list}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.item,
                        selectedValue === item.value && styles.selectedItem,
                      ]}
                      onPress={() => handleSelect(item.value)}
                    >
                      <Text
                        style={[
                          styles.itemText,
                          selectedValue === item.value &&
                            styles.selectedItemText,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={
                    <Text style={styles.emptyText}>
                      Nenhum resultado encontrado
                    </Text>
                  }
                />

                {/* Botão fechar */}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleClose}
                >
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    minHeight: 56,
  },
  triggerText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  placeholderText: {
    color: "#9e9e9e",
  },
  arrow: {
    fontSize: 12,
    color: "#666",
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "80%",
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  clearButton: {
    position: "absolute",
    right: 12,
    padding: 4,
  },
  clearText: {
    fontSize: 20,
    color: "#666",
  },
  list: {
    maxHeight: 300,
    marginBottom: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  selectedItem: {
    backgroundColor: "#e3f2fd",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  selectedItemText: {
    color: "#1976d2",
    fontWeight: "500",
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
    padding: 20,
  },
  closeButton: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});

export default SearchablePicker;
