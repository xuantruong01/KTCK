import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { db } from "../database/db";
import { Expense } from "../types/Expense";

export default function HomeScreen() {
  const [data, setData] = useState<Expense[]>([]);
  const [search, setSearch] = useState("");

  // ✅ Load SQLite
  const loadData = (keyword: string = "") => {
    const result = db.getAllSync<Expense>(
      `SELECT * FROM expenses
       WHERE isDeleted = 0 AND title LIKE ?
       ORDER BY id DESC`,
      [`%${keyword}%`]
    );
    setData(result);
  };

  // ✅ Load mỗi lần vào màn hình
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>EXPENSE TRACKER</Text>

      {/* ✅ Ô tìm kiếm */}
      <TextInput
        placeholder="Tìm theo tiêu đề..."
        style={styles.search}
        value={search}
        onChangeText={(text) => {
          setSearch(text);
          loadData(text);
        }}
      />

      {/* ✅ Danh sách thu chi */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            // ✅ Nhấn → chỉnh sửa
            onPress={() =>
              router.push({ pathname: "/edit/[id]", params: { id: item.id } })
            }

            // ✅ Chạm lâu → xác nhận → xóa (đưa vào trash)
            onLongPress={() =>
              Alert.alert(
                "Xóa khoản này?",
                "Bạn có chắc muốn đưa vào thùng rác?",
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
                      loadData(search);
                    },
                  },
                ]
              )
            }
          >
            <Text style={styles.textTitle}>{item.title}</Text>
            <Text style={styles.textInfo}>
              {item.amount} đ • {item.type} • {item.createdAt}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* ✅ Nút Add */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push("/add")}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Add</Text>
      </TouchableOpacity>

      {/* ✅ Nút Trash */}
      <TouchableOpacity
        style={styles.trashBtn}
        onPress={() => router.push("/trash")}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Trash</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  item: {
    paddingVertical: 12,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  textTitle: { fontSize: 16, fontWeight: "bold" },
  textInfo: { fontSize: 12, color: "#666" },

  addBtn: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#0a84ff",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 30,
  },

  trashBtn: {
    position: "absolute",
    left: 20,
    bottom: 20,
    backgroundColor: "gray",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 30,
  },
});
