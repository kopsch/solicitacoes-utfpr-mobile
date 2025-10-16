import { Timestamp } from 'firebase/firestore';

export interface Request {
  id: string;
  title: string;
  description: string;
  photoURL: string;
  location: {
    latitude: number;
    longitude: number;
  };
  userId: string;
  userName: string;
  createdAt: Timestamp;
}

export interface Comment {
  id: string;
  text: string;
  userId: string;
  userName: string;
  createdAt: Timestamp;
}