import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {fonts, colors} from '../../utils';
import {Header} from '../../components';
import {DummyDoaIstikharah, DummyBcIstikharah} from '../../assets';
import {ScrollView} from 'react-native-gesture-handler';

const DoaIstikharah = ({navigation}) => {
  return (
    <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
      <Header
        title="Doa Shalat Istikharah"
        onPress={() => navigation.goBack()}
      />
      <Image source={DummyBcIstikharah} style={styles.bc} />
      <Text style={styles.desc}>
        Tata cara mengerjakan sholat dhuha sebetulnya sama dengan sholat sunnah
        lain pada umumnya yaitu dua rakaat sholat dan satu salam. Perbedaan tata
        cara sholat dhuha dari sholat-sholat sunah lainnya terletak pada niat,
        doa dan waktunya. Sholat dhuha dilakukan minimal dua rakaat. Namun,
        terkadang Rasulullah mengerjakan sholat dhuha sebanyak empat rakaat,
        pernah juga beliau mengerjakan sholat dhuha sebanyak 8 rakaat. Hal ini
        sesuai dengan hadist yang diriwayatkan Ummu Hani’ binti Abi Thalib,
        “Rasulullah shallallahu ‘alaihi wasalla pernah mengerjakan sholat
        sebanyak 8 rakaat. Pada setiap dua rakaat, beliau mengucapkan salam.”
        (HR. Abu Dawud).
      </Text>
      <Text style={styles.desc}>
        Setelah mengerjakan sholat dhuha, dianjurkan pula untuk membaca doa
        sebagai berikut
      </Text>
      <Image source={DummyDoaIstikharah} style={styles.image} />
      <Text style={styles.desc}>
        (Alloohumma innadh dhuhaa-a dhuhaa-uka, wal bahaa-a bahaa-uka, wal
        jamaala jamaaluka, wal quwwata quwwatuka, wal qudrota qudrotuka wal
        ‘ishmata ‘ishmatuka. Alloohumma inkaana rizqii fis samaa-i fa anzilhu,
        wa inkaana fil ardhi fa-akhrijhu, wa inkaana mu’assiron fayassirhu, wa
        inkaana harooman fathohhirhu, wa inkaana ba’iidan faqorribhu bihaqqi
        dhuhaa-ika wa bahaa-ika wa jamaalika wa quwwatika wa qudrotika aatinii
        maa aataita ‘ibaadakash shoolihiin)
      </Text>
      <Text style={styles.desc}>
        Artinya : Ya Allah, sesungguhnya waktu dhuha adalah waktu dhuha-Mu,
        keagungan adalah keagungan-Mu, keindahan adalah keindahan-Mu, kekuatan
        adalah kekuatan-Mu, kekuasaan adalah kekuasaan-Mu, penjagaan adalah
        penjagaan-Mu, Ya Allah, apabila rezekiku berada di atas langit maka
        turunkanlah, apabila berada di dalam bumi maka keluarkanlah, apabila
        sukar mudahkanlah, apabila haram sucikanlah, apabila jauh dekatkanlah
        dengan kebenaran dhuha-Mu, keagungan-Mu, keindahan-Mu, kekuatan-Mu dan
        kekuasaan-Mu, berikanlah kepadaku apa yang Engkau berikan kepada
        hamba-hambaMu yang shalih”.
      </Text>
    </ScrollView>
  );
};

export default DoaIstikharah;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.white, paddingLeft: 16},
  desc: {padding: 16, paddingLeft: 0, paddingTop: 7, textAlign: 'justify'},
  bc: {width: 350, height: 200, paddingLeft: 16, alignItems: 'center'},
  image: {width: 350, height: 250, paddingLeft: 16, alignItems: 'center'},
});
