import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { db } from "../database/db";
import { Expense } from "../types/Expense";
import ExpenseItem from "../components/ExpenseItem";

export default function TrashScreen() {
  const [data, setData] = useState<Expense[]>([]);

  const loadTrash = () => {
    const result = db.getAllSync<Expense>(
      "SELECT * FROM expenses WHERE isDeleted = 1"
    );
    setData(result);
  };

  useEffect(() => {
    loadTrash();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thùng rác</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ExpenseItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff", marginTop:50 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});
