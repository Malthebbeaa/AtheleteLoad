import { useRouter } from "expo-router";
import { 
  SafeAreaView, 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
  Alert
} from "react-native";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPlayer, setIsPlayer] = useState(true);
  
  // For date picker
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || birthday;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthday(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const registerUser = () => {
    if(fullName && username && birthday && mobileNumber && isPlayer && password) {
        // Here you would implement your registration logic
        console.log({
            fullName,
            username,
            birthday,
            mobileNumber,
            userType: isPlayer ? 'Player' : 'Coach',
            password
        });
      
        // Navigate back to login page after registration
        router.replace("/");
    } else {
        Alert.alert("Please fill out all fields, before creating account")
    }
    
  };

  const goToLogin = () => {
    router.replace("/");
  };

  const formatDate = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Register Account</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#95a5a6"
              value={fullName}
              onChangeText={setFullName}
            />
            
            <TextInput 
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#95a5a6"
              value={username}
              onChangeText={setUsername}
            />
            
            <TouchableOpacity 
              style={styles.dateInput} 
              onPress={showDatepicker}
            >
              <Text style={styles.dateText}>
                {birthday ? `Birthday: ${formatDate(birthday)}` : "Select Birthday"}
              </Text>
            </TouchableOpacity>
            
            {showDatePicker && (
              <DateTimePicker
                value={birthday}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
            
            <TextInput 
              style={styles.input}
              placeholder="Mobile Number"
              placeholderTextColor="#95a5a6"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
            
            <View style={styles.roleContainer}>
              <View style={styles.roleToggle}>
                <Text style={[styles.roleOption, isPlayer ? styles.activeRole : {}]}>Player</Text>
                <Switch
                  value={!isPlayer}
                  onValueChange={value => setIsPlayer(!value)}
                  trackColor={{ false: "#3498db", true: "#e74c3c" }}
                  thumbColor="#f4f3f4"
                />
                <Text style={[styles.roleOption, !isPlayer ? styles.activeRole : {}]}>Coach</Text>
              </View>
            </View>
            
            <TextInput 
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#95a5a6"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            
            <TextInput 
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#95a5a6"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          
          <TouchableOpacity style={styles.registerButton} onPress={registerUser}>
            <Text style={styles.registerButtonText}>Create Account</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.loginLink} onPress={goToLogin}>
            <Text style={styles.loginText}>Already have an account? Login here</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  scrollContainer: {
    flex: 1,
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
    padding: 20,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    textAlign: 'center',
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
  },
  dateInput: {
    borderWidth: 1,
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  roleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  roleText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  roleToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  roleOption: {
    marginHorizontal: 10,
    fontSize: 16,
    color: 'white',
    opacity: 0.7,
  },
  activeRole: {
    fontWeight: 'bold',
    opacity: 1,
  },
  registerButton: {
    borderRadius: 25,
    borderWidth: 1,
    width: '75%',
    justifyContent: 'center',
    backgroundColor: '#e74c3c',
    padding: 15,
    marginBottom: 20,
  },
  registerButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  loginLink: {
    marginTop: 10,
  },
  loginText: {
    color: '#3498db',
    fontSize: 16,
    textDecorationLine: 'underline',
  }
});