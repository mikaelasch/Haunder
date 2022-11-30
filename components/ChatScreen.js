import { useEffect, useState } from 'react';
import { View } from 'react-native'
import { Input, Button, Text } from '@rneui/themed';
import { fs } from './firebase-config';
import { setDoc, collection, onSnapshot, query, doc } from 'firebase/firestore';

export default function ChatScreen({ navigation }) {

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
        console.log("submit")
        const ref = doc(collection(fs, "messsages"));
        await setDoc(doc(fs, "messages", ref.id), {
            id: ref.id,
            content: message,
            sender: "Minä vaan",
            senderId: "TODO",
            receiverId: "TODO",
            receiver: "Sinä vaan"
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
            
            <Input onChangeText={(value) => setMessage(value)} placeholder='Viesti'></Input>
            <Button title="Lähetä" onPress={() => submit()}></Button>
        </View>
        </>
    );
}