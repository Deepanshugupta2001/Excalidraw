import { useEffect } from "react";
import { createContext } from "react";
import { loginData, logoutData, signUpData } from "../api/authapi";
import { useState } from "react";

export const AuthContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4444";

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
                    credentials: "include",
                });
                if (res.status === 401) {
                    setUser(null);
                    return;
                }

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                    return;
                }

                console.warn("Auth check failed:", res.status);
            } catch (error) {
                console.error("Auth check failed:", error);
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, [])

    const signup = async (userData) => {
        const response = await signUpData(userData);
        if (response.error) throw new Error(response.error);
        setUser(response.user);
        return response;
    };

    // 🔹 Login wrapper using your existing API file
    const login = async (userData) => {
        const response = await loginData(userData);
        if (response.error) throw new Error(response.error);
        setUser(response.user);
        return response;
    };

    const logout = async () => {
        const response = await logoutData();
        if (response.error) throw new Error(response.error);
        setUser(null);
        return response;
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );


}
