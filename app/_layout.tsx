import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { createTable } from "../database/db";

export default function Layout() {
  useEffect(() => {
    createTable(); // ✅ Tạo bảng ngay khi mở app
  }, []);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
