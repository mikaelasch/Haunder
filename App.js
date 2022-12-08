import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './StackNavigator';
import { decode } from 'base-64'

if(typeof atob === 'undefined') {
  global.atob = decode;
}


export default function App() {
  

  return (
    
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );
}
