import React, { useLayoutEffect, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert, Platform, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { createRequest, getRequestById, updateRequest } from '../../services/requestService';
import { useRequestForm } from '../../contexts/RequestContext';
import { Request } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation';

type Props = NativeStackScreenProps<AppStackParamList, 'NewRequest'>;

const NewRequestScreen = ({ navigation, route }: Props) => {
  const requestId = route.params?.requestId;

  const { title, setTitle, description, setDescription, imageUri, setImageUri, clearForm } = useRequestForm();
  
  const [loading, setLoading] = useState(false);
  const [isFetchingData, setFetchingData] = useState(!!requestId);
  const [originalRequest, setOriginalRequest] = useState<Request | null>(null); 

  useEffect(() => {
    const loadRequestData = async () => {
      if (requestId) {
        try {
          const requestData = await getRequestById(requestId);
          setTitle(requestData.title);
          setDescription(requestData.description);
          setImageUri(requestData.photoURL);
          setOriginalRequest(requestData);
        } catch (error) {
          Alert.alert("Erro", "Não foi possível carregar os dados para edição.");
        } finally {
          setFetchingData(false);
        }
      } else {
        clearForm();
      }
    };
    loadRequestData();
  }, [requestId]);

  const handleTakePhoto = () => {
    navigation.navigate('Camera');
  };

  const handleSave = async () => {
    if (!title || !description || !imageUri) {
      Alert.alert('Campos Incompletos', 'Todos os campos, incluindo a foto, são obrigatórios.');
      return;
    }
    setLoading(true);
    try {
      if (requestId && originalRequest) {
        await updateRequest({ id: requestId, title, description, imageUri }, originalRequest);
        Alert.alert('Sucesso!', 'Sua solicitação foi atualizada.');
      } else {
        await createRequest({ title, description, imageUri });
        Alert.alert('Sucesso!', 'Sua solicitação foi enviada.');
      }
      clearForm();
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar: ", error);
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: requestId ? 'Editar Solicitação' : 'Nova Solicitação',
      headerRight: () => (
        <TouchableOpacity onPress={handleSave} disabled={loading || isFetchingData}>
          <Text style={styles.headerButtonText}>
            {requestId ? 'Salvar' : 'Cadastrar'}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, requestId, title, description, imageUri, loading, isFetchingData]);

  if (isFetchingData) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" /></View>;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#002147" />
            <Text style={styles.loadingText}>Salvando...</Text>
          </View>
        ) : (
          <>
            <TextInput style={styles.input} placeholder="Título da Solicitação" value={title} onChangeText={setTitle} />
            <TextInput style={[styles.input, styles.descriptionInput]} placeholder="Descrição detalhada" value={description} onChangeText={setDescription} multiline />
            
            {imageUri ? (
              <View>
                <Image source={{ uri: imageUri }} style={styles.previewImage} />
                <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto}>
                  <Ionicons name="camera" size={24} color="#002147" />
                  <Text style={styles.photoButtonText}>
                    {requestId ? 'Tirar Outra Foto' : 'Tirar Foto'}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto}>
                <Ionicons name="camera" size={24} color="#002147" />
                <Text style={styles.photoButtonText}>Tirar Foto</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewRequestScreen;