import { useState, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions, CameraType } from "expo-camera";
import { styles } from "./styles";
import { useRequestForm } from "../../contexts/RequestContext";

export default function CameraScreen({ navigation }: any) {
  const [permission, requestPermission] = useCameraPermissions();
  const [type, setType] = useState<CameraType>("back");
  const cameraRef = useRef<CameraView>(null);
  const { setImageUri } = useRequestForm();

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) {
        setImageUri(photo.uri);
        navigation.goBack();
      }
    }
  };

  function toggleCameraType() {
    setType((current) => (current === "back" ? "front" : "back"));
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Precisamos da permissão da câmera
        </Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={{ color: "blue", textAlign: "center" }}>Permitir</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Ionicons name="camera-reverse" size={32} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Ionicons name="camera" size={50} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
