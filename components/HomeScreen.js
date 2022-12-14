import { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet} from 'react-native';
import { Avatar, Header , Icon, Chip, Typography} from '@rneui/themed';
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

    const listSeparator = () => {
        return (
          <View
            style={{
              height: 5,
              width: "80%",
              backgroundColor: "#fff",
              marginLeft: "10%"
            }}
          />
        );
      };
  
      
    
    
  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
      <View style={{ justifyContent: 'center' }} >
        <Header
          centerComponent={{ text: 'HAUNDER', style: { color: '#fff' } }}
          containerStyle={{
            backgroundColor: '#9CAF88',
            justifyContent: 'space-around',
          }}>
          <Icon
            raised
            name='paw'
            type='font-awesome'
            color='black'
            onPress={() => navigation.navigate('User')} />

        </Header>
      </View>
      <FlatList
        key={item => item.id}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <View style={styles.userlist} >
            <Avatar size={150}
              rounded
              source={{ uri: item.imgUrl }}></Avatar>
            <View style={styles.userinfo}>
              <Text style={styles.userName}> {item.name}, {item.age} </Text>
              <Text style={styles.userGender}>   {item.gender} </Text>
              <Icon
                raised
                name='heart'
                type='font-awesome'
                color='red'
                key={item.id}
                onPress={() => navigation.navigate('Profile', { profileId: item.id })}
              />
            </View>
          </View>}
        ItemSeparatorComponent={listSeparator}
        data={profiles} />



    </View>
  );
}

         const styles = StyleSheet.create({
            userlist: {
                flex:1 ,
                flexDirection:'row'
            },
            userinfo: {
                flexDirection:'column',
                justifyContent:'space-around',
                
            }, 
            userName:{
                fontSize:20
            }, 
            userGender:{
                fontSize:13

            },
            header:{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
                marginBottom: 20,
                width: '100%',
                paddingVertical: 15,
                
                

            }


         })