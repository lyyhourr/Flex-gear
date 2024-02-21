"use client"
import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react'


interface IAuthContext {
    isLogged: boolean | null
    setIsLogged: Dispatch<SetStateAction<boolean | null>>
}
const AuthContext = createContext<IAuthContext | null>(null)

export default function AuthProvider({ children }: { children: ReactNode }) {
    const isLoggedStorage = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("isLogged") : null
    const [isLogged, setIsLogged] = useState<boolean | null>(isLoggedStorage as any || null)

    useEffect(() => {
        if (isLogged !== null) {
            sessionStorage.setItem('isLogged', isLogged as any)
        }
    }, [isLogged])

    const contextValue: IAuthContext = { isLogged, setIsLogged }

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a CartProductsContext");
    }
    return context;
};
