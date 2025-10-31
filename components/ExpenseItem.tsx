import React from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { router } from "expo-router";
import { db } from "../database/db";
import { Expense } from "../types/Expense";

export default function ExpenseItem({ item }: { item: Expense }) {
  const handleLongPress = () => {
    Alert.alert(
      "Xóa khoản chi?",
      `Bạn có chắc muốn xóa "${item.title}"?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            db.runSync(
              "UPDATE expenses SET isDeleted = 1 WHERE id = ?",
              [item.id]
            );
            Alert.alert("Đã xóa");
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        router.push({ pathname: "/edit/[id]", params: { id: item.id.toString() } })
      }
      onLongPress={handleLongPress}  // ✅ chạm lâu để xóa
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.amount} đ • {item.type} • {item.createdAt}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  title: { fontWeight: "bold", fontSize: 16 },
});
