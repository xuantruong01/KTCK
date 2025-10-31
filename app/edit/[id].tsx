import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { db } from "../../database/db";

export default function EditScreen() {
  const { id } = useLocalSearchParams();   

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"Thu" | "Chi">("Chi");

  // ✅ Load data cũ theo id
  useEffect(() => {
    const result = db.getAllSync<any>(
      "SELECT * FROM expenses WHERE id = ?",
      [id]
    );

    if (result.length > 0) {
      setTitle(result[0].title);
      setAmount(String(result[0].amount));
      setType(result[0].type);
    }
  }, []);

  const handleSave = () => {
    if (!title) {
      Alert.alert("Lỗi", "Vui lòng nhập tiêu đề");
      return;
    }

    const amountNumber = Number(amount);

    db.runSync(
      `UPDATE expenses 
       SET title = ?, amount = ?, type = ?
       WHERE id = ?`,
      [title, amountNumber, type, id]
    );

    Alert.alert("Thành công", "Đã cập nhật");
    router.back();   // ✅ quay lại Home
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chỉnh sửa</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.typeBtn, type === "Thu" && styles.active]}
          onPress={() => setType("Thu")}
        >
          <Text>Thu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.typeBtn, type === "Chi" && styles.active]}
          onPress={() => setType("Chi")}
        >
          <Text>Chi</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={{ color: "white" }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 30 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1, borderColor: "#ccc", borderRadius: 6,
    padding: 10, marginBottom: 10
  },
  row: { flexDirection: "row", justifyContent: "center", marginBottom: 10 },
  typeBtn: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 10
  },
  active: { backgroundColor: "#bde4ff" },
  saveBtn: {
    backgroundColor: "#0a84ff",
    padding: 12,
    borderRadius: 6,
    alignItems: "center"
  }
});
