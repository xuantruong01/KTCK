import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import ExpenseItem from "../components/ExpenseItem";
import { Expense } from "../types/Expense";
import { router } from "expo-router";

const API_URL = "https://68e735df10e3f82fbf3e4f23.mockapi.io/ExpenseTracker";

export default function HomeScreen() {
  const [data, setData] = useState<Expense[]>([]);

  const getData = async () => {
    const res = await fetch(API_URL);
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>EXPENSE TRACKER</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExpenseItem item={item} />}
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
