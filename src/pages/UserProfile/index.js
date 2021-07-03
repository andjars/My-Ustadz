import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Header, Profile, List, Gap} from '../../components';
import {colors, getData} from '../../utils';
import {ILNullPhoto} from '../../assets';
import {Fire} from '../../config';
import {showMessage} from 'react-native-flash-message';

const UserProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    kelas: '',
    photo: ILNullPhoto,
  });

  useEffect(() => {
    getData('user').then((res) => {
      const data = res;
      data.photo = {uri: res.photo};
      setProfile(data);
    });
  }, []);

  const signOut = () => {
    Fire.auth()
      .signOut()
      .then(() => {
        navigation.replace('GetStarted');
      })
      .catch((err) => {
        showMessage({
          message: err.message,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView>
          <Header title="Profile" onPress={() => navigation.goBack()} />
          <Gap height={10} />
          {profile.fullName.length > 0 && (
            <Profile
              name={profile.fullName}
              desc={profile.kelas}
              photo={profile.photo}
            />
          )}
          <Gap height={14} />
          <List
            name="Edit Profile"
            desc="Last Update Yesterday"
            type="next"
            icon="edit-profile"
            onPress={() => navigation.navigate('UpdateProfile')}
          />
          <List
            name="About Us"
            desc="Last Update Yesterday"
            type="next"
            icon="language"
            onPress={() => navigation.navigate('AboutUs')}
          />
          <List
            name="Give Us Rate"
            desc="Last Update Yesterday"
            type="next"
            icon="rate"
          />
          <List
            name="Sign Out"
            desc="Last Update Yesterday"
            type="next"
            icon="help"
            onPress={signOut}
          />
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
