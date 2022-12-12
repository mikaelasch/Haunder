import { View ,  StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { fs } from '../firebaseConfig';
import { getDoc, doc } from 'firebase/firestore'
import { Avatar, Button, Text } from '@rneui/themed';


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
        <View style={styles.container}>
            <View style={styles.content}>
            <Text h1>{profile.name}</Text>
            <Avatar size={200}
                    rounded
                    source={{ uri: profile.imgUrl }}></Avatar>
            <Text style={styles.text} > Gender: {profile.gender}</Text>
            <Text style={styles.text}>Age : {profile.age}</Text>
            <Text style={styles.text}>Race : {profile.race}</Text>
            <Text style={styles.text}>About me :  </Text>
            <Text style={styles.text}>{profile.description}</Text>
            <Button title="Chat" type="outlined" onPress={()=> navigation.navigate('Chat', { profileId: route.params.profileId })}></Button>
        </View>
        </View> 
         )}

         const styles = StyleSheet.create({
            container: {
                flex:1,
                justifyContent:'center'
            }, 
            content: {
                alignItems:'center'
            },
            text:{
                color: "grey",
                marginHorizontal:25
               
            }
         })