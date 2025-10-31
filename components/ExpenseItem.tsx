import { View, Text, StyleSheet } from "react-native";
import { Expense } from "../types/Expense";

export default function ExpenseItem({ item }: { item: Expense }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.amount}>
            {item.amount ? Number(item.amount).toLocaleString() + "₫" : "0₫"}
        </Text>

      <Text style={styles.date}>{item.createdAt}</Text>
      <Text style={styles.type}>
        {item.type === "Thu" ? "✅ Thu" : "❌ Chi"}
      </Text>
      <Text style={styles.create} >{item.createAt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  amount: { color: "green", marginTop: 3 },
  date: { color: "#666", fontStyle: "italic" },
  type: { fontWeight: "bold", marginTop: 3 },
  create: { fontWeight: "bold", marginTop: 3 },
});
