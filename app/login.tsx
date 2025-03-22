import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
  const loginAction = () => {
    if (email && password ){
        console.log(email + " " + password);
        router.replace("/(playertabs)/player-frontpage");
    } else {
        Alert.alert('Please fill out both email and password')
    }
  };
  
  const registerAction = () => {
    router.replace("/register");
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Login</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.loginInput}
            placeholder="Email"
            placeholderTextColor="#95a5a6"
            value={ email }
            onChangeText={ setEmail }
          />
          
          <TextInput 
            style={styles.loginInput}
            placeholder="Password"
            placeholderTextColor="#95a5a6"
            secureTextEntry={true}
            value={ password }
            onChangeText={setPassword}
          />
        </View>
        
        <TouchableOpacity onPress={loginAction} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={registerAction} style={styles.registerLink}>
          <Text style={styles.registerText}>Register here!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginInput: {
    borderWidth: 1,
    textAlign: 'center',
    maxWidth: '75%',
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  loginButton: {
    borderRadius: 25,
    borderWidth: 1,
    maxWidth: '75%',
    width: '75%',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    padding: 15,
    marginBottom: 20,
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  registerLink: {
    marginTop: 10,
  },
  registerText: {
    color: '#3498db',
    fontSize: 16,
    textDecorationLine: 'underline',
  }
});