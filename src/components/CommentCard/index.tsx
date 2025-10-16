import React from "react";
import { View, Text } from "react-native";
import { Comment } from "../../types";
import { styles } from "./styles";

interface Props {
  comment: Comment;
}

const CommentCard = ({ comment }: Props) => {
  const formattedDate =
    comment.createdAt?.toDate().toLocaleDateString("pt-BR") || "agora";

  return (
    <View style={styles.container}>
      <Text style={styles.user}>{comment.userName}</Text>
      <Text style={styles.text}>{comment.text}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
    </View>
  );
};

export default CommentCard;
