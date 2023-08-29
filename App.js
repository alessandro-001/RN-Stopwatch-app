import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default function App() {
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [resetTimer, setResetTimer] = useState(false);

  useEffect(() => {
    let interval;
    if (isTimerStart) {
      setStartTime(Date.now() - elapsedTime);
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10); // Update every 10 milliseconds
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isTimerStart]);

  const handleToggleTimer = () => {
    if (!isTimerStart) {
      setStartTime(Date.now() - elapsedTime);
    }
    setIsTimerStart(!isTimerStart);
  };

  const handleResetTimer = () => {
    setIsTimerStart(false);
    setElapsedTime(0);
    setResetTimer(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Stopwatch app</Text>
      </View>
      <View style={styles.sectionStyle}>
        <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>
        <TouchableHighlight onPress={handleToggleTimer}>
          <Text style={styles.buttonText}>{!isTimerStart ? 'START' : 'STOP'}</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={handleResetTimer}>
          <Text style={styles.buttonText}>RESET</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const formatTime = milliseconds => {
  const totalMilliseconds = Math.floor(milliseconds);
  const minutes = Math.floor(totalMilliseconds / 60000);
  const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
  const ms = totalMilliseconds % 1000;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  sectionStyle: {
    flex: 1,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 40,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
  },
});
