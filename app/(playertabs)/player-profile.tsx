import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput,
  Image,
  ScrollView,
  StatusBar,
  Alert
} from 'react-native';
import { useRouter } from "expo-router";


const ProfilePage = () => {
  const router = useRouter();
  // User profile state
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Malthe Bjerregaard',
    email: 'malthebb@gmail.com',
    age: '21',
    height: '197',
    weight: '90',
    sport: 'Basketball',
  });
  
  // Temporary state for editing
  const [editableProfile, setEditableProfile] = useState({...profile});
  
  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      // Save changes
      setProfile({...editableProfile});
      Alert.alert('Success', 'Profile updated successfully');
    } else {
      // Enter edit mode
      setEditableProfile({...profile});
    }
    setIsEditing(!isEditing);
  };
  
  // Handle profile picture change
  const changeProfilePicture = () => {
    // In a real app, this would open the image picker
    Alert.alert('Feature', 'Image picker would open here');
    // For demonstration, we'll just show this message
  };
  
  // Handle input changes
  const handleChange = (field: any, value: any) => {
    setEditableProfile({
      ...editableProfile,
      [field]: value
    });
  };
  
  // Cancel editing
  const cancelEditing = () => {
    setIsEditing(false);
    setEditableProfile({...profile});
  };
  
  // Render profile info or edit input based on mode
  const renderField = (label: string, field: string, keyboardType = 'default') => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>{label}</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editableProfile[field]}
            onChangeText={(text) => handleChange(field, text)}
            keyboardType={keyboardType}
            placeholderTextColor="#aaa"
          />
        ) : (
          <Text style={styles.fieldValue}>{profile[field]}</Text>
        )}
      </View>
    );
  };

  const logoutAction = () => {
    router.replace("/login");
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={toggleEditMode}
        >
          <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.profileImageSection}>
          <View style={styles.avatarContainer}>
            <Image 
              style={styles.avatar} 
            />
            {isEditing && (
              <TouchableOpacity 
                style={styles.changePictureButton}
                onPress={changeProfilePicture}
              >
                <Text style={styles.changePictureText}>Change</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.nameContainer}>
            {isEditing ? (
              <TextInput
                style={styles.nameInput}
                value={editableProfile.name}
                onChangeText={(text) => handleChange('name', text)}
                placeholder="Full Name"
                placeholderTextColor="#aaa"
              />
            ) : (
              <Text style={styles.profileName}>{profile.name}</Text>
            )}
          </View>
        </View>
        
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          {renderField('Email', 'email', 'email-address')}
          {renderField('Age', 'age', 'numeric')}
          {renderField('Height (cm)', 'height', 'numeric')}
          {renderField('Weight (kg)', 'weight', 'numeric')}
        </View>
        
        
        {isEditing && (
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={cancelEditing}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Load stats 📊</Text>
          
        </View>
        
        <View style={styles.footer}>
          <TouchableOpacity onPress={logoutAction} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  editButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  profileImageSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#3498db',
  },
  changePictureButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(52, 152, 219, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  changePictureText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  nameContainer: {
    marginTop: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  nameInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#3498db',
    paddingBottom: 5,
    minWidth: 200,
  },
  infoSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#bdc3c7',
    marginBottom: 5,
  },
  fieldValue: {
    fontSize: 16,
    color: '#ffffff',
  },
  input: {
    fontSize: 16,
    color: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#3498db',
    paddingVertical: 5,
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#e74c3c',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ProfilePage;