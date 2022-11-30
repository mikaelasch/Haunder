import { View , Text } from 'react-native';
import { useState, useEffect } from 'react';
import { fs } from './firebase-config';
import { getDoc, doc } from 'firebase/firestore'


export default function ProfileScreen({ navigation, route }) {


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
            <Text>Profile</Text>
            <Text>{profile.name}</Text>
            
        </View> 
         )}