import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { logoutUser } from "../../services/authService";
import { getRequests } from "../../services/requestService";
import { Request } from "../../types";

const HomeScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = getRequests((fetchedRequests) => {
      setRequests(fetchedRequests);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Solicitações Públicas",
      headerStyle: { backgroundColor: "#002147" },
      headerTintColor: "#fff",
      headerTitleStyle: { fontWeight: "bold" },
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("NewRequest")}>
          <Ionicons name="add-circle" size={32} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderItem = ({ item }: { item: Request }) => (
    <TouchableOpacity
      style={styles.requestCard}
      onPress={() =>
        navigation.navigate("RequestDetails", { requestId: item.id })
      }
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.requestTitle}>{item.title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </View>
      <Text style={styles.requestDate}>
        Criado em: {item.createdAt?.toDate().toLocaleDateString("pt-BR")}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#002147" />
        <Text style={{ marginTop: 10, color: "#002147", fontSize: 16 }}>
          Carregando solicitações...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
  <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <TouchableOpacity
          onPress={logoutUser}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#002147",
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 25,
          }}
        >
          <Ionicons name="log-out-outline" size={22} color="white" />
          <Text
            style={{
              color: "white",
              fontWeight: "600",
              fontSize: 16,
              marginLeft: 8,
            }}
          >
            Sair
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.pageTitle}>Bem-vindo ao UniHelp 👋</Text>
      <Text style={styles.pageSubtitle}>
        Veja as solicitações abertas por outros alunos
      </Text>

      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>
              Nenhuma solicitação disponível no momento.
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default HomeScreen;
