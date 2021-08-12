import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

//COMPONENTS
import { Countdown } from '../../components/Countdown';
import { RoundButton } from '../../components/RoundButton';

//TIMER
import { Timing } from './Timing';

//UTILS
import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  
  const [minutes, setMinutes] =useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  }

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted} 
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={styles.focusContainer}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.progress}>
        <ProgressBar
          progress={progress}
          color={colors.progressBar} 
          style={{ height: 15 }} 
        />
      <View style={styles.buttonwrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      </View>
      <View style={styles.buttonwrapper}>
        {isStarted ? (
          <RoundButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundButton title="start" onPress={() => setIsStarted(true)} />
        )}
        
      </View>
      <View style={styles.clearSubject}>
        <RoundButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  focusContainer: {
    paddingTop: spacing.xxl,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonwrapper: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  progress: {
    paddingTop: spacing.md
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25
  }
});
