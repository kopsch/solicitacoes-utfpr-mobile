import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential
} from 'firebase/auth';
import { auth } from '../firebase/config';

interface AuthCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends AuthCredentials {
    name: string;
}

export const registerUser = async ({ name, email, password }: RegisterCredentials): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  if (userCredential.user) {
    await updateProfile(userCredential.user, {
      displayName: name
    });
  }
  
  return userCredential;
};

export const loginUser = ({ email, password }: AuthCredentials): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = (): Promise<void> => {
  return signOut(auth);
}