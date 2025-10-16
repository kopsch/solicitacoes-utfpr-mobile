import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { Comment } from "../types";

export const getComments = (
  requestId: string,
  callback: (comments: Comment[]) => void
) => {
  const commentsCollectionRef = collection(
    db,
    "requests",
    requestId,
    "comments"
  );
  const q = query(commentsCollectionRef, orderBy("createdAt", "asc"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const comments: Comment[] = [];
    querySnapshot.forEach((doc) => {
      comments.push({ id: doc.id, ...doc.data() } as Comment);
    });
    callback(comments);
  });

  return unsubscribe;
};

export const addComment = async (
  requestId: string,
  text: string
): Promise<void> => {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado.");
  if (!text.trim()) throw new Error("O comentário não pode estar vazio.");

  const commentsCollectionRef = collection(
    db,
    "requests",
    requestId,
    "comments"
  );
  await addDoc(commentsCollectionRef, {
    text,
    userId: user.uid,
    userName: user.displayName,
    createdAt: serverTimestamp(),
  });
};
