
import React, {useEffect, createContext, useContext} from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'

const AuthContext = createContext({
})



export function AuthProvider ({children}) {


    return(
        <AuthContext.Provider
         value={{
            user: "Sonny",
         }}>
         
         
         {children}
         
        </AuthContext.Provider>
    )

}

export default function useAuth() {
    return useContext(AuthContext)
}