import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ILRobot} from '../../../assets';
import {colors, fonts} from '../../../utils';

const ChatBot = ({category, onPress}) => {
  const Icon = () => {
    return <ILRobot style={styles.illustration} />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.cardLight,
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
    width: 365,
    height: 130,
  },
  illustration: {width: 380, height: 130},
  label: {
    fontSize: 32,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
});
