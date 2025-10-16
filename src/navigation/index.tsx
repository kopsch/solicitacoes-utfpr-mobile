import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import NewRequestScreen from "../screens/NewRequestScreen";
import CameraScreen from "../screens/CameraScreen";
import RequestDetailsScreen from "../screens/RequestDetailsScreen";

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Camera: undefined;
  NewRequest: { requestId: string };
  RequestDetails: { requestId: string };
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

const AuthRoutes = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);

const AppRoutes = () => (
  <AppStack.Navigator>
    <AppStack.Screen name="Home" component={HomeScreen} />

    <AppStack.Screen name="NewRequest" component={NewRequestScreen} />

    <AppStack.Screen
      name="RequestDetails"
      component={RequestDetailsScreen}
      options={{ title: "Detalhes da Solicitação" }}
    />

    <AppStack.Screen
      name="Camera"
      component={CameraScreen}
      options={{ headerShown: false }}
    />
  </AppStack.Navigator>
);

const RootNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

export default RootNavigator;
