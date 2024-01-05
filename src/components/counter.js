import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import PushNotification from 'react-native-push-notification';


const CountdownApp = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daysRemaining, setDaysRemaining] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState('');

  useEffect(() => {
    calculateDaysRemaining();
  }, [selectedDate]);

  const calculateDaysRemaining = () => {
    if (!selectedDate) {
      setDaysRemaining(null);
      return;
    }

    const currentDate = new Date();
    const timeDifference = selectedDate.getTime() - currentDate.getTime();
    const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    setDaysRemaining(days);
    scheduleNotification(days);
  };

  const resetCountdown = () => {
    setSelectedDate(new Date());
    setDaysRemaining(null);
    cancelNotification();
    setNotificationStatus('Countdown reset');
  };

  const scheduleNotification = (daysRemaining) => {
    if (daysRemaining > 0) {
      PushNotification.localNotificationSchedule({
        message: `Only ${daysRemaining} days left until the event!`,
        date: new Date(Date.now() + daysRemaining * 24 * 60 * 60 * 1000),
      });

      setNotificationStatus(`Notification scheduled for ${selectedDate}`);
    } else {
      setNotificationStatus('No upcoming event');
    }
  };

  const cancelNotification = () => {
    PushNotification.cancelAllLocalNotifications();
    setNotificationStatus('Notification canceled');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Countdown App</Text>
      <DatePicker
        style={styles.datePicker}
        date={selectedDate}
        mode="date"
        placeholder="Select date"
        format="YYYY-MM-DD"
        minDate={new Date()}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => setSelectedDate(date)}
      />
      {daysRemaining !== null && (
        <Text style={styles.countdownText}>
          {daysRemaining === 0 ? 'Today is the day!' : `Days remaining: ${daysRemaining}`}
        </Text>
      )}
      <Text style={styles.notificationStatus}>{notificationStatus}</Text>
      <TouchableOpacity style={styles.button} onPress={resetCountdown}>
        <Text style={styles.buttonText}>Reset Countdown</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  datePicker: {
    width: 700,
    height: 400,
    marginBottom: 20,
  },
  countdownText: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  notificationStatus: {
    marginTop: 10,
    fontSize: 14,
    color: 'green', 
  },
});

export default CountdownApp;
