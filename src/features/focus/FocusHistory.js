import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';

//COMPONENTS
import { RoundButton } from '../../components/RoundButton';

//UTILS
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';


const HistoryItem = ({ item, index }) => {
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={styles.safeView}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we have focused on</Text>
            <FlatList
              style={styles.list}
              contentContainerStyle={styles.contentContainer}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundButton title="clear" size={75} onPress={() => onClear()} />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: fontSizes.md,
  }),
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
  },
  safeView: {
    flex: 0.5,
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
});
