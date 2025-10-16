import React, { createContext, useState, useContext, ReactNode } from 'react';

interface RequestContextData {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  imageUri: string | null;
  setImageUri: (uri: string | null) => void;
  clearForm: () => void;
}

const RequestContext = createContext<RequestContextData>({} as RequestContextData);

export const RequestProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImageUri(null);
  };

  return (
    <RequestContext.Provider 
      value={{ title, setTitle, description, setDescription, imageUri, setImageUri, clearForm }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export const useRequestForm = () => {
  return useContext(RequestContext);
};