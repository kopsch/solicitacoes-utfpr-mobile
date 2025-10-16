import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Alert,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { deleteRequest, getRequestById } from "../../services/requestService";
import { Comment, Request } from "../../types";
import { useAuth } from "../../contexts/AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../navigation";
import AddCommentModal from "../../components/AddCommentModal";
import { addComment, getComments } from "../../services/commentService";
import CommentCard from "../../components/CommentCard";

type Props = NativeStackScreenProps<AppStackParamList, "RequestDetails">;

const RequestDetailsScreen = ({ navigation, route }: Props) => {
  const { user } = useAuth();
  const { requestId } = route.params;
  const insets = useSafeAreaInsets();

  const [request, setRequest] = useState<Request | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isImageLoading, setImageLoading] = useState(true);
  const [isDeleting, setDeleting] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchRequest = async () => {
        setLoading(true);
        try {
          const fetchedRequest = await getRequestById(requestId);
          if (isActive) setRequest(fetchedRequest);
        } catch (error) {
          console.error(error);
          if (isActive)
            Alert.alert("Erro", "Não foi possível carregar os detalhes.");
        } finally {
          if (isActive) setLoading(false);
        }
      };
      fetchRequest();
      return () => {
        isActive = false;
      };
    }, [requestId])
  );

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    const unsubscribeComments = getComments(requestId, setComments);
    return () => unsubscribeComments();
  }, [requestId, navigation]);

  const isOwner = user && request ? user.uid === request.userId : false;

  const handleDelete = () => {
    if (!request) return;
    Alert.alert("Confirmar Exclusão", "Tem certeza que deseja excluir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          setDeleting(true);
          try {
            await deleteRequest(request);
            Alert.alert("Sucesso", "Solicitação excluída.");
            navigation.goBack();
          } catch (error) {
            console.error("Erro ao excluir: ", error);
            Alert.alert("Erro", "Não foi possível excluir a solicitação.");
            setDeleting(false);
          }
        },
      },
    ]);
  };

  const handleAddComment = async (commentText: string) => {
    try {
      await addComment(requestId, commentText);
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar o comentário.");
    }
  };

  if (isDeleting || loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#002147" />
        {isDeleting && (
          <Text style={{ marginTop: 10, color: "#002147" }}>Excluindo...</Text>
        )}
      </SafeAreaView>
    );
  }

  if (!request) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>Solicitação não encontrada.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔹 Botão "Voltar" realmente fixo na tela */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          top: 40,
          left: 20,
          zIndex: 10,
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 25,
          paddingVertical: 6,
          paddingHorizontal: 12,
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <Ionicons name="arrow-back" size={22} color="white" />
        <Text
          style={{
            color: "white",
            fontSize: 15,
            fontWeight: "500",
            marginLeft: 5,
          }}
        >
          Voltar
        </Text>
      </TouchableOpacity>

      {/* 🔹 Conteúdo da tela (scrollável) */}
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CommentCard comment={item} />}
        ListHeaderComponent={
          <>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: request.photoURL }}
                style={styles.image}
                onLoadStart={() => setImageLoading(true)}
                onLoadEnd={() => setImageLoading(false)}
              />
              {isImageLoading && (
                <ActivityIndicator
                  style={styles.imageLoader}
                  size="large"
                  color="#002147"
                />
              )}
            </View>

            <View style={styles.content}>
              <Text style={styles.title}>{request.title}</Text>

              <View style={styles.infoBox}>
                <Ionicons
                  name="person-circle-outline"
                  size={18}
                  color="#002147"
                />
                <Text style={styles.text}>{request.userName}</Text>
              </View>

              <View style={styles.infoBox}>
                <Ionicons name="calendar-outline" size={18} color="#002147" />
                <Text style={styles.text}>
                  {request.createdAt.toDate().toLocaleDateString("pt-BR")}
                </Text>
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={styles.label}>Descrição:</Text>
                <Text style={styles.text}>{request.description}</Text>
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={styles.label}>Localização:</Text>
                <Text style={styles.text}>
                  Lat: {request.location.latitude.toFixed(5)}, Lon:{" "}
                  {request.location.longitude.toFixed(5)}
                </Text>
              </View>

              {isOwner && (
                <View style={styles.buttonContainer}>
                  <Button
                    title="Editar Solicitação"
                    onPress={() =>
                      navigation.navigate("NewRequest", {
                        requestId: request.id,
                      })
                    }
                  />
                  <View style={{ marginTop: 10 }} />
                  <Button
                    title="Excluir Solicitação"
                    color="red"
                    onPress={handleDelete}
                  />
                </View>
              )}
            </View>

            <Text style={styles.commentHeader}>Comentários</Text>
          </>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* 🔹 Botão de comentário flutuante */}
      <TouchableOpacity
        style={[styles.fab, { bottom: 20 + insets.bottom }]}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="chatbubble-ellipses" size={26} color="white" />
      </TouchableOpacity>

      {/* 🔹 Modal de adicionar comentário */}
      <AddCommentModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddComment}
      />
    </SafeAreaView>
  );
};

export default RequestDetailsScreen;
