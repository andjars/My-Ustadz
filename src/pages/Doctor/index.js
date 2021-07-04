import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ILNullPhoto} from '../../assets';
import {
  ChatBot,
  Gap,
  HomeProfile,
  NewsItem,
  RatedUstadz,
  UstadzCategory,
} from '../../components';
import {Fire} from '../../config';
import {colors, fonts, getData, showError} from '../../utils';

const Doctor = ({navigation, category}) => {
  const [news, setNews] = useState([]);
  const [ustadz, setUstadz] = useState([]);
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    kelas: '',
  });

  const getDataFromUserLocal = () => {
    getData('user').then((res) => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? {uri: res.photo} : ILNullPhoto;
      setProfile(res);
    });
  };

  const getTopRatedUstadz = () => {
    Fire.database()
      .ref('guru/')
      .orderByChild('rate')
      .limitToLast(3)
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

  const getNews = () => {
    Fire.database()
      .ref('news/')
      .once('value')
      .then((res) => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter((el) => el !== null);
          setNews(filterData);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  useEffect(() => {
    getTopRatedUstadz();
    getNews();
    navigation.addListener('focus', () => {
      getDataFromUserLocal();
    });
  }, [navigation]);

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile
              profile={profile}
              onPress={() => navigation.navigate('UserProfile')}
            />
            <Text style={styles.welcome}>
              Sudah Shalat Sunnah Kah hari ini?
            </Text>
          </View>

          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {/* {JSONCategoryDoctor.data.map((item) => {
                  return (
                    // <UstadzCategory
                    //   key={item.id}
                    //   category={item.category}
                    //   onPress={() => navigation.navigate('DoaShalat')}
                    // />
                    );
                  })} */}
                <UstadzCategory
                  doa={'Dhuha'}
                  category={'Dhuha'}
                  onPress={() => navigation.navigate('DoaShalat')}
                />
                <UstadzCategory
                  doa={'Taubat'}
                  category={'Taubat'}
                  onPress={() => navigation.navigate('DoaTaubat')}
                />
                <UstadzCategory
                  doa={'Tahajud'}
                  category={'Tahajud'}
                  onPress={() => navigation.navigate('DoaTahajud')}
                />
                <UstadzCategory
                  doa={'Istikharah'}
                  category={'Istikharah'}
                  onPress={() => navigation.navigate('DoaIstikharah')}
                />
                <Gap width={32} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <View style={styles.wrapperSection2}>
              <Text style={styles.sectionLabel}>Ustadz/Ustadzah Terbaik</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('ListUstadz')}>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            {ustadz.map((guru) => {
              return (
                <RatedUstadz
                  key={guru.id}
                  name={guru.data.fullName}
                  desc={guru.data.guru}
                  university={guru.data.university}
                  avatar={{uri: guru.data.photo}}
                  rate={guru.data.rate}
                  onPress={() => navigation.navigate('UstadzProfile', guru)}
                />
              );
            })}
            <Gap height={10} />
            <Text style={styles.chatbot}>
              Mau Jawaban Cepat ? Astrobot Pilihannya
            </Text>
            <View style={styles.wrapperScroll}>
              <View style={styles.category}>
                <Gap width={15} />
                <ChatBot onPress={() => navigation.navigate('Chatbot')} />
                <Gap width={22} />
              </View>
            </View>
            <Text style={styles.sectionLabel}>Reminder</Text>
          </View>
          {news.map((item) => {
            return (
              <NewsItem
                key={item.id}
                title={item.title}
                date={item.date}
                image={item.image}
              />
            );
          })}
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  wrapperSection: {paddingHorizontal: 16},
  wrapperSection2: {flexDirection: 'row', justifyContent: 'space-between'},
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  chatbot: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 0,
    marginBottom: 16,
  },
  category: {flexDirection: 'row'},
  wrapperScroll: {marginHorizontal: -16},
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
  seeAll: {
    fontSize: 16,
    fontFamily: fonts.primary[800],
    color: colors.tertiary,
    marginTop: 30,
    marginBottom: 16,
    alignSelf: 'stretch',
  },
});
