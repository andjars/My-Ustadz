import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Gap, Header, Input, Loading} from '../../components';
import {Fire} from '../../config';
import {colors, storeData, useForm} from '../../utils';
import messaging from '@react-native-firebase/messaging';

const Register = ({navigation}) => {
  const [form, setForm] = useForm({
    fullName: '',
    kelas: '',
    gender: 'pria',
    email: '',
    password: '',
  });
  const [getToken, setGetToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [itemGender] = useState([
    {
      id: 1,
      label: 'Pria',
      value: 'pria',
    },
    {
      id: 2,
      label: 'Wanita',
      value: 'wanita',
    },
  ]);

  const onContinue = () => {
    setLoading(true);
    Fire.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((success) => {
        setLoading(false);
        setForm('reset');
        const data = {
          fullName: form.fullName,
          kelas: form.kelas,
          email: form.email,
          uid: success.user.uid,
          gender: form.gender,
          token: getToken,
        };
        Fire.database()
          .ref(`users/${success.user.uid}/`)
          .set(data);

        storeData('user', data);
        navigation.navigate('UploadPhoto', data);
      })
      .catch((error) => {
        var errorMessage = error.message;
        setLoading(false);
        showMessage({
          message: errorMessage,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      });
  };

  useEffect(() => {
    messaging()
      .requestPermission()
      .then((authStatus) => {
        if (
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          // eslint-disable-next-line eqeqeq
          authStatus == messaging.AuthorizationStatus.PROVISIONAL
        ) {
          messaging()
            .getToken()
            .then((token) => {
              console.log('message.getToken ', token);
              setGetToken(token);
            });

          messaging().onTokenRefresh((token) => {
            console.log('messaging.onTokenRefresh: ', token);
          });
        }
      });
  }, []);

  return (
    <>
      <View style={styles.page}>
        <Header onPress={() => navigation.goBack()} title="Daftar Akun" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
              <Input
                label="Full Name"
                value={form.fullName}
                onChangeText={(value) => setForm('fullName', value)}
              />
              <Gap height={24} />
              <Input
                label="Kelas"
                value={form.kelas}
                onChangeText={(value) => setForm('kelas', value)}
              />
              <Gap height={24} />
              <Input
                label="Jenis Kelamin"
                value={form.gender}
                onValueChange={value => setForm('gender', value)}
                select
                selectItem={itemGender}
              />
              <Gap height={24} />
              <Input
                label="Email"
                value={form.email}
                onChangeText={(value) => setForm('email', value)}
              />
              <Gap height={24} />
              <Input
                label="Password"
                value={form.password}
                onChangeText={(value) => setForm('password', value)}
                secureTextEntry
              />
              <Gap height={40} />
              <Button title="Continue" onPress={onContinue} />
          </View>
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  content: {padding: 40, paddingTop: 0},
  page: {backgroundColor: colors.white, flex: 1},
});
