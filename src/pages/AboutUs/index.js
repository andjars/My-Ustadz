import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ILAstrobot} from '../../assets/illustration';
import {Header, Profile, List, Gap} from '../../components';
import {colors, fonts} from '../../utils';

const AboutUs = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header title="About Us" onPress={() => navigation.goBack()} />
      <Image source={ILAstrobot} style={styles.image} />
      <Text style={styles.bold}>Ustadz App</Text>
      <View style={{marginLeft: 20}}>
        <Text style={styles.title}>Version 1.1</Text>
        <Text style={styles.title}>Last update on 16 May 2021</Text>
        <Text style={styles.title}>Dibuat menggunakan bahasa React Native</Text>
      </View>
      <View />
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
  image: {width: '100%', height: 150, marginTop: 10},
  bold: {
    fontSize: 20,
    fontFamily: fonts.primary[800],
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  title: {fontSize: 16, color: colors.text.secondary, marginTop: 12},
});
