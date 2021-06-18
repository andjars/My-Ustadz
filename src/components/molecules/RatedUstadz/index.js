import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {IconStar} from '../../../assets';
import {fonts, colors} from '../../../utils';
import {TouchableOpacity} from 'react-native-gesture-handler';

const RatedUstadz = ({onPress, name, desc, university, avatar}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={avatar} style={styles.avatar} />
      <View style={styles.profile}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{university}</Text>
      </View>
      <View style={styles.rate}>
        <Text style={styles.category2}>{desc}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RatedUstadz;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    alignItems: 'center',
  },
  avatar: {width: 50, height: 50, borderRadius: 50 / 2, marginRight: 12},
  rate: {flexDirection: 'row'},
  profile: {flex: 1},
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  category: {
    fontSize: 12,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 2,
  },
  category2: {
    fontSize: 12,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
    marginTop: 2,
  },
});
