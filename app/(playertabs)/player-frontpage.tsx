import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';

const Homepage = () => {
  const router = useRouter()

  const calenderAction = () => {
    router.replace("/(playertabs)/player-calender");
  }
  const profileAction = () => {
    router.replace("/(playertabs)/player-profile");
  }

  const [userName] = useState('Malthe');
  const [weeklyAverage] = useState(5.8);
  const [loadStatus] = useState('OPTIMAL');
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'LOW':
        return '#4facfe';
      case 'OPTIMAL':
        return '#43e97b';
      case 'HIGH':
        return '#fa709a';
      case 'CRITICAL':
        return '#f43b47';
      default:
        return '#43e97b';
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back, {userName}</Text>
        <TouchableOpacity onPress = {profileAction} style={styles.profileButton}>
          <Text style={styles.profileButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.mainContent}>
        {/* Load Card */}
        <View style={styles.loadCard}>
          <Text style={styles.loadCardTitle}>This Week's Average Load</Text>
          
          <View style={styles.loadDisplay}>
            <View 
              style={[
                styles.loadCircle, 
                { backgroundColor: getStatusColor(loadStatus) }
              ]}
            >
              <Text style={styles.loadValue}>{weeklyAverage}</Text>
              <Text style={styles.loadUnit}>RPE</Text>
            </View>
          </View>
          
          <View style={styles.loadStatus}>
            <Text style={styles.loadStatusText}>
              Status: <Text style={styles.loadStatusValue}>{loadStatus}</Text>
            </Text>
          </View>
        </View>
        
        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity onPress={calenderAction} style={styles.actionButton}>
              <Text style={styles.actionSymbol}>+</Text>
              <Text style={styles.actionText}>Log Activity</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress = {profileAction} style={styles.actionButton}>
              <Text style={styles.actionSymbol}>📊</Text>
              <Text style={styles.actionText}>View Stats</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionSymbol}>💬</Text>
              <Text style={styles.actionText}>Messages</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  profileButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    padding: 50
  },
  loadCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  loadCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  loadDisplay: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loadCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  loadValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loadUnit: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
  },
  loadStatus: {
    alignItems: 'center',
  },
  loadStatusText: {
    fontSize: 16,
    color: '#ffffff',
  },
  loadStatusValue: {
    fontWeight: 'bold',
  },
  quickActionsContainer: {
    marginTop: 30,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 15,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionSymbol: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 5,
  },
  actionText: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Homepage;