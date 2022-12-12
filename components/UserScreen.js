import { View } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Input, Button, Text } from '@rneui/themed';
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import * as ImagePicker from 'expo-image-picker'
import { Alert, Image } from 'react-native';
import { signOut } from 'firebase/auth';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { auth, storage, fs } from '../firebaseConfig';

export default function UserScreen({ navigation, route}) {

    const [image, setImage] = useState(undefined);
    const [profile, setProfile] = useState({
        id: "",
        name:'',
        age:'',
        description:'',
        imgPath: ''
    })
    useEffect(() => {
        getProfile();
    }
    , []);

    
    async function getProfile() {
        const user = await getDoc(doc(fs, `users/${auth.currentUser.uid}`));
        const fsProfile = await getDoc(doc(fs, `profiles/${user.data().profileId}`))
        setProfile(fsProfile.data());
        setImage(profile.imgUrl || "");
    }

    async function handleSave() {
        await updateDoc(doc(fs, "profiles", profile.id), profile)
    }

    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
            
          if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            const fileName = `${new Date().valueOf()}-image.jpg`;
            const imgPath = `${auth.currentUser.uid}/uploads/${fileName}`;
            const url = await uploadImageAsync(imageUri, imgPath);
            setImage(url);
            setProfile({...profile, imgPath, imgUrl: url });
          } else {
            alert('Image upload failed')
          }
    }
    

    async function uploadImageAsync(uri, path) {
        const storageRef = ref(storage, path);

        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
            resolve(xhr.response);
            };
            xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        
        await uploadBytes(storageRef, blob);

        // We're done with the blob, close and release it
        blob.close();

        return await getDownloadURL(storageRef);
    }
   

    function handleLogout(){
        signOut(auth).then(() => {
            // Sign-out successful
            console.log("Sign out")
          }).catch((error) => {
            // An error happened.
            console.log(error)
          });
    }
  
    return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center' }}>
        <Text h3> Your best friends information</Text>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Button title="Take Photo"onPress={pickImage} />
       <Input
       value={profile?.name}
       placeholder='Your Best Friends name'
       onChangeText={(value) => setProfile({...profile, name: value})}       
       leftIcon={{ type: 'font-awesome', name: 'paw' }}
       />
       <Input
       value={profile?.age}
       placeholder='Your Best Friends Age'
       onChangeText={(value) => setProfile({...profile, age: value})}       
       leftIcon={{ type: 'font-awesome', name: 'paw' }}
       />
       <Input
       value={profile?.description}
       placeholder='Describe your pet'
       onChangeText={(value) => setProfile({...profile, description: value})}       
       leftIcon={{ type: 'font-awesome', name: 'paw' }}
       />

            <Button title="Save" onPress={handleSave}></Button>
            <></>
            <></>
            <Button title="Logout" onPress={handleLogout}></Button>
        </View> 
         )}