import React from 'react';
import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {
  ILCatUmum,
  ILCatPsikiater,
  ILCatObat,
  ILDhuha,
  ILTaubat,
  ILTahajud,
  ILIstikharah,
} from '../../../assets';
import {colors, fonts} from '../../../utils';

const UstadzCategory = ({category, doa, image, onPress}) => {
  const Icon = () => {
    if (category === 'Dhuha') {
      return <ILDhuha style={styles.illustration} />;
    }
    if (category === 'Taubat') {
      return <ILTaubat style={styles.illustration} />;
    }
    if (category === 'Tahajud') {
      return <ILTahajud style={styles.illustration} />;
    }
    if (category === 'Istikharah') {
      return <ILIstikharah style={styles.illustration} />;
    }
    return <ILCatUmum style={styles.illustration} />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* <Icon /> */}
      <Icon source={category} />
      <Text style={styles.label}>Doa Shalat</Text>
      {/* <Text style={styles.category}>{category}</Text> */}
      <Text style={styles.category}>{doa}</Text>
    </TouchableOpacity>
  );
};

export default UstadzCategory;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colors.cardLight,
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginRight: 10,
    width: 100,
    height: 130,
  },
  illustration: {marginBottom: 28},
  label: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.primary,
  },
  category: {
    fontSize: 12,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
});
