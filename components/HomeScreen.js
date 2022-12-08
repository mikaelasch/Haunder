import { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Image } from '@rneui/base';
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
            <Text>Here you can find friends</Text>
            {
                profiles.map((profile, i) => {
                    console.log(profile);
                    return (<View key={i}>
                        <Image source={{ uri: profile.imgUrl }}></Image>
                        <Button key={profile.userId} title={profile.name} onPress={() => navigation.navigate('Profile', { profileId: profile.id })}></Button>
                        </View>)
                    
            })
            }
            
            <Button title="User" onPress={()=> navigation.navigate('User')}></Button>
        </View> 
         );}