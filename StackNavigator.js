import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './components/HomeScreen'
import ChatScreen from './components/ChatScreen'
import LoginScreen from './components/LoginScreen'
import ProfileScreen from './components/ProfileScreen'
import { auth } from './firebaseConfig'
import UserScreen from './components/UserScreen'
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react'

const Stack = createNativeStackNavigator() 

export default function StackNavigator({navigation}){

    const [isLoggedIn, setLoggedIn] = useState(false);

    onAuthStateChanged(auth, (user) => setLoggedIn(user != null));

    

    return(
        <Stack.Navigator>
            {isLoggedIn ? (
                <>
            <Stack.Screen name="HAUNDER" component={HomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="User" component={UserScreen} options={{ headerShown: false }} />
            </>
    ) : (
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        )}
          </Stack.Navigator>
    )
}
