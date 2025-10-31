import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { db } from "../database/db";

export default function AddScreen() {
  const [type, setType] = useState<"Thu" | "Chi">("Chi");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const titleRef = useRef<TextInput>(null);
  const amountRef = useRef<TextInput>(null);

  const handleSave = () => {
    if (!title) {
      Alert.alert("Lỗi", "Vui lòng nhập tiêu đề");
      return;
    }

    const amountNumber = Number(amount) || 0;
    const createdAt = new Date().toISOString().slice(0, 10);

    db.runSync(
      `INSERT INTO expenses (title, amount, createdAt, type, isDeleted)
       VALUES (?, ?, ?, ?, 0)`,
      [title, amountNumber, createdAt, type]
    );

    setTitle("");
    setAmount("");
    titleRef.current?.clear();
    amountRef.current?.clear();

    Alert.alert("Thành công", "Đã lưu vào SQLite");
    router.back();
  };

  return (
    <View style={styles.container}>

      {/* ✅ Nút quay về */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Thêm Chi Tiêu</Text>

      <TextInput
        ref={titleRef}
        placeholder="Them khoản chi"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        ref={amountRef}
        placeholder="Số tiền"
        keyboardType="numeric"
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
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
        <Text style={{ color: "#fff" }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 30 },
  backBtn: {
    position: "absolute",
    top: 20,
    left: 15,
    padding: 5,
  },
  backText: { fontSize: 28 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  input: {
    borderWidth: 1, borderColor: "#ccc", borderRadius: 6,
    padding: 10, marginBottom: 10,
  },
  row: { flexDirection: "row", justifyContent: "center", marginBottom: 10 },
  typeBtn: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 10,
  },
  active: { backgroundColor: "#bde4ff" },
  saveBtn: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20,
  }
});
