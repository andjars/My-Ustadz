import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Splash,
  GetStarted,
  Register,
  Login,
  UploadPhoto,
  Doctor,
  Messages,
  ChooseUstadz,
  Chatting,
  UserProfile,
  UpdateProfile,
  UstadzProfile,
  DoaShalat,
  DoaTaubat,
  DoaTahajud,
  DoaIstikharah,
  AboutUs,
  Chatbot,
  ListUstadz,
} from '../pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigator} from '../components';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Doctor} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Profile" component={UserProfile} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UploadPhoto"
        component={UploadPhoto}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChooseUstadz"
        component={ChooseUstadz}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chatting"
        component={Chatting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UstadzProfile"
        component={UstadzProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DoaShalat"
        component={DoaShalat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DoaTaubat"
        component={DoaTaubat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DoaTahajud"
        component={DoaTahajud}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DoaIstikharah"
        component={DoaIstikharah}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chatbot"
        component={Chatbot}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListUstadz"
        component={ListUstadz}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
