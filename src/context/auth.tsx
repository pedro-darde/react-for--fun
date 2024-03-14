import { createContext, useContext } from "react";

type AuthContextProps = {
  user: {
    name: string;
    role: string;
  };
  login: () => void;
  logout: () => void;
  isLogged: boolean;
};

const AuthContext = createContext({} as AuthContextProps);
export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user: { name: "Shad", role: "admin" },
        login() {},
        logout() {},
        isLogged: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
