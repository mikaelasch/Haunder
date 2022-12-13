import { View, ImageBackground, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { Input, Button, Dialog } from '@rneui/base';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, fs } from '../firebaseConfig'
import { setDoc, doc, collection } from 'firebase/firestore';

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [visible, setVisible] = useState(false)

  const toggleDialog = () => {
    setVisible(!visible)
  }


  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Login succesful", userCredential.user);

      })
      .catch((error) => {
        if (error.message.includes("auth/user-not-found")) {
          Alert.alert("User not found, register below") 
        }
        if(error.message.includes('auth/wrong-password')){
          Alert.alert("Wrong password")
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
        if (error.message.includes("auth/weak-password")) {
          Alert.alert("Password should be at least 6 charachters")
        }
        console.log(error)
      })
  }

  async function createUser(user) {
    console.log(user)
    const profileRef = doc(collection(fs, "profiles"))
    console.log(profileRef)
    await setDoc(doc(fs, "users", user.id), {
      ...user,
      id: user.id,
      profileId: profileRef.id
    })
    await setDoc(profileRef, { id: profileRef.id, userId: user.id, name: "", age: "", description: "" })
  }

  return (
    <View style={styles.container}>

      <ImageBackground
        source={require('../img/haunderlogo.png')}
        style={styles.image}>
        <ImageBackground
          source={require('../img/Haunder.png')}
          style={styles.logo}></ImageBackground>
        <View>
          <Input
            value={email}
            placeholder="email"
            color="white"
            onChangeText={value => setEmail(value)}></Input>
          <Input
            value={password}
            secureTextEntry={true}
            color="white"
            placeholder="password"
            onChangeText={value => setPassword(value)}>
          </Input>
        </View>
        <Button title="Login" type="outlined" onPress={handleLogin} titleStyle={{ color: 'white', marginHorizontal: 20 }}></Button>
        <Button title="New user? Register here" type="outlined" onPress={toggleDialog} titleStyle={{ color: 'white', marginHorizontal: 20 }}></Button>
        <Dialog
          isVisible={visible}
          onBackdropPress={toggleDialog}>
          <Dialog.Title title="Create new user" />
          <Input
            placeholder='email'
            color="white"
            value={email}
            onChangeText={value => setEmail(value)} />
          <Input
            placeholder='password'
            color="white"
            value={password}
            onChangeText={value => setPassword(value)} 
            />
          <Dialog.Actions>
            <Dialog.Button title="Register" onPress={createFirebaseUser}></Dialog.Button>
          </Dialog.Actions>
        </Dialog>
      </ImageBackground>
    </View>
  )
}

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
  },
  logo: {
    justifyContent: "center",
    flex: 0.2,
    padding: 8,
    marginBottom: 350
  }

});