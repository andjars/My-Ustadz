import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, Profile, Input, Button, Gap} from '../../components';
import {colors, getData, showSuccess, storeData} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import {Fire} from '../../config';
import {showMessage} from 'react-native-flash-message';
import ImagePicker from 'react-native-image-picker';
import {ILNullPhoto} from '../../assets';
import { useDispatch } from 'react-redux';

const UpdateProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    fullName: '',
    kelas: '',
    email: '',
  });
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);

  useEffect(() => {
    getData('user').then((res) => {
      const data = res;
      setPhoto({uri: res.photo});
      setProfile(data);
    });
  }, []);

  const update = () => {
    if (password.length > 0) {
      if (password.length < 6) {
        showMessage({
          message: 'Password kurang dari 6 karakter',
          type: 'default',
          backgroundColor: colors.error,
          color: 'white',
        });
      } else {
        //update password
        updatePassword();
        updateProfileData();
      }
    } else {
      updateProfileData();
    }
  };

  const updatePassword = () => {
    Fire.auth().onAuthStateChanged((user) => {
      if (user) {
        user
        .updatePassword(password)
          .then(() => {
          console.log('update password')
          showSuccess('Your password has been changed successfully');
          navigation.replace('MainApp');
        })
        .catch((err) => {
          showMessage({
            message: err.message,
            type: 'default',
            backgroundColor: colors.error,
            color: 'white',
          });
        });
      }
    });
  };

  const updateProfileData = () => {
    dispatch({type: 'SET_LOADING', value: true});
    const data = profile;
    Fire.database()
      .ref(`users/${profile.uid}/`)
      .update(data)
      .then(() => {
        storeData('user', data);
        setTimeout(() => {
          dispatch({type: 'SET_LOADING', value: false});
          navigation.replace('MainApp');
        }, 3000);
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

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  const getImage = () => {
    ImagePicker.launchImageLibrary(
      {quality: 0.5, maxWidth: 200, maxHeight: 200},
      (response) => {
        // Same code as in above section!
        if (response.didCancel || response.error) {
          showMessage({
            message: err.message,
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        } else {
          const uploadFile = `data:${response.type};base64, ${response.data}`;
          const source = {uri: response.uri};
          setPhoto(source);
          // save photo direct to firebase after user select photo from the gallery
          dispatch({type: 'SET_LOADING', value: true});
          setTimeout(async () => {
            await Fire.database()
              // root users (table name)
              // success.user.uid to save data with the registered uid user
              .ref(`users/${profile.uid}/`)
              // save data to firebase
              .update({photo: uploadFile});

            // store data to localstorage
            const data = profile;
            data.photo = uploadFile;
            storeData('user', data);

            dispatch({type: 'SET_LOADING', value: false});
            navigation.replace('MainApp');
          }, 3000);
        }
      },
    );
  };
  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove photo={photo} onPress={getImage} />
          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={(value) => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.kelas}
            onChangeText={(value) => changeText('kelas', value)}
          />
          <Gap height={24} />
          <Input label="Email" value={profile.email} disable />
          <Gap height={24} />
          <Input
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <Gap height={40} />
          <Button title="Save Profile" onPress={update} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
  content: {padding: 40, paddingTop: 0},
});
