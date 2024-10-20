"use client";

import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import api from "../helpers";

interface User {
  name: string;
}

interface AuthContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userToken = Cookies.get("userToken");
    if (userToken) {
      const fetchUser = async () => {
        try {
          const response = await api.get("/auth/user", {
            headers: { Authorization: `Bearer ${userToken}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data", error);
          Cookies.remove("userToken");
          setUser(null);
        }
      };
      fetchUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
