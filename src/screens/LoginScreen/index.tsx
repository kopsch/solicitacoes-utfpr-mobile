import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { styles } from "./styles";
import { loginUser } from "../../services/authService";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha e-mail e senha.");
      return;
    }

    setLoading(true);
    try {
      await loginUser({ email, password });
    } catch (error: any) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-email" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        Alert.alert("Erro", "E-mail ou senha inválidos.");
      } else {
        Alert.alert("Erro", "Ocorreu um problema ao tentar fazer login.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* 🔹 LOGO / NOME DO APP */}
          <Text style={styles.appName}>UniHelp</Text>
          <Text style={styles.subtitle}>Portal de Solicitações da UTFPR</Text>

          {/* 🔹 TÍTULO DA TELA */}
          <Text style={styles.title}>Acesse sua conta</Text>

          {/* 🔹 INPUTS */}
          <TextInput
            style={styles.input}
            placeholder="E-mail Institucional"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* 🔹 BOTÕES */}
          {loading ? (
            <ActivityIndicator size="large" color="#002147" />
          ) : (
            <View style={styles.buttonContainer}>
              <Button title="Entrar" onPress={handleLogin} />
              <View style={{ height: 12 }} />
              <Button
                title="Não tem uma conta? Registrar-se"
                color="#555"
                onPress={() => navigation.navigate("Register")}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
