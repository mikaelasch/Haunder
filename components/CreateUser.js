import React, { useState } from 'react';
import { fs } from './firebase-config';
import { Input, Button, Icon, Text } from '@rneui/themed';
import { doc, setDoc, collection } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';


export default function CreateUser({ navigation }) {
    
    const [image, setImage] = useState(null);

    const [profile, setProfile] = useState({
        email:'',
        password:'',
        name:'',
        age:'',
        description:'',
        imgPath: ''
    })


    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
      
          if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
    }

    async function register() {
        const ref = doc(collection(fs, "profiles"))
        await setDoc(doc(fs, "profiles", ref.id), {
            id: ref.id,
            ...profile
        });
        navigation.navigate("Home")

    }

    return (
        <>
        <Text h1>Register</Text>
        <Text h3>Your information</Text>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
       <Input
        value={profile.email}
       placeholder='Email'
       onChangeText={(value) => setProfile({...profile, email: value})}       
       />
       <Input
       value={profile.password}
       placeholder='Password'
       onChangeText={(value) => setProfile({...profile, password: value})}       
       />
        <Text h3> Your best friends information</Text>
       <Input
       value={profile.name}
       placeholder='Your Best Friends name'
       onChangeText={(value) => setProfile({...profile, name: value})}       
       leftIcon={{ type: 'font-awesome', name: 'paw' }}
       />
       <Input
       value={profile.age}
       placeholder='Your Best Friends Age'
       onChangeText={(value) => setProfile({...profile, age: value})}       
       leftIcon={{ type: 'font-awesome', name: 'paw' }}
       />
       <Input
       value={profile.description}
       placeholder='Describe your pet'
       onChangeText={(value) => setProfile({...profile, description: value})}       
       leftIcon={{ type: 'font-awesome', name: 'paw' }}
       />
    <Button title="Pick an image from camera roll" onPress={pickImage} />
    <Button type="solid" onPress={register}>
    <Icon name="home" color="white"  />
  Save and go swipe!
</Button>       
       </>
         );
}