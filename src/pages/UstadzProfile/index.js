import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Gap, Header, Profile, ProfileItem} from '../../components';

const UstadzProfile = ({navigation, route}) => {
  const dataUstadz = route.params;
  return (
    <View style={styles.page}>
      <Header
        title="Ustadz/Ustadzah Profile"
        onPress={() => navigation.goBack()}
      />
      <Profile
        name={dataUstadz.data.fullName}
        desc={dataUstadz.data.guru}
        photo={{uri: dataUstadz.data.photo}}
      />
      <Gap height={10} />
      <ProfileItem label="Alumnus" value={dataUstadz.data.university} />
      <ProfileItem label="Bekerja di" value="SMA PESAT Kota Bogor" />
      <ProfileItem label="No. Id" value={dataUstadz.data.str_number} />
      <View style={styles.action}>
        <Button
          title="Start Consultation"
          onPress={() => navigation.navigate('Chatting', dataUstadz)}
        />
      </View>
    </View>
  );
};

export default UstadzProfile;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: 'white'},
  action: {paddingHorizontal: 40, paddingTop: 23},
});
