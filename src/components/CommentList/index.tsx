import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Comment } from '../../types';
import CommentCard from '../CommentCard';
import { styles } from './styles';

interface Props {
  comments: Comment[];
}

const CommentList = ({ comments }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comentários</Text>
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentCard comment={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.noCommentsText}>Nenhum comentário ainda. Seja o primeiro!</Text>}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

export default CommentList;