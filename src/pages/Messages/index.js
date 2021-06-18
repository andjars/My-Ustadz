import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {List} from '../../components';
import {colors, fonts, getData} from '../../utils';
import {Fire} from '../../config';

const Messages = ({navigation}) => {
  const [user, setUser] = useState({});
  const [historyChat, setHistoryChat] = useState([]);

  useEffect(() => {
    getDataUserFromLocal();
    const rootDB = Fire.database().ref();
    const urlHistory = `messages/${user.uid}-${user.fullName}/`;
    const messageDB = rootDB.child(urlHistory);

    messageDB.on('value', async (snapshot) => {
      if (snapshot.val()) {
        const oldData = snapshot.val();
        const data = [];

        const promises = await Object.keys(oldData).map(async (key) => {
          const urlUidUstadz = `guru/${oldData[key].uidPartner}`;
          const detailUstadz = await rootDB.child(urlUidUstadz).once('value');
          console.log('detail ustadz: ', detailUstadz.val());
          data.push({
            id: key,
            detailUstadz: detailUstadz.val(),
            ...oldData[key],
          });
        });

        await Promise.all(promises);
        console.log('new data history: ', data);
        setHistoryChat(data);
      }
    });
  }, [user.uid]);

  const getDataUserFromLocal = () => {
    getData('user').then((res) => {
      console.log('userlogin: ', res);
      setUser(res);
    });
  };
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {historyChat.map((chat) => {
          const dataUstadz = {
            id: chat.detailUstadz.uid,
            data: chat.detailUstadz,
          };
          return (
            <List
              key={chat.id}
              profile={{uri: chat.detailUstadz.photo}}
              name={chat.detailUstadz.fullName}
              desc={chat.lastContentChat}
              time={chat.lastChatTime}
              onPress={() => navigation.navigate('Chatting', dataUstadz)}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.secondary, flex: 1},
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16,
  },
});
