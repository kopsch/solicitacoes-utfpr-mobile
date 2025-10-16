import Constants from "expo-constants";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const extra = Constants.expoConfig?.extra;

if (!extra?.firebase) {
  throw new Error("Configuração do Firebase não encontrada no expoConfig.extra!");
}

const firebaseConfig = extra.firebase;

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
