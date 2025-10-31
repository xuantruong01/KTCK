import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { db } from "../database/db";
import { Expense } from "../types/Expense";
import { useCallback } from "react";

export default function HomeScreen() {
  const [data, setData] = useState<Expense[]>([]);

  const loadSQLiteData = () => {
    const result = db.getAllSync<Expense>(
      "SELECT * FROM expenses WHERE isDeleted = 0"
    );
    setData(result);
  };

  useFocusEffect(
    useCallback(() => {
      loadSQLiteData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>EXPENSE TRACKER</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              router.push({
                pathname: "/edit/[id]",
                params: { id: item.id.toString() },
              })
            }
          >
            <Text style={styles.textTitle}>{item.title}</Text>

            <Text style={styles.textInfo}>
              {item.amount} đ • {item.type} • {item.createAt}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push("/add")}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Add</Text>
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
    marginBottom: 10,
  },
  item: {
    paddingVertical: 10,
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
});
