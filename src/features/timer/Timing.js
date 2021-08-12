import React from "react";
import { View, StyleSheet } from "react-native";
import { RoundButton } from "../../components/RoundButton";

export const Timing = ({ onChangeTime }) => {
  return (
    <>
      <View style={styles.timingButton}>
        <RoundButton size={75} title="10" onPress={() => onChangeTime(10)} />
      </View>
      <View style={styles.timingButton}>
        <RoundButton size={75} title="15" onPress={() => onChangeTime(15)} />
      </View>
      <View style={styles.timingButton}>
        <RoundButton size={75} title="20" onPress={() => onChangeTime(20)} />
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignItems: 'center'
  }
});