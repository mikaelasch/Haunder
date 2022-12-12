import { useEffect, useState } from 'react';
import { View } from 'react-native'
import { Input, Button, Text } from '@rneui/themed';
import { auth, fs } from '../firebaseConfig';
import { setDoc, collection, onSnapshot, query, doc } from 'firebase/firestore';

export default function ChatScreen({ navigation, route }) {

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState(null);


    useEffect(() => {
        watchMessages()
    }, [])

    function watchMessages() {
        onSnapshot(query(collection(fs, "messages")), (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((item) => {
                items.push(item.data());
            });
            setMessages(items);
        });
    }

    async function submit() {
        const ref = doc(collection(fs, "messsages"));
        await setDoc(doc(fs, "messages", ref.id), {
            id: ref.id,
            content: message,
            sender: auth.currentUser.email,
            senderId: auth.currentUser.uid,
            receiverId: route.params.profileId,
        })
    }

    return (
        <>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {
                messages.map((message, i) => {
                    return (<View key={message.id}>
                    <Text h3>{message.sender}</Text>
                    <Text h4>{message.content}</Text>
                    </View>)

                })
            }
        </View>
        <View>
            
            <Input onChangeText={(value) => setMessage(value)} placeholder='Message'></Input>
            <Button title="Send" onPress={() => submit()}></Button>
        </View>
        </>
    );
}