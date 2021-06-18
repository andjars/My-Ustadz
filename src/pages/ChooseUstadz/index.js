import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, List} from '../../components';
import {DummyUstadz2} from '../../assets';
import {colors} from '../../utils';

const ChooseUstadz = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        type="dark"
        title="Pilih Ustadz"
        onPress={() => navigation.goBack()}
      />
      <List
        type="next"
        profile={DummyUstadz2}
        name="Muhammad Yasir"
        desc="Laki-laki"
        onPress={() => navigation.navigate('Chatting')}
      />
      <List
        type="next"
        profile={DummyUstadz2}
        name="Muhammad Yasir"
        desc="Laki-laki"
      />
      <List
        type="next"
        profile={DummyUstadz2}
        name="Muhammad Yasir"
        desc="Laki-laki"
      />
      <List
        type="next"
        profile={DummyUstadz2}
        name="Muhammad Yasir"
        desc="Laki-laki"
      />
      <List
        type="next"
        profile={DummyUstadz2}
        name="Muhammad Yasir"
        desc="Laki-laki"
      />
    </View>
  );
};

export default ChooseUstadz;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
});
