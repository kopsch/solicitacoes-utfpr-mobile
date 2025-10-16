import React from "react";
import RootNavigator from "./src/navigation";
import { AuthProvider } from "./src/contexts/AuthContext";
import { RequestProvider } from "./src/contexts/RequestContext";

export default function App() {
  return (
    <AuthProvider>
      <RequestProvider>
        <RootNavigator />
      </RequestProvider>
    </AuthProvider>
  );
}
