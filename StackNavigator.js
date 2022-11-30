import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './components/HomeScreen'
import ChatScreen from './components/ChatScreen'
import LoginScreen from './components/LoginScreen'
import ProfileScreen from './components/ProfileScreen'
import useAuth from './components/useAuth'
import CreateUser from './components/CreateUser'

const Stack = createNativeStackNavigator() 

export default function StackNavigator({navigation}){
const user=true
    {/*const {user} = useAuth()*/}
    return(
        <Stack.Navigator>
            {user ? (
                <>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Chat" component={ChatScreen}/>
            <Stack.Screen name="Profile" component={ProfileScreen}/>
            <Stack.Screen name="Create user" component={CreateUser}/>
            </>
    ) : (
            <Stack.Screen name="Login" component={LoginScreen}/>
        )}
          </Stack.Navigator>
    )
}
