import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';

// پێناسا جۆرێ نامێ
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'سلاڤ! ئەز دشێم چەوا هاریکاریا تە بکەم؟', sender: 'ai' }
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim() === '') return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
    };

    setMessages([...messages, newUserMsg]);
    setInputText('');

    // لێرە تو دشێی ب رێکا API بەرسڤا AI وەربگری
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'ئەز ل سەر ڤێ چەندێ کار دکەم...',
        sender: 'ai',
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageBubble, 
      item.sender === 'user' ? styles.userBubble : styles.aiBubble
    ]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI CHAT</Text>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatList}
      />

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="نامەکێ بنڤێسە..."
            placeholderTextColor="#888"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>ناردن</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f', // پاشبنەمایێ ڕەشێ تاریک
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    color: '#00d4ff', // شینێ نیۆن
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  chatList: {
    padding: 15,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#00d4ff',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#262626',
    borderWidth: 1,
    borderColor: '#444',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#262626',
    color: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 45,
    marginRight: 10,
    textAlign: 'right',
  },
  sendButton: {
    backgroundColor: '#00d4ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
