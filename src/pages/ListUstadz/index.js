import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Header, RatedUstadz} from '../../components';
import {colors, showError} from '../../utils';
import {Fire} from '../../config';

const ListUstadz = ({navigation}) => {
  const [ustadz, setUstadz] = useState([]);
  
  useEffect(() => {
    getTopRatedUstadz();
  }, []);

  const getTopRatedUstadz = () => {
    Fire.database()
      .ref('guru/')
      .orderByChild('rate')
      .once('value')
      .then((res) => {
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map((key) => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          setUstadz(data);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };
  return (
    <View style={styles.page}>
      <Header title="Ustadz/Ustadzah" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.coloumn}>
          {ustadz.map((guru) => {
            return (
              <RatedUstadz
                key={guru.id}
                name={guru.data.fullName}
                desc={guru.data.guru}
                university={guru.data.university}
                avatar={{uri: guru.data.photo}}
                onPress={() => navigation.navigate('UstadzProfile', guru)}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default ListUstadz;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  coloumn: {
    marginHorizontal: 20,
  },
});
