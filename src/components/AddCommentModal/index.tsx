import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (comment: string) => Promise<void>;
}

const AddCommentModal = ({ visible, onClose, onSubmit }: Props) => {
  const [comment, setComment] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit(comment);
      setComment("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.centeredView}
          >
            <View style={styles.modalCard}>
              <View style={styles.header}>
                <Text style={styles.modalTitle}>Adicionar Comentário</Text>
                <TouchableOpacity onPress={onClose}>
                  <Ionicons name="close" size={26} color="#666" />
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Digite seu comentário..."
                placeholderTextColor="#888"
                value={comment}
                onChangeText={setComment}
                multiline
                maxLength={500}
              />

              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={onClose}
                  disabled={isSubmitting}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.submitButton,
                    (!comment.trim() || isSubmitting) && { opacity: 1 },
                  ]}
                  onPress={handleSubmit}
                  disabled={!comment.trim() || isSubmitting}
                >
                  <Text style={styles.buttonText}>
                    {isSubmitting ? "Salvando..." : "Salvar"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddCommentModal;
