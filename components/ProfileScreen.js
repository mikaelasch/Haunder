import { View , Text, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { fs } from '../firebaseConfig';
import { getDoc, doc } from 'firebase/firestore'
import { Button } from '@rneui/base';


export default function ProfileScreen({ navigation, route}) {


    const [profile, setProfile] = useState(undefined);

    useEffect(() => {
        getProfile()
    }, [])


    async function getProfile() {
        const item = await getDoc(doc(fs, `profiles/${route.params.profileId}`));
        setProfile(item.data());
    }
    
    if (!profile) {
        return null;
    }
  
    return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center' }}>
            
            <Text>{profile.name} {profile.age} years</Text>
            <Image source={profile.imgPath}/>
            <Text>About me:{profile.description}</Text>
            <Button title="Chat" onPress={()=> navigation.navigate('Chat', { profileId: route.params.profileId })}></Button>
        </View> 
         )}