import React, { useState } from "react";
import { 
  View, 
  Text, 
  Modal, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  SafeAreaView,
  ScrollView,
  StatusBar 
} from "react-native";
import DatePicker from "react-native-modern-datepicker";

// Define Activity type for TypeScript
interface Activity {
  id: string;
  date: string;
  name: string;
  type: string;
  duration: string;
}

export default function PlayerCalendarPage() {
  const today = new Date();
  const formattedToday = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
  
  const [date, setDate] = useState<string>(formattedToday);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activityName, setActivityName] = useState<string>("");
  const [activityType, setActivityType] = useState<string>("Training");
  const [activityDuration, setActivityDuration] = useState<string>("");
  const [activities, setActivities] = useState<Activity[]>([]);

  function handleDate(propDate: string) {
    setDate(propDate);
  }

  function addActivity() {
    if (!activityName.trim()) {
      alert("Please enter an activity name");
      return;
    }
    
    if (!activityDuration.trim()) {
      alert("Please enter activity duration");
      return;
    }
    
    const newActivity: Activity = {
      id: Date.now().toString(),
      date: date,
      name: activityName,
      type: activityType,
      duration: activityDuration
    };
    
    setActivities([...activities, newActivity]);
    setActivityName("");
    setActivityDuration("");
    setShowModal(false);
  }
  
  function openAddActivityModal() {
    setShowModal(true);
  }
  
  function getActivitiesForSelectedDate(): Activity[] {
    return activities.filter(activity => activity.date === date);
  }
  
  function deleteActivity(id: string) {
    setActivities(activities.filter(activity => activity.id !== id));
  }
  
  const activityTypeOptions = ["Training", "Match", "Recovery", "Medical", "Other"];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calendar</Text>
      </View>
      
      <View style={styles.calendarContainer}>
        <DatePicker
          mode="calendar"
          selected={date}
          onDateChange={handleDate}
          options={{
            backgroundColor: '#2c3e50',
            textHeaderColor: '#3498db',
            textDefaultColor: '#ffffff',
            selectedTextColor: '#ffffff',
            mainColor: '#3498db',
            textSecondaryColor: '#d6dee4',
            borderColor: 'rgba(255, 255, 255, 0.2)',
          }}
        />
      </View>
      
      <View style={styles.activitiesSection}>
        <View style={styles.activitiesHeader}>
          <Text style={styles.activitiesTitle}>Activities</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={openAddActivityModal}
          >
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.activitiesList}>
          {getActivitiesForSelectedDate().length > 0 ? (
            getActivitiesForSelectedDate().map((activity: Activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityName}>{activity.name}</Text>
                  <View style={styles.activityMeta}>
                    <View style={[styles.activityType, 
                      activity.type === "Training" ? styles.trainingType :
                      activity.type === "Match" ? styles.matchType :
                      activity.type === "Recovery" ? styles.recoveryType :
                      activity.type === "Medical" ? styles.medicalType :
                      styles.otherType
                    ]}>
                      <Text style={styles.activityTypeText}>{activity.type}</Text>
                    </View>
                    <Text style={styles.activityDuration}>{activity.duration} min</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  onPress={() => deleteActivity(activity.id)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No activities for this date</Text>
              <Text style={styles.emptyStateSubtext}>Tap '+ Add' to schedule an activity</Text>
            </View>
          )}
        </ScrollView>
      </View>
      
      {/* Add Activity Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add Activity</Text>
            <Text style={styles.dateText}>Date: {date}</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Activity Name</Text>
              <TextInput
                style={styles.input}
                value={activityName}
                onChangeText={setActivityName}
                placeholder="Enter activity name"
                placeholderTextColor="#aaa"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Activity Type</Text>
              <View style={styles.typeOptions}>
                {activityTypeOptions.map(type => (
                  <TouchableOpacity 
                    key={type}
                    style={[
                      styles.typeOption,
                      activityType === type && styles.selectedTypeOption
                    ]}
                    onPress={() => setActivityType(type)}
                  >
                    <Text 
                      style={[
                        styles.typeOptionText,
                        activityType === type && styles.selectedTypeOptionText
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Duration (minutes)</Text>
              <TextInput
                style={styles.input}
                value={activityDuration}
                onChangeText={setActivityDuration}
                placeholder="Enter duration in minutes"
                placeholderTextColor="#aaa"
                keyboardType="number-pad"
              />
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.saveButton}
                onPress={addActivity}
              >
                <Text style={styles.saveButtonText}>Save Activity</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  calendarContainer: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  activitiesSection: {
    flex: 1,
    margin: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  activitiesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  activitiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  addButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  activitiesList: {
    flex: 1,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 6,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  trainingType: {
    backgroundColor: '#3498db',
  },
  matchType: {
    backgroundColor: '#e74c3c',
  },
  recoveryType: {
    backgroundColor: '#2ecc71',
  },
  medicalType: {
    backgroundColor: '#f39c12',
  },
  otherType: {
    backgroundColor: '#9b59b6',
  },
  activityTypeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  activityDuration: {
    color: '#bdc3c7',
    fontSize: 14,
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(231, 76, 60, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#e74c3c',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyState: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    color: '#bdc3c7',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    width: '90%',
    backgroundColor: '#34495e',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#3498db',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#bdc3c7',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    color: '#ffffff',
    fontSize: 16,
  },
  typeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  typeOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    margin: 4,
  },
  selectedTypeOption: {
    backgroundColor: '#3498db',
  },
  typeOptionText: {
    color: '#ffffff',
    fontSize: 14,
  },
  selectedTypeOptionText: {
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#e74c3c',
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    backgroundColor: '#3498db',
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});