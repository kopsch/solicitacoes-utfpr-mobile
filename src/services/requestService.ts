import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage, auth } from "../firebase/config";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { Request } from "../types";

interface CreateRequestData {
  title: string;
  description: string;
  imageUri: string;
}

interface UpdateRequestData {
  id: string;
  title: string;
  description: string;
  imageUri: string | null;
}

const uploadImageAndGetURL = async (uri: string): Promise<string> => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const fileName = `requests/${Date.now()}.jpg`;
  const imageRef = ref(storage, fileName);

  await uploadBytes(imageRef, blob);

  return await getDownloadURL(imageRef);
};

export const createRequest = async ({
  title,
  description,
  imageUri,
}: CreateRequestData): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Nenhum usuário autenticado encontrado.");
  }

  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Permissão Negada",
      "A permissão de localização é necessária para criar uma solicitação."
    );
    throw new Error("Permissão de localização negada");
  }
  const location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;

  const photoURL = await uploadImageAndGetURL(imageUri);

  await addDoc(collection(db, "requests"), {
    title,
    description,
    photoURL,
    location: {
      latitude,
      longitude,
    },
    userId: user.uid,
    userName: user.displayName,
    createdAt: serverTimestamp(),
  });
};

export const getRequests = (callback: (requests: Request[]) => void) => {
  const q = query(collection(db, "requests"), orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const requests: Request[] = [];
    querySnapshot.forEach((doc) => {
      requests.push({ id: doc.id, ...doc.data() } as Request);
    });
    callback(requests);
  });

  return unsubscribe;
};

export const getRequestById = async (id: string): Promise<Request> => {
  const docRef = doc(db, "requests", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Request;
  } else {
    throw new Error("Solicitação não encontrada.");
  }
};

export const deleteRequest = async (request: Request): Promise<void> => {
  try {
    const imageRef = ref(storage, request.photoURL);
    await deleteObject(imageRef);
  } catch (error: any) {
    console.error("Erro ao deletar a imagem do Storage: ", error);
  }

  const docRef = doc(db, "requests", request.id);
  await deleteDoc(docRef);
};

export const updateRequest = async (
  updatedData: UpdateRequestData,
  originalRequest: Request
): Promise<void> => {
  const docRef = doc(db, "requests", updatedData.id);

  const dataToUpdate: {
    title: string;
    description: string;
    photoURL?: string;
  } = {
    title: updatedData.title,
    description: updatedData.description,
  };

  if (updatedData.imageUri && updatedData.imageUri.startsWith("file://")) {
    const newPhotoURL = await uploadImageAndGetURL(updatedData.imageUri);
    dataToUpdate.photoURL = newPhotoURL;

    try {
      const oldImageRef = ref(storage, originalRequest.photoURL);
      await deleteObject(oldImageRef);
    } catch (error) {
      console.error("Erro ao deletar imagem antiga:", error);
    }
  }

  await updateDoc(docRef, dataToUpdate);
};
