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
import { registerUser } from "../../services/authService";

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Erro", "Por favor, preencha nome, e-mail e senha.");
      return;
    }
    setLoading(true);
    try {
      await registerUser({ name, email, password });
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Erro", "Este e-mail já está em uso.");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Erro", "O formato do e-mail é inválido.");
      } else if (error.code === "auth/weak-password") {
        Alert.alert("Erro", "A senha deve ter no mínimo 6 caracteres.");
      } else {
        Alert.alert("Erro", "Ocorreu um problema ao tentar registrar.");
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
          <Text style={styles.appName}>UniHelp</Text>
          <Text style={styles.subtitle}>Portal de Solicitações da UTFPR</Text>

          <Text style={styles.title}>Crie sua conta</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

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
              <Button title="Registrar" onPress={handleRegister} />
              <View style={{ height: 12 }} />
              <Button
                title="Já tem uma conta? Fazer Login"
                color="#555"
                onPress={() => navigation.navigate("Login")}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
