import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import PushNotification from 'react-native-push-notification';

const CountdownApp = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [daysRemaining, setDaysRemaining] = useState(null);

  useEffect(() => {
    calculateDaysRemaining();
  }, [selectedDate]);

  const calculateDaysRemaining = () => {
    if (!selectedDate) {
      setDaysRemaining(null);
      return;
    }

    const currentDate = new Date();
    const selectedDateObject = new Date(selectedDate);

    const timeDifference = selectedDateObject.getTime() - currentDate.getTime();
    const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    setDaysRemaining(days);
  };

  const resetCountdown = () => {
    setSelectedDate('');
    setDaysRemaining(null);
    cancelNotification();
  };

  const scheduleNotification = (daysRemaining) => {
    if (daysRemaining > 0) {
      PushNotification.localNotificationSchedule({
        message: `Only ${daysRemaining} days left until the event!`,
        date: new Date(Date.now() + daysRemaining * 24 * 60 * 60 * 1000),
      });
    }
  };

  const cancelNotification = () => {
    PushNotification.cancelAllLocalNotifications();
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
        minDate={new Date().toISOString().split('T')[0]}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => setSelectedDate(date)}
      />
      {daysRemaining !== null && (
        <Text style={styles.countdownText}>
          {daysRemaining === 0 ? 'Today is the day!' : `Days remaining: ${daysRemaining}`}
        </Text>
      )}
      <TouchableOpacity style={styles.button} onPress={resetCountdown}>
        <Text style={styles.buttonText}>Reset Countdown</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (same as before)
});

export default CountdownApp;
