import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";


export interface AuthContextType {
    isLoading: boolean;
    isAuthenticated: boolean;
    hasCompletedOnboarding: boolean;
    userName: string | null;
    userAvatar: string | null;
    completeOnboarding: () => Promise<void>;
    login: (name: string, avatar: string) => Promise<void>;
    logout: () => Promise<void>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [userToken, setUserToken] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [userAvatar, setUserAvatar] = useState<string | null>(null);
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadUser() {
            try {
                const [savedToken, savedName, savedAvatar, savedOnboarded] = await Promise.all([
                    AsyncStorage.getItem("@user_token"),
                    AsyncStorage.getItem("@user_name"),
                    AsyncStorage.getItem("@user_avatar"),
                    AsyncStorage.getItem("@has_onboarded")
                ]);

                if (savedToken) {
                    setUserToken(savedToken);
                    setUserName(savedName);
                    setUserAvatar(savedAvatar);
                }
                if (savedOnboarded === "true") {
                    setHasCompletedOnboarding(true);
                }
            } catch (error) {
                console.error("Error loading auth details from storage:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadUser();
    }, []);


    async function completeOnboarding() {
        try {
            await AsyncStorage.setItem("@has_onboarded", "true");
            setHasCompletedOnboarding(true);
        } catch (e) {
            console.error("Error completing onboarding:", e);
        }
    }

    async function login(name: string, avatar: string) {
        try {
            const mockToken = "mock-jwt-session-token-123";
            await Promise.all([
                AsyncStorage.setItem("@user_token", mockToken),
                AsyncStorage.setItem("@user_name", name),
                AsyncStorage.setItem("@user_avatar", avatar)
            ]);
            setUserToken(mockToken);
            setUserName(name);
            setUserAvatar(avatar);
        } catch (e) {
            console.error("Error during login:", e);
        }
    }

    async function logout() {
        try {
            await Promise.all([
                AsyncStorage.removeItem("@user_token"),
                AsyncStorage.removeItem("@user_name"),
                AsyncStorage.removeItem("@user_avatar")
            ]);
            setUserToken(null);
            setUserName(null);
            setUserAvatar(null);
        } catch (e) {
            console.error("Error during logout:", e);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                isAuthenticated: !!userToken,
                hasCompletedOnboarding,
                userName,
                userAvatar,
                completeOnboarding,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
