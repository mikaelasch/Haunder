import { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Avatar } from '@rneui/themed';
import { fs } from '../firebaseConfig'
import { collection, query, onSnapshot } from 'firebase/firestore';

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
            {
                profiles.map((profile, i) => {
                    return (
                    <View key={i} style={{flex:0.2, flexDirection:"row", justifyContent:'center'}}>
                        <Avatar size={100}
                                rounded
                                source={{ uri: profile.imgUrl }}></Avatar>
                        <Button key={profile.id} title={profile.name} onPress={() => navigation.navigate('Profile', { profileId: profile.id })}></Button>
                        </View>)
                    
            })
            }
            
            <Button title="User" onPress={()=> navigation.navigate('User')}></Button>
        </View> 
         );}