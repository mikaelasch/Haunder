import {View , ImageBackground, Text, StyleSheet } from 'react-native'
import React, {useState }from 'react'
import { Input, Button } from '@rneui/base';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth, fs } from '../firebaseConfig'
import { setDoc, doc } from 'firebase/firestore';

export default function LoginScreen({ navigation }) {
   
  const[email,setEmail] = useState()
  const[password,setPassword] = useState()
  

  function handleLogin () {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Login succesful", userCredential.user);
      
  })
  .catch((error) => {
    if (error.message.includes("auth/user-not-found")) {
      return createFirebaseUser()
    }
    console.log(error)
  });
  }

  function createFirebaseUser() {
      createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = {
      id: userCredential.user.uid,
      email: userCredential.user.email
    }
    createUser(user)
  }).catch((error) => {
    console.log(error)
  })
  }

  async function createUser(user) {
    await setDoc(doc(fs, "users", user.id), user)
  }
  
  return (
        <View style={styles.container}>
         
         <Input
         value={email}
         placeholder="email"
         onChangeText={value=> setEmail(value)}></Input>
         <Input
         value={password}
         placeholder="password"
         onChangeText={value => setPassword(value)}>
         </Input>
         <Button title="Login" onPress={handleLogin}></Button>
      
          {/* <ImageBackground
            source={require('../img/haunderlogo.png')} 
            style={styles.image}>
                <Text style={styles.text}>HAUNDER</Text>            
            </ImageBackground> */}
        </View> 
         );}

         const styles = StyleSheet.create({
            container: {
              flex: 1,
            },
            image: {
              flex: 1,
              justifyContent: "center"
            },
            text: {
              color: "white",
              fontSize: 42,
              lineHeight: 84,
              fontWeight: "bold",
              textAlign: "center",
              backgroundColor: "#000000c0"
            }
          });