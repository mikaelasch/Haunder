import { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { fs } from './firebase-config'
import { collection, query, onSnapshot } from 'firebase/firestore';
import { ListItem } from '@rneui/themed'

export default function HomeScreen({ navigation }) {

    const [profiles, setProfiles] = useState([]); 

    useEffect(() => {
        getProfiles()
    }, [])

    function getProfiles() {
        onSnapshot(query(collection(fs, "profiles")), (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setProfiles(items);
          });
    }
    
    
    return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Here you can find friends</Text>
            {
                profiles.map((profile, i) => (
                <Button key={profile.id} title={profile.name} onPress={() => navigation.navigate('Profile', { profileId: profile.id })}></Button>
                ))
            }
            <Button title="Chat" onPress={()=> navigation.navigate('Chat')}></Button>
            <Button title="Create User" onPress={()=> navigation.navigate('Create user')}></Button>
        </View> 
         );}